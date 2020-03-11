import { filterMods, parseAttr } from '../helpers';

const HORIZONTAL_MODS = ['left', 'right'];
const VERTICAL_MODS = ['top', 'bottom'];
const ALLOWED_MODS = HORIZONTAL_MODS.concat(VERTICAL_MODS);

export default function fadeAttr(val) {
  if (!val) return;

  const { values, mods: allMods } = parseAttr(val, 1);

  // if (!values.length) return;

  const size = values[0] || 'calc(var(--nu-gap) * 2)';

  const mods = filterMods(allMods, ALLOWED_MODS);

  const direction = mods[0] || 'bottom';
  const styles = {
    $suffix: '::after',
    display: 'block',
    content: "''",
    position: 'absolute',
    'pointer-events': 'none',
    'background-image': `linear-gradient(to ${direction}, rgba(var(--nu-local-bg-color-rgb), 1), rgba(var(--nu-local-bg-color-rgb), 0))`,
  };

  if (HORIZONTAL_MODS.includes(direction)) {
    styles.top = '0';
    styles.bottom = '0';
    styles.width = size;

    if (direction === 'right') {
      styles.left = '100%';
    } else {
      styles.right = '100%';
    }
  } else {
    styles.left = '0';
    styles.right = '0';
    styles.height = size;

    if (direction === 'bottom') {
      styles.top = '100%';
    } else {
      styles.bottom = '100%';
    }
  }

  return [styles];
}
