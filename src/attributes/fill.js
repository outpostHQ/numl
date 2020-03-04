import { parseColor } from '../helpers';

const BG_STYLE = 'background-color';
const LOCAL_PROP = '--nu-local-bg-color';
const LOCAL_VALUE = `var(${LOCAL_PROP}, var(--nu-bg-color))`;
const DIFF_PROP = '--nu-diff-color';
const INTENSITY_PROP = '--nu-local-intensity';
const HOVER_PROP = '--nu-local-hover-color';
const BORDER_PROP = '--nu-local-border-color';
const TEXT_PROP = '--nu-local-text-color';
const INTENSITY_VALUE = 'var(--nu-intensity)';
const SPECIAL_INTENSITY_VALUE = 'var(--nu-special-intensity)';
const BORDER_VALUE = 'var(--nu-border-color)';
const SPECIAL_BORDER_VALUE = 'var(--nu-special-text-color)';
const HOVER_VALUE = 'var(--nu-hover-color)';
const SPECIAL_HOVER_VALUE = 'var(--nu-special-hover-color)';
const BG_VALUE = 'var(--nu-bg-color)';
const SUBTLE_VALUE = 'var(--nu-subtle-color)';
const TEXT_VALUE = ''; // make it invalid
const SPECIAL_TEXT_VALUE = 'var(--nu-special-text-color)';

export default function fillAttr(val) {
  let { color, name } = parseColor(val);

  if (!val || !color || name === 'local') {
    return [{
      $suffix: ':not([theme])',
      [BG_STYLE]: LOCAL_VALUE,
    }, {
      $suffix: '[theme]',
      [BG_STYLE]: BG_VALUE,
      [LOCAL_PROP]: BG_VALUE,
      [DIFF_PROP]: SUBTLE_VALUE,
    }];
  }

  if (name === 'bg' || name === 'subtle') {
    let otherColor;

    if (name === 'bg') {
      otherColor = SUBTLE_VALUE;
    } else {
      otherColor = BG_VALUE;
    }

    return [{
      $suffix: '>:not([fill]):not([nu-popup])',
      [BORDER_PROP]: BORDER_VALUE,
    }, {
      [INTENSITY_PROP]: INTENSITY_VALUE,
      [DIFF_PROP]: otherColor,
      [LOCAL_PROP]: color,
      [`--nu-local-${name}-color-rgb`]: `var(--nu-${name}-color-rgb, var(--nu-bg-color-rgb))`,
      [TEXT_PROP]: TEXT_VALUE,
      [BG_STYLE]: LOCAL_VALUE,
      [HOVER_PROP]: HOVER_VALUE,
    }];
  }

  const styles = [{
    [LOCAL_PROP]: color,
    [BG_STYLE]: LOCAL_VALUE,
  }];

  if (name === 'special-bg') {
    styles[0][INTENSITY_PROP] = SPECIAL_INTENSITY_VALUE;
    styles[0][TEXT_PROP] = SPECIAL_TEXT_VALUE;
    styles[0][HOVER_PROP] = SPECIAL_HOVER_VALUE;
    styles.push({
      $suffix: '>:not([fill]):not([nu-popup])',
      [BORDER_PROP]: SPECIAL_BORDER_VALUE,
    });
  }

  return styles;
}
