import { isNoValue, isYesValue, parseAttr } from '../helpers';

const SHADOW = 'rgba(var(--nu-shadow-color-rgb), .5)';
const SPECIAL_SHADOW = 'rgba(var(--nu-special-shadow-color-rgb), .5)';

export default function shadowAttr(val) {
  if (isYesValue(val)) {
    val = '';
  } else if (isNoValue(val)) {
    val = '0';
  }

  let { values, mods, color } = parseAttr(val, 1);

  color = color || (mods.includes('special') ? SPECIAL_SHADOW : SHADOW);

  let x = '0';
  let y = '0';
  let size = '1rem';
  let spread = '0';

  if (values.length === 1) {
    size = values[0];
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

  const value = `${x} ${y} ${size} ${spread} ${color}`;

  if (color) {
    return {
      '--nu-local-depth-shadow': value,
    };
  }

  return {
    '--nu-local-depth-shadow': value,
  };
}
