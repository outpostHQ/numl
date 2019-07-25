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

export function unit(name, $children,) {
  return (val) => val ? {
    $children,
    [name]: convertUnit(val),
  } : null;
}

export function sizeUnit(name, $children) {
  return (val) => {
    if (val) {
      if (val.startsWith('clamp(')) {
        const values = val.slice(6, -1).split(',');

        return {
          $children,
          [name]: convertUnit(values[1]),
          [`min-${name}`]: convertUnit(values[0]),
          [`max-${name}`]: convertUnit(values[2])
        };
      } else if (val.startsWith('minmax(')) {
        const values = val.slice(7, -1).split(',');

        return {
          $children,
          [`min-${name}`]: convertUnit(values[0]),
          [`max-${name}`]: convertUnit(values[1])
        };
      }

      return {
        $children,
        [name]: convertUnit(val),
      };
    }

    return val;
  };
}

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
