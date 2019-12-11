export default function afterAttr(val) {
  return {
    $suffix: '::after',
    content: `"${val.replace(/"/g, '\\"')}"`,
  };
}
