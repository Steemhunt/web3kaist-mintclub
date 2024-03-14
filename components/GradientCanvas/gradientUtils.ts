export function dToR(d: number) {
  return (d / 180) * Math.PI;
}

export function dToRArr(degrees: number[]) {
  return degrees.map((d) => dToR(d)) as [x: number, y: number, z: number];
}
