export default function beforeAttr(val) {
  if (val.startsWith('--')) {
    val = `var(${val})`;
  } else if (!val.startsWith('attr(')) {
    val = `"${val.replace(/"/g, '\\"')}"`;
  }

  return {
    $suffix: '::before',
    content: val,
  };
}
