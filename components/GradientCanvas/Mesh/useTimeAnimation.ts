import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GradientT } from "../types";

export const clock = new THREE.Clock();

function parseRGBA(rgba?: string) {
  if (!rgba) return {};
  const parts = rgba.substring(rgba.indexOf("("))?.split(",");
  const r = parseInt(parts[0].substring(1), 10);
  const g = parseInt(parts[1], 10);
  const b = parseInt(parts[2], 10);

  return { r, g, b };
}

function uniformToRGB(r: number, g: number, b: number) {
  return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
}

export function useTimeAnimation({ animate }: Pick<GradientT, "animate">) {
  const material: any = useRef();
  const linemat: any = useRef();

  useFrame((state, delta) => {
    if (material.current) {
      let elapsed = clock.getElapsedTime();

      // range animation
      if (animate === "on") {
        material.current.userData.uTime.value = elapsed;
      }
    }
  });

  return { material, linemat };
}
