import { parseColor } from '../helpers';

export const BASE_COLOR = 'var(--nu-local-text-color, var(--nu-text-color))';

export default function colorAttr(val) {
  return { color: val ? parseColor(val).color : BASE_COLOR };
}
