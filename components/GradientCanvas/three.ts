'use client';

import * as THREE from 'three';

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    );
  } catch (e) {
    return false;
  }
}

function checkPerformance(framerateThreshold = 25): Promise<{
  supported: boolean;
  framerate: number;
}> {
  return new Promise((resolve) => {
    // Create an offscreen canvas
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = window.innerWidth;
    offscreenCanvas.height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas: offscreenCanvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    let frameCount = 0;
    const startTime = performance.now();

    const animate = () => {
      frameCount++;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      if (performance.now() - startTime >= 500) {
        // Check if device is capable of rendering at least 25 frames in 500ms
        // equivalent to 50fps

        // clean up
        renderer.dispose();
        scene.remove(cube);
        offscreenCanvas.remove();
        offscreenCanvas.width = 0;
        offscreenCanvas.height = 0;

        resolve({
          supported: frameCount >= framerateThreshold,
          framerate: frameCount,
        });
      }
    };

    animate();
  });
}

export async function isThreeJsSupported(frameRateThreshold = 25) {
  if (typeof window === 'undefined')
    return {
      supported: false,
      framerate: 0,
    };
  else if (!isWebGLAvailable()) {
    return {
      supported: false,
      framerate: 0,
    };
  }

  return await checkPerformance(frameRateThreshold);
}
