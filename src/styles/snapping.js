import { hasNegativeMod, parseAttr } from '../helpers';
import snapAttr from './snap';

const OPTIONS = ['mandatory', 'proximity'];
const DIRS = ['x', 'y'];
const SNAPPING_MODS = [...DIRS, ...OPTIONS];
const DIR_SUPPORT = CSS.supports('scroll-snap-type', 'y mandatory');

function filterOutDir(mods) {
  return mods.filter(mod => !DIRS.includes(mod));
}

export default function snappingAttr(val) {
  if (!val) val = 'y';

  let { mods, values } = parseAttr(val, 1);

  if (hasNegativeMod(mods)) {
    return;
  }

  if (!mods.includes(DIRS[0]) && !mods.includes(DIRS[1])) {
    mods.unshift(DIRS[1]);
  }

  if (!mods.includes(OPTIONS[0]) && !mods.includes(OPTIONS[1])) {
    mods.push(OPTIONS[0]);
  }

  const snappingMods = mods.filter(mod => SNAPPING_MODS.includes(mod));
  const snapMods = mods.filter(mod => !SNAPPING_MODS.includes(mod));

  const styles = [{
    'scroll-snap-type': (DIR_SUPPORT ? snappingMods : filterOutDir(snappingMods)).join(' '),
  }];

  if (snapMods.length) {
    let snapStyles = snapAttr(`${snapMods.join(' ')} ${values.join(' ')}`);

    snapStyles.$suffix ='>:not([snap])';

    styles.push(snapStyles);
  }

  return styles;
}
