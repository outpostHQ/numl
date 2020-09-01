import { FLEX_GAP_SUPPORTED } from './gap';

const DOUBLE_DISPLAY = ['block', 'table', 'flex', 'grid'];

// to reset style
const RESET_VALUE = '0 !important';

export default function displayAttr(val) {
  if (!val) return;

  return (DOUBLE_DISPLAY.includes(val)
    ? [{
      $suffix: ':not([inline])',
      display: val,
    }, {
      $suffix: ':not([inline])[hidden]',
      display: val,
    }, {
      $suffix: '[inline]',
      display: `inline-${val}`,
    }, {
      $suffix: '[inline][hidden]',
      display: `inline-${val}`,
    }]
    : [{ display: val }])
    .concat(val.endsWith('grid')
      ? [{
        $suffix: '>*',
        '--nu-v-gap': RESET_VALUE,
        '--nu-h-gap': RESET_VALUE,
      }]
      : [])
    .concat(val.endsWith('flex')
      ? (!FLEX_GAP_SUPPORTED
        ? [{
          gap: RESET_VALUE,
          'grid-gap': RESET_VALUE,
        }]
        : [{
          $suffix: '>*',
          '--nu-v-gap': RESET_VALUE,
          '--nu-h-gap': RESET_VALUE,
        }])
      : []);
};
