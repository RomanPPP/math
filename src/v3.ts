const dot = (a : vec3, b :vec3) : number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a : vec3, b : vec3) : vec3 => [
  a[1] * b[2] - b[1] * a[2],
  a[2] * b[0] - b[2] * a[0],
  a[0] * b[1] - b[0] * a[1],
];

const scale = (a : vec3, scalar : number) : vec3 => [a[0] * scalar, a[1] * scalar, a[2] * scalar];
const sum = (a : vec3, b : vec3) : vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const diff = (a : vec3, b : vec3) : vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const norm = (a : vec3) : number => Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
const normSq = (a : vec3) : number => a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
const normalize = (a : vec3) : vec3 => {
  const length = norm(a);
  if (length === 0) return a;
  return [a[0] / length, a[1] / length, a[2] / length];
};
const isNull = (a : vec3) => a[0] * a[0] + a[1] * a[1] + a[2] * a[2] === 0;

const isEqual = (a : vec3, b : vec3) : boolean => a[0] == b[0] && a[1] == b[1] && a[2] == b[2];

export default {
  sum,
  diff,
  scale,
  dot,
  cross,
  norm,
  normSq,
  normalize,
  isEqual,
  isNull,
};
