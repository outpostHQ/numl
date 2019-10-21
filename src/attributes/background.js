import { colorUnit } from '../helpers';

const backgroundUnit = colorUnit('--nu-background-color', 'background');

export default function backgroundAttr(val) {
  return {
    ...backgroundUnit(val),
    'background-color': 'var(--nu-background-color)',
  };
}
