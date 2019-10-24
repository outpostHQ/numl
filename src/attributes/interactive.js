export default function eventsAttr(val) {
  if (val == null) return;

  return {
    'pointer-events': val === 'none' ? val : 'auto',
  };
}
