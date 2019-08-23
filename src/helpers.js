const COLORS = {"indianred":"#CD5C5C","lightcoral":"#F08080","salmon":"#FA8072","darksalmon":"#E9967A","lightsalmon":"#FFA07A","crimson":"#DC143C","red":"#FF0000","firebrick":"#B22222","darkred":"#8B0000","pink":"#FFC0CB","lightpink":"#FFB6C1","hotpink":"#FF69B4","deeppink":"#FF1493","mediumvioletred":"#C71585","palevioletred":"#DB7093","coral":"#FF7F50","tomato":"#FF6347","orangered":"#FF4500","darkorange":"#FF8C00","orange":"#FFA500","gold":"#FFD700","yellow":"#FFFF00","lightyellow":"#FFFFE0","lemonchiffon":"#FFFACD","lightgoldenrodyellow":"#FAFAD2","papayawhip":"#FFEFD5","moccasin":"#FFE4B5","peachpuff":"#FFDAB9","palegoldenrod":"#EEE8AA","khaki":"#F0E68C","darkkhaki":"#BDB76B","lavender":"#E6E6FA","thistle":"#D8BFD8","plum":"#DDA0DD","violet":"#EE82EE","orchid":"#DA70D6","fuchsia":"#FF00FF","magenta":"#FF00FF","mediumorchid":"#BA55D3","mediumpurple":"#9370DB","blueviolet":"#8A2BE2","darkviolet":"#9400D3","darkorchid":"#9932CC","darkmagenta":"#8B008B","purple":"#800080","rebeccapurple":"#663399","indigo":"#4B0082","mediumslateblue":"#7B68EE","slateblue":"#6A5ACD","darkslateblue":"#483D8B","greenyellow":"#ADFF2F","chartreuse":"#7FFF00","lawngreen":"#7CFC00","lime":"#00FF00","limegreen":"#32CD32","palegreen":"#98FB98","lightgreen":"#90EE90","mediumspringgreen":"#00FA9A","springgreen":"#00FF7F","mediumseagreen":"#3CB371","seagreen":"#2E8B57","forestgreen":"#228B22","green":"#008000","darkgreen":"#006400","yellowgreen":"#9ACD32","olivedrab":"#6B8E23","olive":"#808000","darkolivegreen":"#556B2F","mediumaquamarine":"#66CDAA","darkseagreen":"#8FBC8F","lightseagreen":"#20B2AA","darkcyan":"#008B8B","teal":"#008080","aqua":"#00FFFF","cyan":"#00FFFF","lightcyan":"#E0FFFF","paleturquoise":"#AFEEEE","aquamarine":"#7FFFD4","turquoise":"#40E0D0","mediumturquoise":"#48D1CC","darkturquoise":"#00CED1","cadetblue":"#5F9EA0","steelblue":"#4682B4","lightsteelblue":"#B0C4DE","powderblue":"#B0E0E6","lightblue":"#ADD8E6","skyblue":"#87CEEB","lightskyblue":"#87CEFA","deepskyblue":"#00BFFF","dodgerblue":"#1E90FF","cornflowerblue":"#6495ED","royalblue":"#4169E1","blue":"#0000FF","mediumblue":"#0000CD","darkblue":"#00008B","navy":"#000080","midnightblue":"#191970","cornsilk":"#FFF8DC","blanchedalmond":"#FFEBCD","bisque":"#FFE4C4","navajowhite":"#FFDEAD","wheat":"#F5DEB3","burlywood":"#DEB887","tan":"#D2B48C","rosybrown":"#BC8F8F","sandybrown":"#F4A460","goldenrod":"#DAA520","darkgoldenrod":"#B8860B","peru":"#CD853F","chocolate":"#D2691E","saddlebrown":"#8B4513","sienna":"#A0522D","brown":"#A52A2A","maroon":"#800000","white":"#FFFFFF","snow":"#FFFAFA","honeydew":"#F0FFF0","mintcream":"#F5FFFA","azure":"#F0FFFF","aliceblue":"#F0F8FF","ghostwhite":"#F8F8FF","whitesmoke":"#F5F5F5","seashell":"#FFF5EE","beige":"#F5F5DC","oldlace":"#FDF5E6","floralwhite":"#FFFAF0","ivory":"#FFFFF0","antiquewhite":"#FAEBD7","linen":"#FAF0E6","lavenderblush":"#FFF0F5","mistyrose":"#FFE4E1","gainsboro":"#DCDCDC","lightgray":"#D3D3D3","lightgrey":"#D3D3D3","silver":"#C0C0C0","darkgray":"#A9A9A9","darkgrey":"#A9A9A9","gray":"#808080","grey":"#808080","dimgray":"#696969","dimgrey":"#696969","lightslategray":"#778899","lightslategrey":"#778899","slategray":"#708090","slategrey":"#708090","darkslategray":"#2F4F4F","darkslategrey":"#2F4F4F","black":"#000000"};

export const ROOT_CONTEXT = '[data-nu-root]';

export function injectScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = src;

    document.body.appendChild(script);
  });
}

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

export function unit(name, $suffix) {
  return (val) => val ? {
    $suffix,
    [name]: convertUnit(val),
  } : null;
}

