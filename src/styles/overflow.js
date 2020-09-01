import scrollbarAttr from './scrollbar';
import { devMode, parseAttr, warn } from '../helpers';

const HIDDEN = 'hidden';
const VISIBLE = 'visible';

const MAP = {
  'auto': 'auto',
  'n': HIDDEN,
  'y': VISIBLE,
  'no': HIDDEN,
  'yes': VISIBLE,
  'scroll': 'scroll',
};

const noScrollList = ['n', 'y', 'no', 'yes', 'hidden'];

export default function overflowAttr(val) {
  let { all } = parseAttr(val, 2);

  all = all.map(mod => MAP[mod] || mod);

  const value = all.join(' ');

  if (devMode && !CSS.supports('overflow', value)) {
    warn('overflow value is not valid', JSON.stringify(value));
  }

  const styles = [{
    overflow: value,
  }];

  if (all.find(v => !noScrollList.includes(v))) {
    styles.push(...scrollbarAttr(val));
  }

  return styles;
}
