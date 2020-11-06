import { hasNegativeMod, hasPositiveMod, parseAttr } from '../helpers';

const MAP = {
  row: ['* 0 0 *', '0 * * 0'],
  column: ['* * 0 0', '0 0 * *'],
};

export default function groupRadiusAttr(val) {
  const { values, mods } = parseAttr(val, 1);

  const flow = mods.includes('column') ? 'column' : 'row';
  const reverse = mods.includes('reverse');
  let value = values[0];

  if (hasNegativeMod(mods)) {
    value = '0';
  }

  if (!value) {
    if (mods.includes('round')) {
      value = '9999rem';
    } else if (mods.includes('ellipse')) {
      value = '50%';
    } else {
      value = 'var(--nu-radius)';
    }
  }

  const startValue = MAP[flow][reverse ? 1 : 0].replace(/\*/g, value);
  const endValue = MAP[flow][reverse ? 0 : 1].replace(/\*/g, value);

  return [{
    $suffix: '>:first-child:not([radius])',
    'border-radius': startValue,
    '--nu-local-border-radius': startValue,
  }, {
    $suffix: '>:last-child:not([radius])',
    'border-radius': endValue,
    '--nu-local-border-radius': endValue,
  }, {
    $suffix: '>:not(:last-child):not(:first-child):not([radius])',
    'border-radius': '0',
    '--nu-local-border-radius': '0',
  }];
}
