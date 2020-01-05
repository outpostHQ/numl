import { unit } from '../helpers';

const radiusUnit = unit('border-radius', {
  empty: '--nu-border-radius',
  property: true,
  convert: true,
});

export default function radiusAttr(val) {
  if (val === 'round') {
    val = '9999rem';
  } else if (val === 'ellipse') {
    val = '50%';
  }

  return radiusUnit(val);
}
