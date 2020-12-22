import { isNoValue, isYesValue, parseAttr } from '../helpers';
import { DIRECTIONS } from '../helpers';

export default function radiusAttr(val) {
  if (!val || isYesValue(val)) {
    val = '';
  }

  if (isNoValue(val)) {
    return;
  }

  let { mods, values } = parseAttr(val, 1);

  if (mods.includes('round')) {
    values = ['9999rem'];
  } else if (mods.includes('ellipse')) {
    values = ['50%'];
  } else if (!values.length) {
    values = ['var(--radius)'];
  }

  if (mods.length) {
    const arr = ['0', '0', '0', '0'];

    let flag = false;

    DIRECTIONS.forEach((dir, i) => {
      if (!mods.includes(dir)) return;

      flag = true;

      arr[i] = values[0] || 'var(--radius)';
      arr[(i + 1) % 4] = values[0] || 'var(--radius)';
    });

    if (flag) {
      values = arr;
    }
  }

  return {
    '--local-radius': values.join(' '),
    'border-radius': 'var(--local-radius)',
  };
}
