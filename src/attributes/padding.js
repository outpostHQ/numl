import { unit, extractMods, DIRECTIONS } from '../helpers';

const paddingUnit = unit('padding', {
  multiplier: 'var(--nu-theme-padding)',
  empty: 'var(--nu-theme-padding)',
  convert: true,
});

export default function paddingAttr(val) {
  if (val == null) return;

  let { value, mods } = extractMods(val, DIRECTIONS);

  if (!mods.length) {
    return paddingUnit(value);
  }

  const padding = paddingUnit(value).padding;

  return mods.reduce((styles, mod) => {
    styles[`padding-${mod}`] = padding;

    return styles;
  }, {});
}
