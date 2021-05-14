export default function afterAttr(val) {
  if (val.startsWith('--')) {
    val = `var(${val})`;
  } else if (!val.startsWith('attr(')) {
    val = `"${val.replace(/"/g, '\"')}"`;
  }

  return {
    $suffix: '::after',
    content: val,
  };
}
