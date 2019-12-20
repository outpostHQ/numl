import { colorUnit } from '../helpers';

const backgroundUnit = colorUnit('--nu-local-bg-color', 'bg');

export default function fillAttr(val) {
  if (val === 'diff' || val === 'bg' || val === 'subtle') {
    let color = val === 'diff'
      ? 'var(--nu-diff-color, var(--nu-subtle-color))'
      : backgroundUnit(val, true);
    let otherColor = 'var(--nu-other-diff-color)';

    if (val === 'bg') {
      otherColor = 'var(--nu-subtle-color)';
    } else if (val === 'subtle') {
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
