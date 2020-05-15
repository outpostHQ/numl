import { parseAttr } from '../helpers';

const INTENSITY = 'var(--nu-local-intensity, var(--nu-intensity))';
const SPECIAL_INTENSITY = 'var(--nu-special-intensity)';

export default function shadowAttr(val) {
  const { values, mods, color } = parseAttr(val, 1);

  const baseIntensity = mods.includes('special') ? SPECIAL_INTENSITY : INTENSITY;

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

  if (color) {
    return {
      '--nu-local-depth-shadow': `${x} ${y} ${size} ${spread} ${color}`,
    };
  }

  let intensityModifier = (parseFloat(size).toFixed(2) || 1) * 2;

  if (intensityModifier !== intensityModifier) {
    intensityModifier = 2;
  }

  return {
    '--nu-local-depth-shadow': `${x} ${y} ${size} ${spread} ${size === '0rem' ? 'rgba(0, 0, 0, 0)' : `rgba(0, 0, 0, calc(${baseIntensity} / ${intensityModifier}))`}`,
  };
}
