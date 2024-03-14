'use client';

import { CameraControl } from './CameraControl';
import { Mesh } from './Mesh';
import { GradientT } from './types';
import { Canvas } from '@react-three/fiber';
import React from 'react';

export default function GCanvas(props: Partial<GradientT>) {
  const defaultOptions = {
    bgColor1: '#000000',
    bgColor2: '#000000',
    fov: 45,
    pixelDensity: 1,
  };

  const options: GradientT = {
    animate: 'on',
    brightness: 1.1,
    cAzimuthAngle: 0,
    cDistance: 3.9,
    cPolarAngle: 115,
    cameraZoom: 4,
    color1: '#0b4bc8',
    color2: '#000000',
    color3: '#000000',
    frameRate: 10,
    grain: 'on',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    range: 'enabled',
    rangeEnd: 40,
    rangeStart: 0,
    reflection: 0.1,
    type: 'waterPlane',
    uAmplitude: 0,
    uDensity: 1.1,
    uFrequency: 5.5,
    uSpeed: 0.1,
    uStrength: 2.4,
    uTime: 0.2,
    wireframe: false,
    shader: 'defaults',
    dampingFactor: 0.05,
  };

  return (
    <Canvas>
      <ambientLight intensity={1.1} />
      <Mesh {...defaultOptions} {...options} {...props} />
      <CameraControl {...options} />
    </Canvas>
  );
}
