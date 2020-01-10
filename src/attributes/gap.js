import { parseAttr } from '../helpers';

const BASE = 'var(--nu-indent)';

/**
 * CSS Gap value. Used for flex and grid layouts.
 * @param val
 * @returns {*}
 */
export default function gapAttr(val) {
  if (val == null) return;

  const { values } = parseAttr(val);

  const vGap = values[0] || BASE;
  const hGap = values[1] || vGap;

  const fullVal = values.join(' ') || BASE;

  return [{
    gap: fullVal,
    'grid-gap': fullVal,
    '--nu-local-v-gap': vGap,
    '--nu-local-h-gap': hGap,
  }, {
    $suffix: '>*',
    '--nu-v-gap': vGap,
    '--nu-h-gap': hGap,
  }];
}
