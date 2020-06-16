import scrollbarAttr from './scrollbar';

const MAP = {
  'auto': {
    overflow: 'auto',
  },
  'n': {
    overflow: 'hidden',
  },
  'y': {
    overflow: 'visible',
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
    'overflow-y': 'hidden',
  },
  'scroll-y': {
    'overflow-x': 'hidden',
    'overflow-y': 'scroll',
  },
};

const noScrollList = ['n', 'y', 'no', 'yes'];

export default function overflowAttr(val) {
  if (!val || !MAP[val]) return;

  const styles = [MAP[val]];

  if (!noScrollList.includes(val)) {
    styles.push(...scrollbarAttr(val));
  }

  return styles;
}
