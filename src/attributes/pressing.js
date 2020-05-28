import { hasNoMod, hasYesMod, parseAttr } from '../helpers';

export default function pressingAttr(val) {
  let { values, mods } = parseAttr(val, 1);

  if (!values.length) {
    if (hasYesMod(mods)) {
      values = ['.75em'];
    } else if (hasNoMod(mods)) {
      values = ['0'];
    }
  }

  const size = values[0] || '0';
  const intensity = values[1] || 'var(--nu-local-intensity, var(--nu-intensity))';

  const color = `rgba(0, 0, 0, ${intensity})`;

  return {
    '--nu-local-toggle-shadow': `0 0 ${size} 0 ${color} inset;`,
  };
}
