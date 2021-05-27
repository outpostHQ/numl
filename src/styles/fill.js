import { convertCustomFuncs, parseColor } from '../helpers';

const BG_STYLE = 'background-color';
const LOCAL_PROP = '--local-bg-color';
const LOCAL_VALUE = `var(${LOCAL_PROP}, var(--bg-color))`;
const DIFF_PROP = '--diff-color';
const SHADOW_PROP = '--local-shadow-color';
const SHADOW_RGB_PROP = '--local-shadow-color-rgb';
const MARK_PROP = '--local-mark-color';
const BORDER_PROP = '--local-border-color';
const TEXT_PROP = '--local-text-color';
const SHADOW_VALUE = 'var(--shadow-color)';
const SHADOW_RGB_VALUE = 'var(--shadow-color-rgb)';
const BORDER_VALUE = 'var(--border-color)';
const SPECIAL_BORDER_VALUE = 'var(--special-text-color)';
const SPECIAL_SHADOW_VALUE = 'var(--special-shadow-color)';
const SPECIAL_RGB_SHADOW_VALUE = 'var(--special-shadow-color-rgb)';
const MARK_VALUE = 'var(--mark-color)';
const SPECIAL_MARK_VALUE = 'var(--special-mark-color)';
const BG_VALUE = 'var(--bg-color)';
const SUBTLE_VALUE = 'var(--subtle-color)';
const TEXT_VALUE = ''; // make it invalid
const SPECIAL_TEXT_VALUE = 'var(--special-text-color) !important';

export default function fillAttr(val) {
  val = convertCustomFuncs(val);

  let { color, name } = parseColor(val);

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
    const bgValue = `var(--${val}-color)`;

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
      [`--local-bg-color-rgb`]: `var(--${name}-color-rgb, var(--bg-color-rgb))`,
      [SHADOW_PROP]: SHADOW_VALUE,
      [SHADOW_PROP]: SHADOW_RGB_VALUE,
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
      styles[0][SHADOW_RGB_PROP] = SPECIAL_RGB_SHADOW_VALUE;
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
