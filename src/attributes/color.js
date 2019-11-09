import { colorUnit } from '../helpers';

const baseColorUnit = colorUnit('color', 'text');

export default function colorAttr(val) {
  if (val == null) return;

  return baseColorUnit(val);
}
