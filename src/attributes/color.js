import { colorUnit } from '../helpers';

const backgroundUnit = colorUnit('background-color', 'background');
const baseColorUnit = colorUnit('color', 'text');

export default function colorAttr(val) {
  if (val == null) return;

  val = val.trim();

  if (val === 'swap') {
    return {
      color: 'var(--nu-theme-background-color)',
      'background-color': 'var(--nu-theme-color)',
    };
  }

  if (val.includes(' ')) {
    const tmp = val.split(/\s+/);

    return {
      ...baseColorUnit(tmp[0]),
      ...backgroundUnit(tmp[1]),
    };
  }

  return baseColorUnit(val);
}
