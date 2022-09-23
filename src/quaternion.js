const multiply = (a, b) => {
    const q1 = a[1] * b[2] - b[1] * a[2] + b[3] * a[0] + a[3] * b[0]
    const q2 = a[2] * b[0] - b[2] * a[0] + b[3] * a[1] + a[3] * b[1]
    const q3 = a[0] * b[1] - b[0] * a[1] + b[3] * a[2] + a[3] * b[2]
    const w = a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]
    return [q1, q2, q3, w]
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
const norm = a => Math.sqrt(dot(a, a))
const normalize = a => {
    const len = norm(a)
    return [a[0] / len, a[1] / len, a[2] / len, a[3] / len]
}
const scale = (q, s) => [q[0] * s, q[1] * s, q[2] * s, q[3] * s]
module.exports = {multiply, dot, norm, normalize, scale}