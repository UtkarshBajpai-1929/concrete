import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ParticlePackingScene from "./ParticlePackingScene";

const PackingVisualization = () => {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      <Canvas
        camera={{
          position: [9, 9, 9],
          fov: 45,
        }}
      >
        <color attach="background" args={["#08111f"]} />

        <ambientLight intensity={1.3} />

        <directionalLight
          position={[10, 10, 10]}
          intensity={2}
        />

        <ParticlePackingScene />

        <OrbitControls
  enableZoom={false}
  enablePan={false}
  enableRotate={false} // optional
  autoRotate
  autoRotateSpeed={1}
/>
      </Canvas>
    </div>
  );
};

export default PackingVisualization;