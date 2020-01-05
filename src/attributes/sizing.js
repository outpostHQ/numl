const SIZINGS = {
  content: 'content-box',
  border: 'border-box',
};

export default function sizingAttr(val, defaults) {
  val = SIZINGS[val];

  if (!val) {
    if (defaults.sizing) {
      return {
        'box-sizing': defaults.sizing,
      }
    } else {
      return;
    }
  }

  return { 'box-sizing': val };
}
