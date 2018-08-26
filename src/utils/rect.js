export default class Rect {
  constructor(image) {
    this.xmin = image.width;
    this.xmax = -1;
    this.ymin = image.height;
    this.ymax = -1;
  }

  computeWidth() {
    return this.xmax - this.xmin + 1;
  }

  computeHeight() {
    return this.ymax - this.ymin + 1;
  }
}
