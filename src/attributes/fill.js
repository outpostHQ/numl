import { colorUnit } from '../helpers';

const backgroundUnit = colorUnit('--nu-local-bg-color', 'bg');

export default function fillAttr(val) {
  return {
    ...backgroundUnit(val),
    'background-color': 'var(--nu-local-bg-color)',
  };
}
