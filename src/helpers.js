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
     } else if (val.startsWith('min(')) {
       return {
         $children,
         [`min-${{name}}`]: val.slice(4, -1),
       };
     } else if (val.startsWith('max(')) {
      return {
        $children,
        [`max-${{name}}`]: val.slice(4, -1),
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

export function error(...args) {
  if (devMode) {
    console.error('nude:', ...args);
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

let globalId = 0;
let nuId = 0;

export function generateId(el) {
  if (el.id) return el.id;

  globalId += 1;

  return el.id = `nu-${globalId}`;
}

export function generateNuId(el) {
  const dataset = el.dataset;

  if (dataset.nuId) return dataset.nuId;

  nuId += 1;

  return dataset.nuId = nuId;
}

const dim = document.createElement('div');
const dimStyle = dim.style;

export function mixColors(clr1, clr2) {
  dim.style.color = clr1;
  const color1 = dim.style.color.match(/\d+/g).slice(0, 3).map(Number);
  dim.style.color = clr2;
  const color2 = dim.style.color.match(/\d+/g).slice(0, 3).map(Number);

  const color = color1.map((c,i) => parseInt((c + color2[i]) / 2));

  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

export function splitDimensions(style) {
  dimStyle.padding = style;

  return [
    dimStyle.paddingTop,
    dimStyle.paddingRight,
    dimStyle.paddingBottom,
    dimStyle.paddingTop,
  ];
}
