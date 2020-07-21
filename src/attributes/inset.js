import { hasNoMod, parseAttr } from '../helpers';

export default function insetAttr(val) {
  let { values, mods, color } = parseAttr(val, 1);

  if (!values.length) {
    if (!hasNoMod(mods)) {
      values = ['.75em'];
    } else if (hasNoMod(mods)) {
      values = ['0'];
    }
  }

  const size = values[0] || '0';

  color = color || `var(--nu-local-shadow-color, var(--nu-shadow-color, var(--nu-main-shadow-color)))`;

  const styles = {
    '--nu-local-inset-shadow': `0 0 ${size} 0 ${color} inset;`,
  };

  if (mods.includes('active')) {
    styles.$suffix = '[is-active]';
  }

  return [styles];
}
