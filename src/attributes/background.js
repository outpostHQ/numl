import { colorUnit } from '../helpers';

const backgroundUnit = colorUnit('background-color', 'background');

export default function backgroundAttr(val) {
  if (val && (val.includes('url(') || val.includes('gradient'))) {
    return {
      'background': val,
      'background-color': 'var(--nu-theme-background-color)',
    };
  }

  return backgroundUnit(val);
}
