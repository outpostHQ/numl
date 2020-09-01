import {
  DIRECTIONS,
  parseAttr,
  filterMods, isNoValue
} from '../helpers';

const DEFAULT_SPACE = 'auto';

function prepareValue(value) {
  if (value === 'auto') return value;

  if (value.startsWith('calc(')) {
    value = value.slice(5, -1);
  }

  return `calc((${value}) * -1)`;
}

export default function spaceAttr(val) {
  if (!val) return;

  if (isNoValue(val)) return;

  let { values, mods } = parseAttr(val, 1);

  if (mods.includes('remove')) {
    return {
      margin: '0 !important',
    };
  }

  let around = mods.includes('around') || !values.length;

  mods = filterMods(mods, DIRECTIONS);

  if (mods.length) {
    return mods.reduce((styles, mod) => {
      const index = DIRECTIONS.indexOf(mod);
      let value = values[index] || values[index % 2] || values[0] || (around ? 'auto' : DEFAULT_SPACE);

      styles[`margin-${mod}`] = around ? value : prepareValue(value);

      return styles;
    }, {});
  }

  if (!around) {
    values = values.map(prepareValue);
  } else if (!values.length) {
    return { margin: 'auto' };
  }

  return {
    'margin-top': values[0],
    'margin-right': values[1] || values[0],
    'margin-bottom': values[2] || values[0],
    'margin-left': values[3] || values[1] || values[0],
  };
}
