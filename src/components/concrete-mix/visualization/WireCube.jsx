import { Edges } from "@react-three/drei";

const WireCube = () => {
  return (
    <mesh>
      <boxGeometry args={[6, 6, 6]} />

      {/* Glass Material */}
      <meshPhysicalMaterial
        color="#9fd3ff"
        transparent
        opacity={0.08}
        transmission={0.95}
        roughness={0.08}
        thickness={0.6}
        ior={1.45}
        clearcoat={1}
        clearcoatRoughness={0}
      />

      {/* Cube Border */}
      <Edges
        color="#6EA8FF"
        lineWidth={2}
      />
    </mesh>
  );
};

export default WireCube;