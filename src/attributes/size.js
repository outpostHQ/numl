import { convertUnit } from '../helpers';

export const SIZES = {
  xxs: [.666, 1],
  xs: [.75, 1],
  sm: [.875, 1.5],
  md: [1, 1.5],
  lg: [1.25, 2],
  xl: [1.5, 2],
  xxl: [2, 2.5],
  h1: [2, 2.5],
  h2: [1.8, 2.5],
  h3: [1.6, 2],
  h4: [1.4, 2],
  h5: [1.2, 1.5],
  h6: [1, 1.5],
};

export default function sizeAttr(val) {
  if (!val) return null;

  const tmp = val.trim().split(/\s+/);
  const values = [];

  values[0] = SIZES[tmp[0]] ? String(SIZES[tmp[0]][0]) : tmp[0];

  if (!tmp[1] && SIZES[tmp[0]]) {
    values[1] = String(SIZES[tmp[0]][1]);
  } else {
    values[1] = SIZES[tmp[1]] ? String(SIZES[tmp[1]][1]) : tmp[1];
  }

  const fontSize = convertUnit(values[0]);
  const lineHeight = convertUnit(values[1] || '1.5');

  return {
    'font-size': fontSize,
    'line-height': lineHeight,
    '--nu-font-size': fontSize,
    '--nu-line-height': lineHeight,
  };
}
