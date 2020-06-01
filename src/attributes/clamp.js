import { isNoValue, parseAttr } from '../helpers';

export default function clampAttr(val) {
  if (!val || isNoValue(val)) return;

  const { values } = parseAttr(val);

  return [{
    'display': '-webkit-box !important',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': values[0] || '1',
    overflow: 'hidden !important',
    'text-overflow': 'ellipsis',
  }, {
    $suffix: ':not([width])',
    'max-width': '100%',
  }];
}
