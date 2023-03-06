export default class AABB {
  min :  Array<number>
  max: Array<number>
  constructor(min: Array<number>, max: Array<number>) {
    this.min = min;
    this.max = max;
  }
};
