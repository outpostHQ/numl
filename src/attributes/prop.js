export default function propAttr(val) {
  if (val == null) return;

  const [ name, value ] = val.split(';');

  return { [`--nu-${name}`]: value };
}
