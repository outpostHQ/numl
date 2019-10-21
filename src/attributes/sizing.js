const SIZINGS = {
  content: 'content-box',
  border: 'border-box',
};

export default function sizingAttr(val) {
  val = SIZINGS[val];

  if (!val) return null;

  return { 'box-sizing': val };
}
