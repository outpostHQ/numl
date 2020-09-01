import { parseAttr } from '../helpers';

export default function rotateAttr(val) {
  if (!val) return;

  const { values } = parseAttr(val);

  return {
    '--nu-transform-rotate': `rotate(${values.join(', ')})`,
  };
}
