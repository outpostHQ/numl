import { parseColor } from '../helpers';

const BASE_COLOR = 'var(--nu-text-color)';

export default function colorAttr(val) {
  return { color: val ? parseColor(val).color : BASE_COLOR };
}
