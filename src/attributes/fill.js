import { parseColor } from '../helpers';

const BG_STYLE = 'background-color';
const LOCAL_PROP = '--nu-local-bg-color';
const LOCAL_VALUE = `var(${LOCAL_PROP}, var(--nu-bg-color))`;
const DIFF_PROP = '--nu-diff-color';
const INTENSITY_PROP = '--nu-local-intensity';
const BORDER_PROP = '--nu-local-border-color';
const INTENSITY_VALUE = 'var(--nu-intensity)';
const SPECIAL_INTENSITY_VALUE = 'var(--nu-special-intensity)';
const BORDER_VALUE = 'var(--nu-border-color)';
const SPECIAL_BORDER_VALUE = 'var(--nu-special-text-color)';
const BG_VALUE = 'var(--nu-bg-color)';
const SUBTLE_VALUE = 'var(--nu-subtle-color)';

export default function fillAttr(val) {
  let { color, name } = parseColor(val);

  if (!val || !color || name === 'local') {
    return [{
      [BG_STYLE]: LOCAL_VALUE,
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
      [DIFF_PROP]: otherColor,
      [BORDER_PROP]: BORDER_VALUE,
    }, {
      [INTENSITY_PROP]: INTENSITY_VALUE,
      [LOCAL_PROP]: color,
      [BG_STYLE]: LOCAL_VALUE,
    }];
  }

  const styles = [{
    [LOCAL_PROP]: color,
    [BG_STYLE]: LOCAL_VALUE,
  }];

  if (name === 'special-bg') {
    styles[0][INTENSITY_PROP] = SPECIAL_INTENSITY_VALUE;
    styles.push({
      $suffix: '>:not([fill]):not([nu-popup])',
      [BORDER_PROP]: SPECIAL_BORDER_VALUE,
    });
  }

  return styles;
}
