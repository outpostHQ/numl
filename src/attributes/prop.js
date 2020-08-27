import color from './color';

export default function propAttr(val) {
  if (val == null) return;

  const [name, value] = val.split(';');

  if (!value) return;

  const styles = { [`--nu-${name}`]: value };

  if (name.endsWith('-color')) {
    let rgbValue = value.replace(/-color([,)])/g, (s, s1) => `-color-rgb${s1}`);

    rgbValue = rgbValue.replace(/rgba\(([^)]+),[^)]+\)/, (s, s1) => s1);

    if (rgbValue !== value) {
      styles[`--nu-${name}-rgb`] = rgbValue;
    }
  }

  return styles;
}
