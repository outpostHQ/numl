import { convertCustomFuncs, parseColor } from '../helpers';

export const BASE_COLOR = 'var(--local-text-color, var(--text-color))';
export const SPECIAL_BASE_COLOR = 'var(--local-special-text-color, var(--special-text-color))';

export default function colorAttr(val) {
  const color = val ? parseColor(convertCustomFuncs(val)).color : BASE_COLOR;

  return [
    { color: color },
    {
      $suffix: '[color]',
      '--local-text-color': color,
    },
  ];
}
