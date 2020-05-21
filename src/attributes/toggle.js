import { parseAttr } from '../helpers';

export default function toggleAttr(val) {
  const { values } = parseAttr(val, 1);
  const size = values[0] || '0';
  const intensity = values[1] || 'var(--nu-local-intensity, var(--nu-intensity))';

  const color = `rgba(0, 0, 0, ${intensity})`;

  return {
    '--nu-local-toggle-shadow': `0 0 ${size} 0 ${color} inset;`,
  };
}
