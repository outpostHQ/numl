import { colorUnit } from '../helpers';

const backgroundUnit = colorUnit('--nu-background-color', 'bg');

export default function fillAttr(val) {
  return {
    ...backgroundUnit(val),
    'background-color': 'var(--nu-background-color)',
  };
}
