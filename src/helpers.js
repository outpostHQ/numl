export const STYLES_MAP = {
  'place': 'place-self',
  'col': 'grid-column',
  'row': 'grid-row',
  'area': 'grid-area',
  'areas': 'grid-template-areas',
  'flow': 'grid-auto-flow',
  'cols': 'grid-template-columns',
  'rows': 'grid-template-rows',
  'gap': 'grid-gap',
  'content': 'place-content',
  'items': 'place-items',
  'width': 'width',
  'height': 'height',
  'padding': 'padding',
  'grow': 'flex-grow',
  'shrink': 'flex-shrink',
  'basis': 'flex-basis',
  'order': 'order',
  'radius': 'border-radius',
 };

export const FLEX_ATTRS = [
  'order',
  'flow',
  'gap',
];

export const FLEX_ITEM_ATTRS = [
  'grow',
  'shrink',
  'basis',
  'items',
  'content',
];

export const GRID_ITEM_ATTRS = [
  'place',
  'col',
  'row',
  'area',
];

export const GRID_ATTRS = [
  'areas',
  'flow',
  'cols',
  'rows',
  'gap',
  'content',
  'items'
];

export const BLOCK_ATTRS = [
  'width',
  'height',
  'padding',
  'radius',
];

export const UNIT_ATTRS = [
  'gap',
  'padding',
  'cols',
  'rows',
  'width',
  'height',
];

export function getMods(mod) {
  return mod ? mod.split(/\s+/g).map(md => `-nu-${md}`) : [];
}

export function convertUnit(unit) {
  if (!unit) return unit;

  if (unit.includes('(')) return unit;

  return unit.replace(/([\d.]+)([^a-z\d%.]|$)/gi, (s, s2, s3) => `${s2}rem${s3}`);
}

export function injectCSS(css) {
  css = css || '';

  const style = document.createElement('style');

  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);

  return style;
}

export function changeCSS(element, css) {
  if (element.childNodes[0]) element.childNodes[0].nodeValue = css;
}

export function getParent(element, selector) {
  const elements = [...document.querySelectorAll(selector)];

  while ((element = element.parentNode) && !elements.includes(element)) {}

  return element;
}
