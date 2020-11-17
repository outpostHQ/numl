import { isNoValue, isYesValue, parseAttr } from '../helpers';
import { prop } from '../props-helpers';

const SHADOW = 'rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), .33)';
const TRANSPARENT = 'rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 0)';

export default function shadowAttr(val, defaults, options = {}) {
  const {
    shadow, // default shadow color
    defaultValue, // default size value
    inset, // is it inset shadow?
    ignoreSpread,
  } = options;

  if (isYesValue(val)) {
    val = '';
  } else if (isNoValue(val)) {
    val = '0 #shadow.0';
  }

  const propName = `--local-${inset ? 'inset' : 'depth'}-shadow`;

  let { values, mods, color } = parseAttr(val, 1);

  let value;

  if (mods.length) {
    const name = mods[0];
    value = `${prop(`${name}-shadow`)} ${color || ''}${inset ? ' inset' : ''}`;
  } else {
    color = color || shadow || (isNoValue(val) ? TRANSPARENT : SHADOW);

    let size = defaultValue || '1rem';
    let x = '0';
    let y = inset ? '0' : `calc(${size} / 3)`;
    let spread = '0';

    if (values.length === 1) {
      size = values[0];
      y = inset ? '0' : `calc(${size} / 3)`;
    } else if (values.length >= 2) {
      x = values[0];
      y = values[1];

      if (values[2]) {
        size = values[2];
      }

      if (values[3]) {
        spread = values[3];
      }
    }

    value = `${x} ${y} ${size}${ignoreSpread ? '' : ` ${spread}`} ${color}${inset ? ' inset' : ''}`;
  }

  const styles = {
    [propName]: value,
  };

  return styles;
}
