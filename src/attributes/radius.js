import { unit } from '../helpers';

const radiusUnit = unit('border-radius', {
  multiplier: 'var(--nu-theme-border-radius)',
  empty: 'var(--nu-theme-border-radius)',
  property: true,
  convert: true,
});

export default function radiusAttr(val) {
  val = val.trim();

  if (val === 'round') {
    val = '9999rem';
  } else if (val === 'ellipse') {
    val = '50%';
  }

  return radiusUnit(val);
}
