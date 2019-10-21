import { colorUnit } from '../helpers';

const backgroundUnit = colorUnit('background-color', 'background');
const baseColorUnit = colorUnit('color', 'text');

export default function colorAttr(val) {
  if (val == null) return;

  if (val.includes(' ')) {
    const tmp = val.split(' ');

    return {
      ...baseColorUnit(tmp[0]),
      ...backgroundUnit(tmp[1]),
    };
  }

  return baseColorUnit(val);
}
