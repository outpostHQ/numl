import { parseAttr } from '../helpers';

export default function scaleAttr(val) {
  if (!val) return {
    '--transform-scale': `scale(1, 1)`,
  };

  let { value } = parseAttr(val);

  switch (value) {
    case 'flip':
      value = '-1 -1';
      break;
    case 'flip-x':
      value = '-1 1';
      break;
    case 'flip-y':
      value = '1 -1';
      break;
  }

  value = value.split(/\s+/g).join(', ');

  return {
    '--transform-scale': `scale(${value})`,
  };
}
