export type MeshT = {
  type: 'plane' | 'sphere' | 'waterPlane';
  animate: 'on' | 'off';
  range: 'enabled' | 'disabled';
  rangeStart: number;
  rangeEnd: number;
  uTime: number;
  uSpeed: number;
  uStrength: number;
  uDensity: number;
  uFrequency: number;
  uAmplitude: number;
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  color1: string;
  color2: string;
  color3: string;
  reflection: number;
  wireframe: boolean;
  shader: string;
};

export type GradientT = MeshT & {
  dampingFactor: number;
  frameRate: number;

  // View (camera) props
  cAzimuthAngle: number;
  cPolarAngle: number;
  cDistance: number;
  cameraZoom: number;

  // Effect props
  brightness: number;
  grain: 'on' | 'off';
};
