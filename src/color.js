import { hsluvToRgb, rgbToHsluv, hpluvToHsluv, hpluvToRgb } from './hsluv';

export function hslToRgb(hsl) {
  return hsluvToRgb(hsl).map(n => Math.round(n));
}

export function hplToRgb(hpl) {
  return hpluvToRgb(hpl).map(n => Math.round(n));
}

export function rgbToHsl(rgb) {
  return rgbToHsluv(rgb.slice(0, 3));
}

export function hslToRgbaStr(hsl) {
  return `rgba(${hslToRgb(hsl).join(',')}, ${hsl[3] || 1})`;
}

export function hplToRgbaStr(hsl) {
  return `rgba(${hplToRgb(hsl).join(',')}, ${hsl[3] || 1})`;
}

function setPrecision(num, fixed = 2) {
  return Number((num).toFixed(fixed));
}

const TO_RELATIVE = [];
const FROM_RELATIVE = [];
const TO_RELATIVE_MAP = {};
const FROM_RELATIVE_MAP = {};
const TO_RELATIVE_CACHE = {};
const FROM_RELATIVE_CACHE = {};

export function getContrastRatio(hslA, hslB) {
  const a = Array.isArray(hslA) ? toRelative(hslA[2]) / 100 : hslA;
  const b = Array.isArray(hslB) ? toRelative(hslB[2]) / 100 : hslB;
  const l1 = Math.max(a, b);
  const l2 = Math.min(a, b);

  return (l1 + 0.05) / (l2 + 0.05);
}

const getRelativeLuminance = (function () {
  const rc = 0.2126;
  const gc = 0.7152;
  const bc = 0.0722;
  const lowc = 1 / 12.92;

  function adjustGamma(_) {
    return Math.pow((_ + 0.055) / 1.055, 2.4);
  }

  return function getRelativeLuminance(rgb) {
    const rsrgb = rgb[0] / 255;
    const gsrgb = rgb[1] / 255;
    const bsrgb = rgb[2] / 255;

    const r = rsrgb <= 0.03928 ? rsrgb * lowc : adjustGamma(rsrgb);
    const g = gsrgb <= 0.03928 ? gsrgb * lowc : adjustGamma(gsrgb);
    const b = bsrgb <= 0.03928 ? bsrgb * lowc : adjustGamma(bsrgb);

    return (r * rc + g * gc + b * bc) * 100;
  };
})();

export function mix(hslA, hslB, pow = 0.5) {
  return hslA.map((c, i) => {
    if (!i) {
      if (hslA[1] < 0.01) {
        return hslB[0];
      } else if (hslB[1] < 0.01) {
        return hslA[0];
      }

      const max = Math.max(hslB[0]);
      const min = Math.min(hslA[0]);
      const change = (max - min) > 180;
      const maxN = change ? min + 360 : max;
      const minN = change ? max : min;
      const powN = ((hslB[0] === max) ^ change) ? pow : (1 - pow);
      const value = minN + (maxN - minN) * powN;

      return value % 360;
    } else {
      return (hslB[i] - c) * pow + c;
    }
  });
}

export function findContrastColor(hsl, refL = 1, ratio = 4.5, dir) {
  hsl = [...hsl];

  const l1 = toRelative(refL);
  const l2 = getLuminanceByRatio(l1, ratio, dir);

  if (l2 == null) return null; // can't be found

  hsl[2] = fromRelative(l2);

  return hsl;
}

export function findContrastLightness(refL = 1, ratio = 4.5, dir) {
  if (ratio === 1) return refL;

  const l1 = toRelative(refL);
  const l2 = getLuminanceByRatio(l1, ratio, dir);

  if (l2 == null) return null; // can't be found

  return fromRelative(l2);
}

const INVERT_OFFSET = rgbToHsl([32, 32, 32])[2];

export function invertColor(rgb, offset = INVERT_OFFSET) {
  const hsl = rgbToHsluv(rgb);
  const l1 = Math.max(hsl[2], offset);
  const l2 = 100 - l1;

  hsl[2] = l2 * (100 - offset) / 100 + offset;

  return hsluvToRgb(hsl);
}

export function getLuminanceByRatio(l1, ratio = 4.5, dir) {
  ratio += 0.04; // compensation for error (RGB rounding)

  l1 = l1 / 100;

  ratio = (dir ? 1 / ratio : ratio);

  let l2 = (l1 + 0.05) * ratio - 0.05;

  if (dir == null && (l2 > 1 || l2 < 0)) {
    l2 = (l1 + 0.05) / ratio - 0.05;
  }

  if (l2 > 1 || l2 < 0) {
    return null; // can't be found
  }

  return l2 * 100;
}

for (let i = 1; i <= 255; i += .25) {
  const clr = [i, i, i];
  const hslL = rgbToHsluv(clr)[2];
  const relL = getRelativeLuminance(clr);

  TO_RELATIVE.push(hslL);
  FROM_RELATIVE.push(relL);

  TO_RELATIVE_MAP[hslL] = relL;
  FROM_RELATIVE_MAP[relL] = hslL;
}

