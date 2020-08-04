import isHex from './isHex';

function parseRGB(str: string) {
  if (isHex(str)) {
    str = str.replace('#', '');
    let arr: RegExpMatchArray = [];
    if (str.length === 6) {
      const res = str.match(/[a-zA-Z0-9]{2}/g);
      if (res) {
        arr = res;
      }
    }
    return arr.map(c => parseInt(c, 16));
  }
}

function rgbToHsl(rgbStr: string) {
  let [r, g, b] = parseRGB(rgbStr) || [255, 255, 255];
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let l = (max + min) / 2;
  return l;
}

function isDark(rgbStr: string) {
  let l = rgbToHsl(rgbStr);
  return l < 0.5;
}

export default isDark;
