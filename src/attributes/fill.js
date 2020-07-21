import { convertCustomFuncs, parseColor } from '../helpers';

const BG_STYLE = 'background-color';
const LOCAL_PROP = '--nu-local-bg-color';
const LOCAL_VALUE = `var(${LOCAL_PROP}, var(--nu-bg-color))`;
const DIFF_PROP = '--nu-diff-color';
const SHADOW_PROP = '--nu-local-shadow-color';
const MARK_PROP = '--nu-local-mark-color';
const BORDER_PROP = '--nu-local-border-color';
const TEXT_PROP = '--nu-local-text-color';
const SHADOW_VALUE = 'var(--nu-shadow-color)';
const BORDER_VALUE = 'var(--nu-border-color)';
const SPECIAL_BORDER_VALUE = 'var(--nu-special-text-color)';
const SPECIAL_SHADOW_VALUE = 'var(--nu-special-shadow-color)';
const MARK_VALUE = 'var(--nu-mark-color)';
const SPECIAL_MARK_VALUE = 'var(--nu-special-mark-color)';
const BG_VALUE = 'var(--nu-bg-color)';
const SUBTLE_VALUE = 'var(--nu-subtle-color)';
const TEXT_VALUE = ''; // make it invalid
const SPECIAL_TEXT_VALUE = 'var(--nu-special-text-color)';

export default function fillAttr(val) {
  val = convertCustomFuncs(val);

  let { color, name, opacity } = parseColor(val);

  if (!val || name === 'local') {
    return [{
      $suffix: ':not([theme])',
      [BG_STYLE]: LOCAL_VALUE,
    }, {
      $suffix: '[theme]',
      [BG_STYLE]: BG_VALUE,
      [LOCAL_PROP]: BG_VALUE,
      [DIFF_PROP]: SUBTLE_VALUE,
    }];
  } else if (!color) {
    const bgValue = `var(--nu-${val}-color)`;

    return [{
      [BG_STYLE]: bgValue,
      [LOCAL_PROP]: bgValue,
    }];
  }

  let styles;

  if (name === 'bg' || name === 'subtle' || name === 'clear') {
    let otherColor;

    if (name === 'bg') {
      otherColor = SUBTLE_VALUE;
    } else {
      otherColor = BG_VALUE;
    }

    styles = [{
      $suffix: '>:not([fill]):not([nu-popup])',
      [BORDER_PROP]: BORDER_VALUE,
    }, {
      [DIFF_PROP]: otherColor,
      [LOCAL_PROP]: color,
      [`--nu-local-bg-color-rgb`]: `var(--nu-${name}-color-rgb, var(--nu-bg-color-rgb))`,
      [SHADOW_PROP]: SHADOW_VALUE,
      [TEXT_PROP]: TEXT_VALUE,
      [BG_STYLE]: LOCAL_VALUE,
      [MARK_PROP]: MARK_VALUE,
    }];
  } else {
    styles = [{
      [LOCAL_PROP]: color,
      [BG_STYLE]: LOCAL_VALUE,
    }];

    if (name === 'special-bg') {
      styles[0][TEXT_PROP] = SPECIAL_TEXT_VALUE;
      styles[0][MARK_PROP] = SPECIAL_MARK_VALUE;
      styles[0][SHADOW_PROP] = SPECIAL_SHADOW_VALUE;
      styles.push({
        $suffix: '>:not([fill]):not([nu-popup])',
        [BORDER_PROP]: SPECIAL_BORDER_VALUE,
      });
      styles.push({
        $suffix: ':not([color])',
        color: SPECIAL_TEXT_VALUE,
      });
    }
  }

  return styles;
}
