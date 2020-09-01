import { hasNegativeMod, parseAttr } from '../helpers';

export default function snapAttr(val) {
  const { values, mods } = parseAttr(val);

  if (hasNegativeMod(mods)) {
    return {};
  }

  const styles = {
    'scroll-snap-align': mods.join(' '),
  };

  if (values.length) {
    styles['scroll-padding'] = values.join(' ');
  }

  return styles;
}
