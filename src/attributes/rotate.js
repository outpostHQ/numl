export default function rotateAttr(val) {
  if (!val) return;

  return {
    '--nu-transform-rotate': val,
  };
}
