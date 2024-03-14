// @ts-nocheck
import { animated } from '@react-spring/three';
import { dToRArr } from '../gradientUtils';
import { MeshT } from '../types';
import { useMaterials } from './useMaterials';
import { useTimeAnimation } from './useTimeAnimation';

// @ts-ignore
Math.easeInOutCubic = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
};
const meshCount = 192;

export const Mesh: React.FC<MeshT> = ({
  type,
  animate,
  uTime,
  uSpeed,
  uStrength,
  uDensity,
  uFrequency,
  uAmplitude,
  position,
  rotation,
  color1,
  color2,
  color3,
  reflection,
  shader,
}) => {
  const mounted = useMaterials({
    type,
    shader,
    color1,
    color2,
    color3,
    uTime,
    uSpeed,
    uDensity,
    uStrength,
    uFrequency,
    uAmplitude,
  });

  const { material, linemat } = useTimeAnimation({
    animate,
  });

  return (
    <group>
      <animated.mesh
        position={position}
        rotation={rotation !== undefined ? dToRArr(rotation) : [0, 0, 0]}
      >
        {type === 'plane' && <planeGeometry args={[10, 10, 1, meshCount]} />}
        {type === 'sphere' && <icosahedronGeometry args={[1, meshCount / 3]} />}
        {type === 'waterPlane' && (
          <planeGeometry args={[10, 10, meshCount, meshCount]} />
        )}
        {mounted && (
          <colorShiftMaterial ref={material} roughness={1 - reflection} />
        )}
      </animated.mesh>
    </group>
  );
};
