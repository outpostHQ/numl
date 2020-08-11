export function h(tag) {
  return document.createElement(tag);
}

const dim = h('div');
const dimStyle = dim.style;

export function extractColor(color, ignoreAlpha = false) {
  if (typeof color !== 'string') return null;

  dimStyle.color = '';
  dimStyle.color = color;

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

export function strToRgb(color, ignoreAlpha = false) {
  if (!color) return undefined;

  if (color.startsWith('rgb')) return color;

  const rgba = extractColor(color, ignoreAlpha);

  return rgba ? `${rgba.length > 3 ? 'rgba' : 'rgb'}(${rgba.join(',')})` : undefined;
}

export function requireChild(host, tag) {
  if (!host.querySelector(tag)) {
    host.appendChild(h(tag));
  }
}

export function fixture(html) {
  const template = document.createElement('template');

  html = html.trim();

  template.innerHTML = html;

  return template.content.firstChild;
}
