export default function translateAttr(val) {
  if (!val) return;

  return {
    '--nu-transform-translate': val.replace(/\s+/g, ', '),
  };
}