function findClosest(val, arr) {
  let closest = arr[0];
  let closestValue = Math.abs(arr[0] - val);
  let secondClosest;

  for (let i = 1; i < arr.length; i++) {
    let currentValue = Math.abs(arr[i] - val);
    if (currentValue < closestValue) {
      closestValue = currentValue;
      closest = arr[i];
    }
  }

  secondClosest = arr[arr.indexOf(closest) + (val > closest ? 1 : -1)];

  return [closest, secondClosest];
}

export function toRelative(l) {
  l = setPrecision(l);

  if (TO_RELATIVE_CACHE[l]) {
    return TO_RELATIVE_CACHE[l];
  }

  const rgb = hsluvToRgb([0, 0, l]);

  const value = getRelativeLuminance(rgb);

  TO_RELATIVE_CACHE[l] = value;

  return value;
}

// export function toRelative(l) {
//   if (TO_RELATIVE_CACHE[l]) {
//     return TO_RELATIVE_CACHE[l];
//   }
//
//   l = Math.max(Math.min(l, 100), 0);
//
//   if (l === 0) return 0;
//   if (l === 100) return 100;
//
//   const closest = findClosest(l, TO_RELATIVE);
//   const closeMin = Math.min(...closest);
//   const closeMax = Math.max(...closest);
//   const min = TO_RELATIVE_MAP[closeMin];
//   const max = TO_RELATIVE_MAP[closeMax];
//
//   const ratio = Math.pow((l - closeMin) * (closeMax - closeMin), 1 / 4);
//
//   const value = (max - min) * ratio + min;
//
//   TO_RELATIVE_CACHE[l] = value;
//
//   return value;
// }

export function fromRelative(l, exp = 4) {
  l = setPrecision(l);

  if (FROM_RELATIVE_CACHE[l]) {
    return FROM_RELATIVE_CACHE[l];
  }

  l = Math.max(Math.min(l, 100), 0);

  if (l === 0) return 0;
  if (l === 100) return 100;

  const closest = findClosest(l, FROM_RELATIVE);
  const closeMin = Math.min(...closest);
  const closeMax = Math.max(...closest);
  const min = FROM_RELATIVE_MAP[closeMin];
  const max = FROM_RELATIVE_MAP[closeMax];

  const ratio = Math.pow((l - closeMin) * (closeMax - closeMin), 1 / exp);

  const value = (max - min) * ratio + min;

  FROM_RELATIVE_CACHE[l] = value;

  return value;
}

function calcError() {
  const exp = 4;
  let sum = 0;

  for (let i = 0; i <= 100; i += 0.1) {
    sum += Math.abs(i - fromRelative(toRelative(i, exp), exp)) || 0;
  }

  // console.log(sum);
}

/**
 * Get a new color with specified luminance.
 * @param hsl
 * @param lum
 * @returns {*[]}
 */
export function setLuminance(hsl, lum) {
  const hslNew = [...hsl];

  hslNew[2] = lum;

  return hslNew;
}

export function setOpacity(hsl, opacity) {
  const hslNew = [...hsl.slice(0, 3)];

  hslNew.push(opacity);

  return hslNew;
}

export function setPastelSaturation(hsl, saturation = 100) {
  const hpl = [...hsl];

  hpl[1] = saturation;

  const converted = hpluvToHsluv(hpl);

  return hsl.length > 3 ? [...converted, hsl[3]] : converted;
}

export function setSaturation(hsl, saturation = 100, pastel = false) {
  const newHsl = [...hsl];

  if (saturation != null) {
    newHsl[1] = saturation;
  }

  newHsl[1] = (pastel ? hpluvToHsluv(newHsl) : newHsl)[1];

  // return saturationFix([...hsl], newSaturation);

  return newHsl;
}

export function getOptimalSaturation(hue, baseSaturation) {
  const hsl = hpluvToHsluv([hue, 100, 50]);
  const max = hsl[1];

  if (baseSaturation == null) {
    return (100 + max) / 2;
  }

  if (baseSaturation > max) {
    return ((baseSaturation - max) / 125 * baseSaturation) + max;
  }

  return baseSaturation;
}

const optimalSaturation = 75;

export function setOptimalSaturation(hsl) {
  hsl = [...hsl];

  hsl[1] = optimalSaturation;

  return hsl;
}

export function getTheBrightest(hslA, hslB) {
  return hslA[2] > hslB[2] ? [...hslA] : [...hslB];
}

export function getSaturationRatio(hue, saturation, pastel) {
  if (pastel) {
    const pastelSaturation = setPastelSaturation([hue, 50, 50])[1];
    const referenceSaturation = pastelSaturation * saturation / 100;

    return referenceSaturation / 100;
  } else {
    return saturation / 100;
  }
}

export function rgbaStrToRgbValues(rgba) {
  return rgba.slice(5,-1).split(',').slice(0,3).join(',');
}
