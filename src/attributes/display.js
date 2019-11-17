const DOUBLE_DISPLAY = ['block', 'table', 'flex', 'grid'];

// to reset style
const RESET_VALUE = '0 !important';
// to disable style
const INVALID_VALUE = '- !important';

export default function displayAttr(val) {
  if (!val) return;

  return (DOUBLE_DISPLAY.includes(val)
    ? [{
      $suffix: ':not([inline])',
      display: val,
    }, {
      $suffix: '[inline]',
      display: `inline-${val}`,
    }]
    : [{ display: val }])
    .concat(val.endsWith('grid')
      ? [{
        $suffix: '>*',
        '--nu-v-gap': INVALID_VALUE,
        '--nu-h-gap': INVALID_VALUE,
      }]
      : [])
    .concat(val.endsWith('flex')
      ? [{
        gap: RESET_VALUE,
        'grid-gap': RESET_VALUE,
      }]
      : []);
};
