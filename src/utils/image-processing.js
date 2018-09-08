import Rect from './rect';

export function computeBoundingRect(image) {
  const rect = new Rect(image);

  for (let i = 0; i < image.width * image.height; i += 1) {
    const j = i * 4;

    if (image.data[j + 0] > 0 || image.data[j + 1] > 0 || image.data[j + 2] > 0) {
      const x = i % image.width;
      const y = Math.floor(i / image.width);

      rect.xmin = Math.min(x, rect.xmin);
      rect.xmax = Math.max(x, rect.xmax);
      rect.ymin = Math.min(y, rect.ymin);
      rect.ymax = Math.max(y, rect.ymax);
    }
  }

  return rect;
}

export function convertToGrayscale(image) {
  const dataGrayscale = [];
  const { data } = image;

  for (let i = 0; i < image.width * image.height; i += 1) {
    const j = i * 4;
    const avg = (data[j + 0] + data[j + 1] + data[j + 2]) / 3;
    const normalized = avg / 255.0;
    dataGrayscale.push(normalized);
  }

  return dataGrayscale;
}
