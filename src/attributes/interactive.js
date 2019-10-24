export default function interactiveAttr(val) {
  if (val == null) return;

  return {
    'pointer-events': val === 'no' || val === 'n' ? val : 'auto',
  };
}
