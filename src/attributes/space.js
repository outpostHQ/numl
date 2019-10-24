import { splitDimensions, convertUnit, stripCalc, extractMods, DIRECTIONS } from '../helpers';

export default function spaceAttr(val) {
  if (!val) return;

  let { value, mods } = extractMods(val, DIRECTIONS);

  value = convertUnit(value, 'var(--nu-theme-padding)');

  if (mods.length) {
    value = stripCalc(value);

    return mods.reduce((styles, mod) => {
      styles[`margin-${mod}`] = `calc(${value} * -1)`;

      return styles;
    }, {});
  }

  const spaces = splitDimensions(value).map(sp =>
    sp !== '0' ? `calc(${stripCalc(sp)} * -1)` : ''
  );

  return {
    'margin-top': spaces[0],
    'margin-right': spaces[1],
    'margin-bottom': spaces[2],
    'margin-left': spaces[3]
  };
}
