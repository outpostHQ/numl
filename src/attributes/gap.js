import { convertUnit, splitStyleValue } from '../helpers';

/**
 * CSS Gap value. Used for flex and grid layouts.
 * @param val
 * @returns {*}
 */
export default function gapAttr(val) {
  if (val == null) return;

  val = convertUnit(val || '1x', 'var(--nu-padding)');

  const values = splitStyleValue(val);
  const vGap = values[0] || val;
  const hGap = values[1] || vGap;

  return [{
    gap: val,
    'grid-gap': val,
  }, {
    $suffix: '>*',
    '--nu-v-gap': vGap,
    '--nu-h-gap': hGap,
  }];
}
