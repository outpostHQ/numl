const MAP = {
  'no': {
    overflow: 'hidden',
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
