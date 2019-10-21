const Z_MAP = {
  '': '0',
  'below': '-1',
  'above': '1',
  'front': '9999',
  'back': '-9999',
};

export default function zAttr(val) {
  if (val == null) return;

  return {
    'z-index': Z_MAP[val] || val,
  };
}
