import { parseAttr } from '../helpers';

export default function moveAttr(val) {
  if (!val) {
    val = '0 0';
  }

  const { values } = parseAttr(val, 1);

  return {
    '--nu-transform-move': `translate(${values.join(', ')})`,
  };
}
