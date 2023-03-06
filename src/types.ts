
type Tuple<
  T,
  N extends number,
  R extends T[] = [],
> = R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;

export type mat3 = Tuple<number, 9>
export type mat4 =Tuple<number, 16>

export type vec3 = Tuple<number, 3>
export type vec4 = Tuple<number, 4>

