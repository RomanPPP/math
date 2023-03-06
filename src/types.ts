
type Tuple<
  T,
  N extends number,
  R extends T[] = [],
> = R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;

type mat3 = Tuple<number, 9>
type mat4 =Tuple<number, 16>

type vec3 = Tuple<number, 3>
type vec4 = Tuple<number, 4>

