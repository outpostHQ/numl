import { isNoValue, isYesValue, parseAttr } from '../helpers';
import { DIRECTIONS } from '../helpers';

const PROP = 'var(--radius)';
const SHARP = 'var(--leaf-sharp-radius)';

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
    values = [PROP];
  }

  if (mods.includes('leaf')) {
    values = [values[1] || SHARP, values[0] || PROP, values[1] || SHARP, values[0] || PROP];
  } else if (mods.includes('backleaf')) {
    values = [values[0] || PROP, values[1] || SHARP, values[0] || PROP, values[1] || SHARP];
  } else if (mods.length) {
    const arr = ['0', '0', '0', '0'];

    let flag = false;

    DIRECTIONS.forEach((dir, i) => {
      if (!mods.includes(dir)) return;

      flag = true;

      arr[i] = values[0] || PROP;
      arr[(i + 1) % 4] = values[0] || PROP;
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
