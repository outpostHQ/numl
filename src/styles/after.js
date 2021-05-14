export default function afterAttr(val) {
  if (val.startsWith('--')) {
    val = `var(${val})`;
  } else if (!val.startsWith('attr(')) {
    val = `"${val.replace(/"/g, '\"')}"`; // lgtm [js/identity-replacement]
  }

  return {
    $suffix: '::after',
    content: val,
  };
}
