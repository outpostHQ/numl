import { hasNoMod, parseAttr } from '../helpers';

export default function insetAttr(val) {
  let { values, mods } = parseAttr(val, 1);

  if (!values.length) {
    if (!hasNoMod(mods)) {
      values = ['.75em'];
    } else if (hasNoMod(mods)) {
      values = ['0'];
    }
  }

  const size = values[0] || '0';
  const intensity = values[1] || 'var(--nu-local-intensity, var(--nu-intensity))';

  const color = `rgba(0, 0, 0, ${intensity})`;

  const styles = {
    '--nu-local-inset-shadow': `0 0 ${size} 0 ${color} inset;`,
  };

  if (mods.includes('active')) {
    styles.$suffix = '[is-active]';
  }

  return [styles];
}
