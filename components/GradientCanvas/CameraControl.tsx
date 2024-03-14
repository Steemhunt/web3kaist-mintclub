import { extend, useFrame, useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { dToR } from './gradientUtils';
import { GradientT } from './types';
export const defaultPlanesZoom = 1;
export const defaultSphereDistance = 14;
export const zoomOutPlanes = { zoom: 1, distance: 14 };
export const zoomOutSphere = { zoom: 5, distance: 14 };

export function CameraControl({
  type,
  cAzimuthAngle,
  cPolarAngle,
  cDistance,
  cameraZoom,
  dampingFactor = 0.05, // default dampingFactor of "camera-conrols"
}: GradientT) {
  CameraControls.install({ THREE });
  extend({ CameraControls });

  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);

  // const ref = useCameraAnimation(props);
  const ref = useRef<CameraControls>();

  useFrame((state, delta) => ref.current?.update(delta)); // sync r3f delta with 'camera-controls'

  // rorate the camera
  useEffect(() => {
    if (cAzimuthAngle !== undefined && cPolarAngle !== undefined) {
      const control = ref.current;
      control?.rotateTo(dToR(cAzimuthAngle), dToR(cPolarAngle), true);
    }
  }, [cAzimuthAngle, cPolarAngle]);

  // zoom-out tool
  useEffect(() => {
    const control = ref.current;
    // control distance for planes & zoom for sphere
    if (type === 'sphere') {
      control?.zoomTo(cameraZoom, false);
      control?.dollyTo(defaultSphereDistance, false);
    } else if (type === 'waterPlane') {
      control?.zoomTo(cameraZoom, false);
      control?.dollyTo(defaultSphereDistance, false);
    } else {
      control?.dollyTo(cDistance, false);
      control?.zoomTo(defaultPlanesZoom, false);
    }
  }, [type, cameraZoom, cDistance]);

  // increase the zoom based on screen width resize
  useEffect(() => {
    const handleResize = () => {
      const control = ref.current;
      const zoomFactorW = Math.max(window.innerWidth / 400, 4); //
      const zoomFactorH = Math.max(5000 / window.innerHeight, 4); //
      control?.zoomTo(Math.max(zoomFactorH, zoomFactorW), false);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // @ts-ignore
    <cameraControls
      ref={ref}
      args={[camera, gl.domElement]}
      enableDamping={true}
      smoothTime={dampingFactor}
      zoomSpeed={10}
      dollySpeed={10}
      restThreshold={0}
    />
  );
}
