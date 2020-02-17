import { parseAttr } from '../helpers';

const BASE = 'var(--nu-gap)';

// @TODO: Unable to calculate it before BODY is accessible.
// Use native flex gap only for Firefox.
// Other browsers use polyfill.
export const FLEX_GAP_SUPPORTED = CSS.supports('-moz-appearance: none');

// export function isFlexGapSupported() {
//   const els = [1, 2, 3].map(() => document.createElement('div'));
//
//   els[1].style.width = '1px';
//   els[2].style.width = '1px';
//   els[0].appendChild(els[1]);
//   els[0].appendChild(els[2]);
//
//   els[0].style.display = 'inline-flex';
//   els[0].style.gap = '1px';
//
//   document.body.appendChild(els[0]);
//
//   FLEX_GAP_SUPPORTED = els[0].offsetWidth === 3;
//
//   document.body.removeChild(els[0]);
//
//   return FLEX_GAP_SUPPORTED;
// }

/**
 * CSS Gap value. Used for flex and grid layouts.
 * @param val
 * @returns {*}
 */
export default function gapAttr(val) {
  if (val == null) return;

  const { values } = parseAttr(val, true);

  const vGap = values[0] || BASE;
  const hGap = values[1] || vGap;

  const fullVal = values.join(' ') || BASE;

  return [{
    gap: fullVal,
    'grid-gap': fullVal,
    '--nu-local-v-gap': vGap,
    '--nu-local-h-gap': hGap,
    '--nu-local-gap': vGap === hGap ? vGap : null,
  }, {
    $suffix: '>*',
    '--nu-v-gap': vGap,
    '--nu-h-gap': hGap,
  }];
}
