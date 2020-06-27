import { convertCustomFuncs, parseColor } from '../helpers';

export const BASE_COLOR = 'var(--nu-local-text-color, var(--nu-text-color))';

export default function colorAttr(val) {
  const color = val ? parseColor(convertCustomFuncs(val)).color : BASE_COLOR;

  return [
    { color: color },
    {
      $suffix: '[color]',
      '--nu-local-text-color': color,
    },
  ];
}
