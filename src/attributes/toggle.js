import { parseAttr } from '../helpers';

export default function toggleAttr(val) {
  const { values } = parseAttr(val, true);
  const size = values[0];
  const intensity = values[1] || 'var(--nu-local-intensity, var(--intensity))';

  const color = `rgba(0, 0, 0, ${intensity})`;

  return {
    '--nu-local-toggle-shadow': `0 0 ${size} 0 ${color} inset;`,
  };
}
