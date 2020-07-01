import { DIRECTIONS, parseAttr, filterMods } from '../helpers';

const BASE = 'var(--nu-gap)';

export default function paddingAttr(val, defaults, prefix = '') {
  if (val == null) return;

  const { values, mods: allMods } = parseAttr(val, 1);

  const mods = filterMods(allMods, DIRECTIONS);

  if (!mods.length) {
    return { [`${prefix}padding`]: values.join(' ') || BASE };
  }

  return mods.reduce((styles, mod) => {
    const index = DIRECTIONS.indexOf(mod);

    styles[`${prefix}padding-${mod}`] = values[index] || values[index % 2] || values[0] || BASE;

    return styles;
  }, {});
}
