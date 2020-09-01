import { isNoValue, isYesValue, parseAttr } from '../helpers';
import { prop } from '../props-helpers';

const SHADOW = 'rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), .33)';
const SPECIAL_SHADOW = 'rgba(var(--nu-special-shadow-color-rgb), .33)';

export default function shadowAttr(val, defaults, options = {}) {
  const {
    shadow, // default shadow color
    specialShadow, // default special shadow color
    defaultValue, // default size value
    active, // has `active` modifier
    inset, // is it inset shadow?
  } = options;

  if (isYesValue(val)) {
    val = '';
  } else if (isNoValue(val)) {
    val = '0';
  }

  const propName = `--nu-local-${inset ? 'inset' : 'depth'}-shadow`;

  let { values, mods, color } = parseAttr(val, 1);
  let isSpecial = false;

  if (mods.includes('special')) {
    isSpecial = true;
    mods = mods.filter(m => m !== 'special');
  }

  let value;

  if (mods.length) {
    const name = mods[0];
    value = `${prop(`${name}-shadow`)} ${color || ''}${inset ? ' inset' : ''}`;
  } else {
    color = color || (isSpecial
      ? (specialShadow || SPECIAL_SHADOW)
      : (shadow || SHADOW));

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

    value = `${x} ${y} ${size} ${spread} ${color}${inset ? ' inset' : ''}`;
  }

  const styles = {
    [propName]: value,
  };

  if (active && mods.includes('active')) {
    styles.$suffix = '[is-active]';
  }

  return styles;
}
