import { isYesValue, unit } from '../helpers';

const radiusUnit = unit('border-radius', {
  empty: '--radius',
  property: '--local-radius',
  convert: true,
});

export default function radiusAttr(val) {
  if (!val || isYesValue(val)) {
    val = '';
  }

  if (val === 'round') {
    val = '9999rem';
  } else if (val === 'ellipse') {
    val = '50%';
  }

  return radiusUnit(val);
}
