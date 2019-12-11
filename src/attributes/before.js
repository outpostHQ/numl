export default function beforeAttr(val) {
  return {
    $suffix: '::before',
    content: `"${val.replace(/"/g, '\\"')}"`,
  };
}
