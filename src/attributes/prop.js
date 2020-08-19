export default function propAttr(val) {
  if (val == null) return;

  const [ name, value ] = val.split(';');

  if (!value) return;

  const styles = { [`--nu-${name}`]: value };

  if (value.endsWith('-color')) {
    styles[`--nu-${name}-rgb`] = `var(${value}-rgb)`;
  } else if (value.startsWith('var(--nu-') && value.endsWith('-color)')) {
    styles[`--nu-${name}-rgb`] = `var(${value.slice(4, -1)}-rgb)`;
  } else if (value.startsWith('var(--nu-h-')) {
    styles[`--nu-${name}-rgb`] = `${value.slice(0, -1)}-rgb)`;
  } else if (value.match(/^rgb(|a)\(/)) {
    styles[`--nu-${name}-rgb`] = value.slice(5, -1).split(',').slice(0,3).join(',');
  }

  return styles;
}
