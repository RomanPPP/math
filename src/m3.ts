import { mat3, mat4, vec3, vec4 } from "./types";
const m3 = {
  multiply: function (b: mat3, a: mat3): mat3 {
    const a00 = a[0 * 3 + 0];
    const a01 = a[0 * 3 + 1];
    const a02 = a[0 * 3 + 2];
    const a10 = a[1 * 3 + 0];
    const a11 = a[1 * 3 + 1];
    const a12 = a[1 * 3 + 2];
    const a20 = a[2 * 3 + 0];
    const a21 = a[2 * 3 + 1];
    const a22 = a[2 * 3 + 2];
    const b00 = b[0 * 3 + 0];
    const b01 = b[0 * 3 + 1];
    const b02 = b[0 * 3 + 2];
    const b10 = b[1 * 3 + 0];
    const b11 = b[1 * 3 + 1];
    const b12 = b[1 * 3 + 2];
    const b20 = b[2 * 3 + 0];
    const b21 = b[2 * 3 + 1];
    const b22 = b[2 * 3 + 2];

    return [
      b00 * a00 + b01 * a10 + b02 * a20,
      b00 * a01 + b01 * a11 + b02 * a21,
      b00 * a02 + b01 * a12 + b02 * a22,
      b10 * a00 + b11 * a10 + b12 * a20,
      b10 * a01 + b11 * a11 + b12 * a21,
      b10 * a02 + b11 * a12 + b12 * a22,
      b20 * a00 + b21 * a10 + b22 * a20,
      b20 * a01 + b21 * a11 + b22 * a21,
      b20 * a02 + b21 * a12 + b22 * a22,
    ];
  },
  xRotation: function (angleInRadians: number): mat3 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    return [1, 0, 0, 0, c, s, 0, -s, c];
  },

  yRotation: function (angleInRadians: number): mat3 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    return [c, 0, -s, 0, 1, 0, s, 0, c];
  },

  zRotation: function (angleInRadians: number): mat3 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);

    return [c, s, 0, -s, c, 0, 0, 0, 1];
  },
  m3Tom4: function (m: mat3): mat4 {
    const dst = new Array<number>(16) as mat4;
    dst[0] = m[0];
    dst[1] = m[1];
    dst[2] = m[2];
    dst[3] = 0;
    dst[4] = m[3];
    dst[5] = m[4];
    dst[6] = m[5];
    dst[7] = 0;
    dst[8] = m[6];
    dst[9] = m[7];
    dst[10] = m[8];
    dst[11] = 0;
    dst[12] = 0;
    dst[13] = 0;
    dst[14] = 0;
    dst[15] = 1;
    return dst;
  },
  xRotate: function (m: mat3, angleInRadians: number): mat3 {
    return m3.multiply(m, m3.xRotation(angleInRadians));
  },

  yRotate: function (m: mat3, angleInRadians: number): mat3 {
    return m3.multiply(m, m3.yRotation(angleInRadians));
  },

  zRotate: function (m: mat3, angleInRadians: number): mat3 {
    return m3.multiply(m, m3.zRotation(angleInRadians));
  },
  transformPoint: function (m: mat3, v: vec3) {
    const dst = new Array<number>(9) as mat3;
    const v0 = v[0];
    const v1 = v[1];
    const v2 = v[2];

    dst[0] = v0 * m[0 * 3 + 0] + v1 * m[1 * 3 + 0] + v2 * m[2 * 3 + 0];
    dst[1] = v0 * m[0 * 3 + 1] + v1 * m[1 * 3 + 1] + v2 * m[2 * 3 + 1];
    dst[2] = v0 * m[0 * 3 + 2] + v1 * m[1 * 3 + 2] + v2 * m[2 * 3 + 2];

    return dst;
  },
  identity: function (): mat3 {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  },
  transpose: function (m: mat3): mat3 {
    const dst = new Array<number>(9) as mat3;
    dst[0] = m[0];
    dst[1] = m[3];
    dst[2] = m[6];
    dst[3] = m[1];
    dst[4] = m[4];
    dst[5] = m[7];
    dst[6] = m[2];
    dst[7] = m[5];
    dst[8] = m[8];
    return dst;
  },
  scaling: function (sx: number, sy: number, sz: number): mat3 {
    return [sx, 0, 0, 0, sy, 0, 0, 0, sz];
  },
  scale: function (m: mat3, sx: number, sy: number, sz: number): mat3 {
    return m3.multiply(m, m3.scaling(sx, sy, sz));
  },
  /*
      0 1 2
      3 4 5
      6 7 8
      */
  inverse: function (m: mat3): mat3 {
    const det =
      m[0] * m[4] * m[8] +
      m[2] * m[3] * m[7] +
      m[1] * m[5] * m[6] -
      m[2] * m[4] * m[6] -
      m[0] * m[5] * m[7] -
      m[8] * m[3] * m[2];
    const dst = new Array<number>(9) as mat3;
    dst[0] = (m[4] * m[8] - m[7] * m[5]) / det;
    dst[1] = (m[3] * m[8] - m[6] * m[5]) / det;
    dst[2] = (m[3] * m[7] - m[6] * m[4]) / det;
    dst[3] = (m[1] * m[8] - m[2] * m[7]) / det;
    dst[4] = (m[0] * m[8] - m[2] * m[6]) / det;
    dst[5] = (m[0] * m[7] - m[1] * m[6]) / det;
    dst[6] = (m[1] * m[5] - m[2] * m[4]) / det;
    dst[7] = (m[0] * m[5] - m[2] * m[3]) / det;
    dst[8] = (m[0] * m[4] - m[1] * m[4]) / det;
    return dst;
  },
  toString(m: mat3): string {
    return m.reduce(
      (acc: string, el: number, idx: number) =>
        idx % 3 === 0
          ? (acc += `\n${el.toString()}`)
          : (acc += ` ${el.toString()}`),
      ""
    );
  },
};
export default m3;