export function sizeUnit(name, $suffix) {
  return (val) => {
    if (val) {
      if (val.startsWith('clamp(')) {
        const values = val.slice(6, -1).split(',');

        return {
          $suffix,
          [name]: convertUnit(values[1]),
          [`min-${name}`]: convertUnit(values[0]),
          [`max-${name}`]: convertUnit(values[2])
        };
      } else if (val.startsWith('minmax(')) {
        const values = val.slice(7, -1).split(',');

        return {
          $suffix,
          [`min-${name}`]: convertUnit(values[0]),
          [`max-${name}`]: convertUnit(values[1])
        };
     } else if (val.startsWith('min(')) {
       return {
        $suffix,
         [`min-${name}`]: convertUnit(val.slice(4, -1)),
       };
     } else if (val.startsWith('max(')) {
      return {
        $suffix,
        [`max-${name}`]: convertUnit(val.slice(4, -1)),
      };
    }

      return {
        $suffix,
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

  while ((element = element.parentNode) && !elements.includes(element)) {}

  return element;
}

export function invertQuery(element, selector) {
  do {
    const found = element.querySelector(selector);

    if (found) return found;
  } while (element = element.parentNode);
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

/**
 * Extract rgba channels for color.
 * @param {String} color – CSS color string.
 * @returns {Number[]} – Array with values: Red channel, Green channel, Blue channel, Alpha channel.
 */
export function extractColor(color, ignoreAlpha = false) {
  dimStyle.color = '';
  dimStyle.color = COLORS[color.toLowerCase()] || color;

  const arr = !dimStyle.color
    ? null // incorrect color
    : dimStyle.color
        .slice(dimStyle.color.indexOf('(') + 1, -1)
        .split(', ')
        .map(Number);

  if (!arr) return arr;

  if (ignoreAlpha) {
    return arr.slice(0, 3);
  }

  arr[3] = arr[3] || 1;

  return arr;
}

export function setAlphaChannel(color, alpha = 1) {
  const rgba = typeof color === 'string' ? extractColor(color) : color;

  if (!rgba) return rgba;

  return colorString(...rgba.slice(0, 3), alpha);
}

export function colorString(red, green, blue, alpha = 1) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function generalizeColor(color, ignoreAlpha = false) {
  if (!color) return color;

  const rgba = extractColor(color, ignoreAlpha);

  if (!rgba) return rgba;

  return colorString(...rgba, 1);
}

export function invertColor(color, min = 0, max = 255) {
  const rgba = extractColor(color);

  return colorString(...hueRotate(rgba.map((v, i) => {
    if (i === 3) return v;

    const inv = 255 - v;

    return Math.round(inv * (max - min) / max + min);
  })));
}

export function hueRotate(color, angle = 180) {
  const rgba = typeof color === 'string' ? extractColor(color) : color;
  const hsl = rgbToHsl(...rgba);

  hsl[0] = (hsl[0] + angle / 360) % 1;

  const rotated = hslToRgb(...hsl).concat([rgba[3]]);

  return rotated;
}

export function getLuminance(color) {
  color = extractColor(color, true).map(n => n / 255);

  const [r, g, b] = color;

  return Math.sqrt((r * r * 0.241) + (g * g * .691) + (b * b * .068));
}

export function mixColors(clr1, clr2, pow = .5) {
  const color1 = extractColor(clr1, true);
  const color2 = extractColor(clr2, true);

  const color = color1.map((c,i) => parseInt((color2[i] - c) * pow + c));

  return colorString(color[0], color[1], color[2], 1);
}

export function splitDimensions(style) {
  dimStyle.padding = style;

  return [
    dimStyle.paddingTop,
    dimStyle.paddingRight,
    dimStyle.paddingBottom,
    dimStyle.paddingLeft,
  ];
}

export function openLink(href, target) {
  const link = document.createElement('a');

  link.href = href;

  if (target) {
    link.target = target === true ? '_blank' : target;
  }

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export function bindActiveEvents() {
  this.addEventListener('click', evt => {
    if (evt.nuHandled) return;

    evt.nuHandled = true;

    if (!this.hasAttribute('disabled')) {
      this.nuTap();
    }
  });

  this.addEventListener('keydown', evt => {
    if (this.hasAttribute('disabled') || evt.nuHandled) return;

    evt.nuHandled = true;

    if (evt.key === 'Enter') {
      this.nuTap();
    } else if (evt.key === ' ') {
      evt.preventDefault();
      this.nuSetMod('active', true);
    }
  });

  this.addEventListener('keyup', evt => {
    if (this.hasAttribute('disabled') || evt.nuHandled) return;

    evt.nuHandled = true;

    if (evt.key === ' ') {
      evt.preventDefault();
      this.nuSetMod('active', false);
      this.nuTap();
    }
  });

  this.addEventListener('blur', evt => this.nuSetMod('active', false));

  this.addEventListener('mousedown', () => {
    this.nuSetMod('active', true);
  });

  ['mouseleave', 'mouseup'].forEach(eventName => {
    this.addEventListener(eventName, () => {
      this.nuSetMod('active', false);
    });
  });
}

export function toCamelCase(str) {
  return str.replace(/\-[a-z]/g, s => s.slice(1).toUpperCase());
}

export function toKebabCase(str) {
  return str.replace(/[A-Z]/g, s => `-${s.toLowerCase()}`).replace(/^\-/, '');
}

/* colors */
export function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}

export function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
}
