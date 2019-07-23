export function convertUnit(unit) {
  if (!unit) return unit;

  if (unit.includes('(')) return unit;

  return unit
    .replace(/\d+\/\d+/g, (val) => {
	    const tmp = val.split('/');
      return (Number(tmp[0]) / Number(tmp[1]) * 100).toFixed(4) + '%';
    })
    .replace(/([\d.]+)([^a-z\d%.]|$)/gi, (s, s2, s3) => `${s2}rem${s3}`);
}

export function unit(name) {
  return (val) => val ? {
    [name]: convertUnit(val),
  } : null;
}

function sizeUnit(name) {
  return (val) => {
    if (val) {
      if (val.startsWith('clamp(')) {
        const values = val.slice(6, -1).split(',');

        return {
          [name]: convertUnit(values[1]),
          [`min-${name}`]: convertUnit(values[0]),
          [`max-${name}`]: convertUnit(values[2])
        };
      } else if (val.startsWith('minmax(')) {
        const values = val.slice(7, -1).split(',');

        return {
          [`min-${name}`]: convertUnit(values[0]),
          [`max-${name}`]: convertUnit(values[1])
        };
      }

      return {
        [name]: convertUnit(val),
      };
    }

    return val;
  };
}

export const PLACE_ATTRS = {
  'content': 'place-content',
  'items': 'place-items',
};

export const PLACE_SELF_ATTRS = {
  'place': 'place-self',
};

export const FLEX_ATTRS = {
  ...PLACE_ATTRS,
  flow: 'flex-direction',
  order: 'order',
  gap: '',
  basis: '',
};

export const FLEX_ITEM_ATTRS = {
  ...PLACE_SELF_ATTRS,
  grow: 'flex-grow',
  shrink: 'flex-shrink',
  basis: unit('flex-basis'),
};

export const GRID_ITEM_ATTRS = {
  ...PLACE_SELF_ATTRS,
  col: 'grid-column',
  row: 'grid-row',
  area: 'grid-area',
};

export const GRID_ATTRS = {
  ...PLACE_ATTRS,
  areas: 'grid-template-areas',
  flow: 'grid-auto-flow',
  cols: unit('grid-template-columns'),
  rows: unit('grid-template-rows'),
  gap: unit('grid-gap'),
};

export const BLOCK_ATTRS = {
  width: sizeUnit('width'),
  height: sizeUnit('height'),
  padding: unit('padding'),
  radius: (val) => val != null ? {
    '--nu-border-radius': val
      ? convertUnit(val).replace(/\*/g, 'var(--default-border-radius)')
      : 'var(--default-border-radius)',
  } : null,
  border(val) {
    if (val == null) return val;

    const width = val ? convertUnit(val) : 'var(--pixel)';

    return {
      '--nu-border-shadow': `0 0 0 ${width} var(--nu-border-color)`,
    };
  },
  depth(val) {
    if (val == null) return val;

    const depth = convertUnit(val || '1');
    const opacity = (val || 1) && (.075 / Math.pow(parseFloat(val), 1 / 2)) || '.075';

    return {
      '--nu-depth-shadow': `0 0 ${depth} rgba(0, 0, 0, ${opacity})`,
    };
  },
};

export function getMods(mod) {
  return mod ? mod.split(/\s+/g).map(md => `-nu-${md}`) : [];
}

export function getParent(element, selector) {
  const elements = [...document.querySelectorAll(selector)];

  while ((element = element.parentNode) && !elements.includes(element)) {
  }

  return element;
}

export const devMode = process.env.NODE_ENV === 'development';

export function log(...args) {
  if (devMode) {
    console.log('nude:', ...args);
  }
}

export function warn(...args) {
  if (devMode) {
    console.warn('nude:', ...args);
  }
}

/**
 * Get full theme name from the attribute.
 * @param {string} attr
 * @param {boolean} invert - Set true to retrieve invert theme
 * @returns {string}
 */
export function getTheme(attr, invert = false) {
  let theme = '';

  if (attr == null || attr === '') {
    theme = `${invert ? '!' : ''}current`;
  } else if (attr === '!') {
    theme = `${invert ? '' : '!'}current`;
  } else {
    theme = attr;

    if (invert) {
      if (theme.startsWith('!')) {
        theme = theme.slice(1);
      } else {
        theme = `!${theme}`;
      }
    }
  }

  return theme;
}
