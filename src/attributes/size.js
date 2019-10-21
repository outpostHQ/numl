import { SIZES } from './text';
import { convertUnit } from '../helpers';

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

  return {
    'font-size': convertUnit(values[0]),
    'line-height': convertUnit(values[1] || '1.5')
  };
}
