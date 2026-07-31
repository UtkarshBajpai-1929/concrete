import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

// ---------- palette / tokens ----------
const C = {
  ink: "#0B2338",
  ink2: "#12314E",
  ink3: "#183C60",
  line: "rgba(196, 224, 255, 0.14)",
  lineStrong: "rgba(196, 224, 255, 0.28)",
  chalk: "#E7F1FF",
  chalkDim: "#9FB8D6",
  accent: "#FF6A39",
  shear: "#5FE0C9",
  moment: "#FF6A39",
  amber: "#FFC24B",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
`;

const BEAM_TYPES = [
  { id: "simple", label: "Simply Supported" },
  { id: "cantilever", label: "Cantilever" },
  { id: "overhang", label: "Overhanging" },
];

const LOAD_TYPES = [
  { id: "point", label: "Point Load" },
  { id: "udl", label: "Uniform (UDL)" },
];

let uid = 100;
const newLoad = (i) => ({
  id: uid++,
  type: "point",
  posFrac: Math.min(0.9, 0.15 + i * 0.15),
  mag: 400,
  startFrac: Math.min(0.6, 0.15 + i * 0.15),
  widthFrac: 0.25,
  intensity: 200,
});

const round = (n) => Math.round(n * 1000) / 1000;
const round2 = (n) => Math.round(n * 100) / 100;

// ---------- engineering core ----------
function analyze(type, length, loads, aFrac, bFrac) {
  const pointLoads = loads
    .filter((l) => l.type === "point")
    .map((l) => ({ pos: l.posFrac * length, mag: l.mag }));

  const udls = loads
    .filter((l) => l.type === "udl")
    .map((l) => {
      const start = l.startFrac * length;
      const end = Math.min(length, start + l.widthFrac * length);
      return { start, end: Math.max(end, start + 0.001), intensity: l.intensity };
    });

  const equivFromUdl = udls.map((u) => ({
    pos: (u.start + u.end) / 2,
    mag: u.intensity * (u.end - u.start),
  }));
  const allEquivLoads = [...pointLoads, ...equivFromUdl];

  const forces = pointLoads.map((l) => ({ pos: l.pos, F: -l.mag }));
  let reactions = {};
  let M0 = 0;

  if (type === "cantilever") {
    const R = allEquivLoads.reduce((s, l) => s + l.mag, 0);
    M0 = allEquivLoads.reduce((s, l) => s + l.mag * l.pos, 0);
    forces.push({ pos: 0, F: R });
    reactions = { kind: "cantilever", R, M0, supportPos: [0] };
  } else {
    const a = type === "overhang" ? aFrac * length : 0;
    const b = type === "overhang" ? bFrac * length : length;
    const span = b - a || 1e-6;
    const sumP = allEquivLoads.reduce((s, l) => s + l.mag, 0);
    const sumPx = allEquivLoads.reduce((s, l) => s + l.mag * (l.pos - a), 0);
    const Rb = sumPx / span;
    const Ra = sumP - Rb;
    forces.push({ pos: a, F: Ra }, { pos: b, F: Rb });
    reactions = { kind: "simple", Ra, Rb, a, b, supportPos: [a, b] };
  }

  const distributedUpTo = (x) =>
    udls.reduce((s, u) => s + u.intensity * Math.max(0, Math.min(x, u.end) - u.start), 0);

  const gridN = 220;
  const gridPts = Array.from({ length: gridN + 1 }, (_, i) => (i / gridN) * length);
  const criticalPts = [0, length, ...forces.map((f) => f.pos), ...udls.flatMap((u) => [u.start, u.end])];
  const allX = [...new Set([...gridPts, ...criticalPts].map(round))].sort((x, y) => x - y);

  const sortedForces = forces.slice().sort((p, q) => p.pos - q.pos);
  let fPtr = 0,
    cumForce = 0;
  const sfd = [];
  const pre = [];
  const post = [];
  for (const x of allX) {
    const preShear = cumForce - distributedUpTo(x);
    sfd.push({ x, shear: round2(preShear) });
    pre.push(preShear);
    while (fPtr < sortedForces.length && sortedForces[fPtr].pos <= x + 1e-4) {
      cumForce += sortedForces[fPtr].F;
      fPtr++;
    }
    const postShear = cumForce - distributedUpTo(x);
    sfd.push({ x, shear: round2(postShear) });
    post.push(postShear);
  }

  const bmdRaw = [0];
  let M = 0;
  for (let i = 1; i < allX.length; i++) {
    const dx = allX[i] - allX[i - 1];
    const avgV = (post[i - 1] + pre[i]) / 2;
    M += avgV * dx;
    bmdRaw.push(M);
  }
  const bmd = allX.map((x, i) => ({
    x,
    moment: round2(bmdRaw[i] - (type === "cantilever" ? M0 : 0)),
  }));

  const maxAbsMoment = bmd.reduce((mx, b) => Math.max(mx, Math.abs(b.moment)), 0);
  const maxAbsShear = sfd.reduce((mx, s) => Math.max(mx, Math.abs(s.shear)), 0);
  const momentAtX = (bmd.find((b) => Math.abs(Math.abs(b.moment) - maxAbsMoment) < 1e-6) || { x: 0 }).x;

  return { reactions, sfd, bmd, maxAbsMoment, maxAbsShear, momentAtX, udls, pointLoads };
}

// ---------- small UI atoms ----------
function Segmented({ options, value, onChange, small }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        background: C.ink,
        border: `1px solid ${C.lineStrong}`,
        borderRadius: 8,
        padding: 3,
      }}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            style={{
              flex: 1,
              padding: small ? "6px 8px" : "9px 10px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: small ? 11 : 12.5,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              color: active ? C.ink : C.chalkDim,
              background: active ? C.amber : "transparent",
              transition: "all .15s ease",
              whiteSpace: "nowrap",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, unit, accent = C.amber, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span
          style={{
            fontSize: 11.5,
            color: C.chalkDim,
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: accent, fontWeight: 600 }}>
          {format ? format(value) : value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: "100%",
          accentColor: accent,
          height: 4,
          background: `linear-gradient(to right, ${accent} ${pct}%, ${C.line} ${pct}%)`,
          borderRadius: 4,
          appearance: "none",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

function DataRow({ label, value, unit, accent }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "8px 0",
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: C.chalkDim }}>{label}</span>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, fontWeight: 600, color: accent || C.chalk }}>
        {value} <span style={{ fontSize: 11, color: C.chalkDim }}>{unit}</span>
      </span>
    </div>
  );
}

// ---------- beam technical drawing ----------
function BeamDrawing({ type, length, loads, reactions }) {
  const W = 800,
    H = 190;
  const padL = 50,
    padR = 50;
  const beamY = 100;
  const usableW = W - padL - padR;
  const toX = (m) => padL + (m / length) * usableW;

  const pointLoads = loads.filter((l) => l.type === "point");
  const udlLoads = loads.filter((l) => l.type === "udl");
  const maxMag = Math.max(1, ...pointLoads.map((l) => l.mag));
  const maxIntensity = Math.max(1, ...udlLoads.map((l) => l.intensity));

  const Support = ({ x, kind }) =>
    kind === "fixed" ? (
      <g>
        <line x1={x} y1={beamY - 26} x2={x} y2={beamY + 26} stroke={C.chalk} strokeWidth="3" />
        {[...Array(7)].map((_, i) => (
          <line
            key={i}
            x1={x}
            y1={beamY - 24 + i * 8}
            x2={x - 10}
            y2={beamY - 16 + i * 8}
            stroke={C.chalk}
            strokeWidth="1.5"
          />
        ))}
      </g>
    ) : (
      <g>
        <polygon
          points={`${x},${beamY} ${x - 12},${beamY + 20} ${x + 12},${beamY + 20}`}
          fill="none"
          stroke={C.chalk}
          strokeWidth="2"
        />
        <line x1={x - 18} y1={beamY + 26} x2={x + 18} y2={beamY + 26} stroke={C.chalk} strokeWidth="2" />
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1={x - 16 + i * 8}
            y1={beamY + 26}
            x2={x - 22 + i * 8}
            y2={beamY + 34}
            stroke={C.chalk}
            strokeWidth="1"
          />
        ))}
      </g>
    );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={C.line} strokeWidth="1" />
        </pattern>
        <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="4" refY="7" orient="auto">
          <path d="M0,0 L4,8 L8,0 Z" fill={C.moment} />
        </marker>
        <marker id="arrowAmber" markerWidth="7" markerHeight="7" refX="3.5" refY="6" orient="auto">
          <path d="M0,0 L3.5,7 L7,0 Z" fill={C.amber} />
        </marker>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="url(#grid)" />

      <line x1={padL} y1={beamY} x2={W - padR} y2={beamY} stroke={C.chalk} strokeWidth="4" strokeLinecap="round" />

      {type === "cantilever" && <Support x={toX(0)} kind="fixed" />}
      {type !== "cantilever" && reactions.supportPos.map((p, i) => <Support key={i} x={toX(p)} kind="pin" />)}

      {/* point loads */}
      {pointLoads.map((l) => {
        const x = toX(l.posFrac * length);
        const h = 20 + (l.mag / maxMag) * 40;
        return (
          <g key={l.id}>
            <line x1={x} y1={beamY - h - 6} x2={x} y2={beamY - 4} stroke={C.moment} strokeWidth="2.5" markerEnd="url(#arrowOrange)" />
            <text x={x} y={beamY - h - 12} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill={C.moment} fontWeight="600">
              {l.mag}N
            </text>
          </g>
        );
      })}

      {/* uniform distributed loads */}
      {udlLoads.map((l) => {
        const startM = l.startFrac * length;
        const endM = Math.min(length, startM + l.widthFrac * length);
        const x1 = toX(startM);
        const x2 = toX(endM);
        const h = 18 + (l.intensity / maxIntensity) * 32;
        const arrowCount = Math.max(3, Math.round((x2 - x1) / 26));
        return (
          <g key={l.id}>
            <line x1={x1} y1={beamY - h} x2={x2} y2={beamY - h} stroke={C.amber} strokeWidth="2" />
            {Array.from({ length: arrowCount }).map((_, i) => {
              const xx = arrowCount === 1 ? x1 : x1 + (i / (arrowCount - 1)) * (x2 - x1);
              return (
                <line key={i} x1={xx} y1={beamY - h} x2={xx} y2={beamY - 4} stroke={C.amber} strokeWidth="1.5" markerEnd="url(#arrowAmber)" />
              );
            })}
            <text x={(x1 + x2) / 2} y={beamY - h - 8} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill={C.amber} fontWeight="600">
              {l.intensity} N/m
            </text>
          </g>
        );
      })}

      <line x1={padL} y1={beamY + 46} x2={W - padR} y2={beamY + 46} stroke={C.chalkDim} strokeWidth="1" />
      <line x1={padL} y1={beamY + 40} x2={padL} y2={beamY + 52} stroke={C.chalkDim} strokeWidth="1" />
      <line x1={W - padR} y1={beamY + 40} x2={W - padR} y2={beamY + 52} stroke={C.chalkDim} strokeWidth="1" />
      <text x={(padL + W - padR) / 2} y={beamY + 66} textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="12" fill={C.chalkDim}>
        L = {length.toFixed(1)} m
      </text>
    </svg>
  );
}

// ---------- diagram chart ----------
function DiagramChart({ data, dataKey, color, unit, title, length }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 12.5,
          fontWeight: 600,
          color,
          letterSpacing: "0.04em",
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={C.line} vertical={false} />
          <XAxis
            dataKey="x"
            type="number"
            domain={[0, length]}
            stroke={C.chalkDim}
            tick={{ fontFamily: "IBM Plex Mono", fontSize: 10, fill: C.chalkDim }}
            tickFormatter={(v) => v.toFixed(1)}
          />
          <YAxis stroke={C.chalkDim} tick={{ fontFamily: "IBM Plex Mono", fontSize: 10, fill: C.chalkDim }} width={46} />
          <ReferenceLine y={0} stroke={C.lineStrong} />
          <Tooltip
            contentStyle={{ background: C.ink2, border: `1px solid ${C.lineStrong}`, borderRadius: 6, fontFamily: "IBM Plex Mono", fontSize: 11 }}
            labelStyle={{ color: C.chalkDim }}
            itemStyle={{ color }}
            formatter={(v) => [`${v} ${unit}`, dataKey]}
            labelFormatter={(v) => `x = ${v} m`}
          />
          <Area type="linear" dataKey={dataKey} stroke={color} strokeWidth={2.2} fill={`url(#grad-${dataKey})`} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ---------- main app ----------
export default function Beam() {
  const [type, setType] = useState("simple");
  const [length, setLength] = useState(10);
  const [aFrac, setAFrac] = useState(0.1);
  const [bFrac, setBFrac] = useState(0.9);
  const [loads, setLoads] = useState([newLoad(0)]);

  const setLoadCount = (n) => {
    setLoads((prev) => {
      if (n === prev.length) return prev;
      if (n < prev.length) return prev.slice(0, n);
      const add = [];
      for (let i = prev.length; i < n; i++) add.push(newLoad(i));
      return [...prev, ...add];
    });
  };

  const updateLoad = (id, patch) => setLoads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const result = useMemo(() => analyze(type, length, loads, aFrac, bFrac), [type, length, loads, aFrac, bFrac]);

  return (
    <div style={{ minHeight: "100vh", background: C.ink, color: C.chalk, fontFamily: "'Inter', sans-serif" }}>
      <style>
        {FONTS}
        {`
        input[type=range]::-webkit-slider-thumb {
          appearance: none; width: 15px; height: 15px; border-radius: 50%;
          background: #fff; border: 2px solid ${C.ink}; cursor: pointer; margin-top: 0px;
          box-shadow: 0 0 0 1px ${C.lineStrong};
        }
        input[type=range]::-moz-range-thumb {
          width: 15px; height: 15px; border-radius: 50%; background: #fff; border: 2px solid ${C.ink}; cursor: pointer;
        }
      `}
      </style>

      <div
        style={{
          borderBottom: `1px solid ${C.lineStrong}`,
          padding: "18px 22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "0.01em" }}>
            BEAM ANALYSIS <span style={{ color: C.accent }}>／</span> STRUCTURAL
          </div>
          <div style={{ fontSize: 11.5, color: C.chalkDim, marginTop: 2, letterSpacing: "0.04em" }}>
            REACTIONS · SHEAR FORCE · BENDING MOMENT
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.chalkDim }}>
          <div>
            TYPE
            <br />
            <span style={{ color: C.chalk }}>{BEAM_TYPES.find((t) => t.id === type).label.toUpperCase()}</span>
          </div>
          <div>
            SPAN
            <br />
            <span style={{ color: C.chalk }}>{length.toFixed(1)} m</span>
          </div>
          <div>
            LOADS
            <br />
            <span style={{ color: C.chalk }}>{loads.length}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 18, padding: 20 }} className="beam-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Panel title="Beam Type">
            <Segmented options={BEAM_TYPES} value={type} onChange={setType} />
          </Panel>

          <Panel title="Geometry">
            <Slider label="Beam Length" value={length} min={2} max={20} step={0.5} unit=" m" onChange={setLength} accent={C.chalk} />
            {type === "overhang" && (
              <>
                <Slider
                  label="Support A"
                  value={aFrac}
                  min={0}
                  max={0.45}
                  step={0.01}
                  unit=" m"
                  accent={C.amber}
                  format={(v) => (v * length).toFixed(1)}
                  onChange={setAFrac}
                />
                <Slider
                  label="Support B"
                  value={bFrac}
                  min={0.55}
                  max={1}
                  step={0.01}
                  unit=" m"
                  accent={C.amber}
                  format={(v) => (v * length).toFixed(1)}
                  onChange={setBFrac}
                />
              </>
            )}
          </Panel>

          <Panel title="Loads">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 11.5, color: C.chalkDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Number of Loads
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <StepBtn onClick={() => setLoadCount(Math.max(1, loads.length - 1))}>–</StepBtn>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, width: 16, textAlign: "center" }}>
                  {loads.length}
                </span>
                <StepBtn onClick={() => setLoadCount(Math.min(6, loads.length + 1))}>+</StepBtn>
              </div>
            </div>

            {loads.map((l, i) => (
              <div key={l.id} style={{ background: C.ink, border: `1px solid ${C.line}`, borderRadius: 8, padding: "12px 12px 2px", marginBottom: 10 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: l.type === "udl" ? C.amber : C.moment,
                    fontFamily: "'IBM Plex Mono', monospace",
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  LOAD {i + 1} ↓
                </div>

                <div style={{ marginBottom: 10 }}>
                  <Segmented options={LOAD_TYPES} value={l.type} onChange={(t) => updateLoad(l.id, { type: t })} small />
                </div>

                {l.type === "point" ? (
                  <>
                    <Slider
                      label="Position"
                      value={l.posFrac}
                      min={0}
                      max={1}
                      step={0.01}
                      unit=" m"
                      accent={C.shear}
                      format={(v) => (v * length).toFixed(1)}
                      onChange={(v) => updateLoad(l.id, { posFrac: v })}
                    />
                    <Slider
                      label="Magnitude"
                      value={l.mag}
                      min={0}
                      max={2000}
                      step={50}
                      unit=" N"
                      accent={C.moment}
                      onChange={(v) => updateLoad(l.id, { mag: v })}
                    />
                  </>
                ) : (
                  <>
                    <Slider
                      label="Start Position"
                      value={l.startFrac}
                      min={0}
                      max={0.9}
                      step={0.01}
                      unit=" m"
                      accent={C.shear}
                      format={(v) => (v * length).toFixed(1)}
                      onChange={(v) => updateLoad(l.id, { startFrac: v })}
                    />
                    <Slider
                      label="Span Width"
                      value={l.widthFrac}
                      min={0.05}
                      max={Math.max(0.05, 1 - l.startFrac)}
                      step={0.01}
                      unit=" m"
                      accent={C.shear}
                      format={(v) => (v * length).toFixed(1)}
                      onChange={(v) => updateLoad(l.id, { widthFrac: v })}
                    />
                    <Slider
                      label="Intensity"
                      value={l.intensity}
                      min={0}
                      max={500}
                      step={10}
                      unit=" N/m"
                      accent={C.amber}
                      onChange={(v) => updateLoad(l.id, { intensity: v })}
                    />
                  </>
                )}
              </div>
            ))}
          </Panel>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
          <Panel title="Free Body Diagram">
            <BeamDrawing type={type} length={length} loads={loads} reactions={result.reactions} />
          </Panel>

          <Panel title="Support Reactions">
            {result.reactions.kind === "cantilever" ? (
              <>
                <DataRow label="Vertical Reaction (R)" value={result.reactions.R.toFixed(1)} unit="N" accent={C.amber} />
                <DataRow label="Fixed-End Moment (M₀)" value={result.reactions.M0.toFixed(1)} unit="N·m" accent={C.amber} />
              </>
            ) : (
              <>
                <DataRow label={`Reaction at A (x=${result.reactions.a.toFixed(1)}m)`} value={result.reactions.Ra.toFixed(1)} unit="N" accent={C.amber} />
                <DataRow label={`Reaction at B (x=${result.reactions.b.toFixed(1)}m)`} value={result.reactions.Rb.toFixed(1)} unit="N" accent={C.amber} />
              </>
            )}
            <DataRow label="Max |Shear|" value={result.maxAbsShear.toFixed(1)} unit="N" accent={C.shear} />
            <DataRow label="Max |Moment|" value={`${result.maxAbsMoment.toFixed(1)} @ x=${result.momentAtX}m`} unit="N·m" accent={C.moment} />
          </Panel>

          <Panel title="">
            <DiagramChart data={result.sfd} dataKey="shear" color={C.shear} unit="N" title="Shear Force Diagram (SFD)" length={length} />
          </Panel>

          <Panel title="">
            <DiagramChart data={result.bmd} dataKey="moment" color={C.moment} unit="N·m" title="Bending Moment Diagram (BMD)" length={length} />
          </Panel>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .beam-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div style={{ background: C.ink2, border: `1px solid ${C.lineStrong}`, borderRadius: 10, padding: 16 }}>
      {title && (
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12.5,
            fontWeight: 600,
            color: C.chalkDim,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

function StepBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 26,
        height: 26,
        borderRadius: 6,
        border: `1px solid ${C.lineStrong}`,
        background: C.ink3,
        color: C.chalk,
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 700,
        fontSize: 15,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}
