import { parseAttr } from '../helpers';

export default function moveAttr(val) {
  if (!val) return;

  const { values } = parseAttr(val, 1);

  return {
    '--nu-transform-move': `translate(${values.join(', ')})`,
  };
}
