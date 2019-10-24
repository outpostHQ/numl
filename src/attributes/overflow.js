const MAP = {
  'auto': {
    overflow: 'auto',
  },
  'no': {
    overflow: 'hidden',
  },
  'yes': {
    overflow: 'visible',
  },
  'scroll': {
    overflow: 'scroll',
  },
  'scroll-x': {
    'overflow-x': 'scroll',
  },
  'scroll-y': {
    'overflow-y': 'scroll',
  },
};

export default function overflowAttr(val) {
  val = val.trim();

  if (!val || !MAP[val]) return;

  return MAP[val];
}
