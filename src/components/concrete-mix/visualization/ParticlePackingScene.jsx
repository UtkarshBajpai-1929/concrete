import WireCube from "./WireCube";
import PackedParticles from "./PackedParticles";

import {
  largeParticles,
  mediumParticles,
  smallParticles,
} from "./particleData";

const ParticlePackingScene = () => {
  return (
    <>
      <WireCube />

      <PackedParticles
        particles={largeParticles}
        color="#4F8DFF"
      />

      <PackedParticles
        particles={mediumParticles}
        color="#5FD6FF"
      />

      <PackedParticles
        particles={smallParticles}
        color="#FFFFFF"
      />
    </>
  );
};

export default ParticlePackingScene;