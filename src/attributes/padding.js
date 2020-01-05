import { DIRECTIONS, parseAttr, filterMods } from '../helpers';

export default function paddingAttr(val) {
  if (val == null) return;

  const { values, mods: allMods } = parseAttr(val);

  const mods = filterMods(allMods, DIRECTIONS);

  if (!mods.length) {
    return { padding: values.join(' ') || 'var(--nu-indent)' };
  }

  return mods.reduce((styles, mod) => {
    const index = DIRECTIONS.indexOf(mod);

    styles[`padding-${mod}`] = values[index] || values[index % 2] || values[0];

    return styles;
  }, {});
}
