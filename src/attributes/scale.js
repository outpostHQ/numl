export default function scaleAttr(val) {
  if (!val) return;

  return {
    '--nu-transform-scale': val.replace(/\s+/g, ', '),
  };
}
