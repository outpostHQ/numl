import { splitDimensions, convertUnit } from '../helpers';

export default function spaceAttr(val) {
  if (!val) return;

  val = convertUnit(val, 'var(--nu-theme-padding)');

  if (val.startsWith('calc(')) {
    val = val.slice(5, -1);
  }

  const spaces = splitDimensions(val).map(sp =>
    !sp.match(/^0[^\.]/) ? `calc(${sp || val} * -1)` : ''
  );

  return {
    'margin-top': spaces[0],
    'margin-right': spaces[1],
    'margin-bottom': spaces[2],
    'margin-left': spaces[3]
  };
}
