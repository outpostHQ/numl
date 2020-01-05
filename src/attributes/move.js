import { parseAttr } from '../helpers';

export default function moveAttr(val) {
  if (!val) return;

  const { values } = parseAttr(val);

  return {
    $suffix: ':not([transform]):not([rotate]):not([scale])',
    '--nu-transform': `translate(${values.join(', ')})`,
    transform: 'var(--nu-transform-place, translate(0, 0)) var(--nu-transform)',
  };
}
