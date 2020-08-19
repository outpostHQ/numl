import { isNoValue, isYesValue, parseAttr } from '../helpers';

const SHADOW = 'rgba(var(--nu-shadow-color-rgb), .33)';
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

  let { values, mods, color } = parseAttr(val, 1);

  color = color || (mods.includes('special')
    ? (specialShadow || SPECIAL_SHADOW)
    : (shadow || SHADOW));

  let x = '0';
  let y = '0';
  let size = defaultValue || '1rem';
  let spread = '0';

  if (values.length === 1) {
    size = values[0];
    y = `calc(${size} / 3)`;
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

  const prop = `--nu-local-${inset ? 'inset' : 'depth'}-shadow`;
  const value = `${x} ${y} ${size} ${spread} ${color}${inset ? ' inset' : ''}`;
  const styles = {
    [prop]: value,
  };

  if (active && mods.includes('active')) {
    styles.$suffix = '[is-active]';
  }

  return styles;
}
