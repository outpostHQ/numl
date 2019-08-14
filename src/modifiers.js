import { injectCSS, stylesString, hasCSS } from './css';
import { error, warn, devMode } from './helpers';

const MAP = {};

function set(name, styles, context = '') {
  if (devMode && !name.match(/^[a-z\-0-9]+$/i)) {
    return error('modifier name is not valid', name);
  }

  // clean empty styles
  Object.keys(styles)
    .forEach(name => {
      if (!styles[name] || !styles[name].trim()) {
        delete styles[name];
        return;
      }

      styles[name] += ' !important';
    });

  MAP[name] = styles;

  const selector = `
    ${context} [data-nu-mod="${name}"],
    ${context} [data-nu-mod*=" ${name} "],
    ${context} [data-nu-mod^="${name} "],
    ${context} [data-nu-mod$=" ${name}"],
    ${context} [data-nu-mod-${name}],
    ${context} [nu-mod-${name}],
    ${context} .-nu-${name}
`;

  injectCSS(
    `mod:${name}:${context}`,
    selector,
    `${selector}{${stylesString(styles, true)}}`);
}

function get(name = '') {
  const names = name.trim().split(/\s+/g);

  return names.reduce((styles, modName) => {
    if (devMode) {
      if (!MAP[modName] && !document.querySelector(`nd-mod[name="${modName}"]`)) {
        warn('undefined modifier is used', `"${modName}"`);
      }
    }

    Object.assign(styles, MAP[modName] || {});

    return styles;
  }, {});
}

function extend(name, styles) {
  const modStyles = MAP[name];

  if (!modStyles) {
    error('modifier is not found', name);
    return;
  }

  Object.assign(modStyles, styles);

  set(name, modStyles);
}

const Modifiers = {
  set,
  get,
  extend,
};

export const SIZES = {
  xxs: [.666, 1],
  xs: [.75, 1],
  sm: [.875, 1.5],
  md: [1, 1.5],
  lg: [1.25, 1.5],
  xl: [1.5, 2],
  xxl: [2, 2.5],
  h1: [2, 2.5, 700],
  h2: [1.8, 2.5, 700],
  h3: [1.6, 2, 700],
  h4: [1.4, 2, 700],
  h5: [1.2, 1.5, 700],
  h6: [1, 1.5, 500],
};

Object.keys(SIZES).forEach((size) => {
  Modifiers.set(size, {
    'font-size': `${SIZES[size][0]}rem`,
    'line-height': `${SIZES[size][1]}rem`,
    'font-weight': size.startsWith('h') ? String(SIZES[size][2]) : '',
  });
});

['i', 'italic'].forEach(name => set(name, { 'font-style': 'italic' }));
['u', 'underline'].forEach(name => set(name, { 'text-decoration': 'underline' }));
['s', 'strikethrough'].forEach(name => set(name, { 'text-decoration': 'line-through' }));
[1,2,3,4,5,6,7,8,9].forEach(index => set(`w${index}`, { 'font-weight': `${index}00` }));
['uppercase', 'lowercase'].forEach(name => set(name, { 'text-transform': name }));

['left', 'right', 'center', 'justify'].forEach(name => set(name, { 'text-align': name}));

set('content-box', { 'box-sizing': 'content-box' });
set('border-box', { 'box-sizing': 'border-box' });
set('monospace', { 'font-family': 'monospace' });
set('spacing', { 'letter-spacing': 'var(--nu-pixel)' });
set('ellipsis', {
  'max-width': '100%',
  'overflow': 'hidden',
  'white-space': 'nowrap',
  'text-overflow': 'ellipsis',
});
set('wrap', { 'white-space': 'normal' });
set('nowrap', { 'white-space': 'nowrap' });
set('scroll', { 'overflow': 'auto' });
set('no-overflow', { 'overflow': 'hidden' });

set('rounded', { 'border-radius': 'var(--nu-theme-border-radius)' });
set('round', { 'border-radius': '9999rem' });
set('ellipsee', { 'border-radius': '50%' });
set('relative', { 'position': 'relative' });

set('color', { 'color': 'var(--nu-theme-color)' });
set('background', { 'background-color': 'var(--nu-theme-background-color)' });
set('special', { 'color': 'var(--nu-theme-special-color)' });
set('transparent', { 'background-color': 'transparent' });

export default Modifiers;
