import { colorUnit } from '../helpers';

const backgroundUnit = colorUnit('--nu-local-bg-color', 'bg');

export default function fillAttr(val) {
  if (val === 'bg' || val === 'subtle') {
    let color = backgroundUnit(val, true);
    let otherColor;

    if (val === 'bg') {
      otherColor = 'var(--nu-subtle-color)';
    } else {
      otherColor = 'var(--nu-bg-color)';
    }

    return [{
      $suffix: '>*',
      '--nu-diff-color': otherColor,
      '--nu-other-diff-color': color,
    }, {
      '--nu-local-bg-color': color,
      'background-color': 'var(--nu-local-bg-color)',
    }];
  }

  return [{
    ...backgroundUnit(val),
    'background-color': 'var(--nu-local-bg-color)',
  }];
}
