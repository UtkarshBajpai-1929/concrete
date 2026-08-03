import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const temp = new THREE.Object3D();

const PackedParticles = ({ particles, color }) => {
  const mesh = useRef();

  const positions = useMemo(() => {
    return particles.map((p) => ({
      current: new THREE.Vector3(...p.start),
      target: new THREE.Vector3(...p.target),
      radius: p.radius,
    }));
  }, [particles]);

  useFrame(() => {
    positions.forEach((p, i) => {
      p.current.lerp(p.target, 0.03);

      temp.position.copy(p.current);

      temp.scale.setScalar(p.radius);

      temp.updateMatrix();

      mesh.current.setMatrixAt(i, temp.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[null, null, particles.length]}
    >
      <sphereGeometry args={[1, 18, 18]} />

     <meshPhysicalMaterial
    color={color}
    roughness={0.25}
    metalness={0.05}
    clearcoat={1}
    clearcoatRoughness={0.15}
/>
    </instancedMesh>
  );
};

export default PackedParticles;