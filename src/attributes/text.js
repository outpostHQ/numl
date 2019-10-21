import { devMode, extractMods, warn } from '../helpers';

const MAP = {};

function set(name, styles) {
  MAP[name] = styles;
}

export const SIZES = {
  xxs: [.666, 1],
  xs: [.75, 1],
  sm: [.875, 1.5],
  md: [1, 1.5],
  lg: [1.25, 2],
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
  set(size, {
    'font-size': `${SIZES[size][0]}rem`,
    'line-height': `${SIZES[size][1]}rem`,
    'font-weight': size.startsWith('h') ? String(SIZES[size][2]) : '',
  });
});

['i', 'italic'].forEach(name => set(name, { 'font-style': 'italic' }));
['u', 'underline'].forEach(name => set(name, { 'text-decoration': 'underline' }));
['s', 'strikethrough'].forEach(name => set(name, { 'text-decoration': 'line-through' }));
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(index => set(`w${index}`, { 'font-weight': `${index}00` }));
['uppercase', 'lowercase'].forEach(name => set(name, { 'text-transform': name }));

['baseline', 'sub', 'super', 'text-top', 'text-bottom', 'middle', 'top', 'bottom'].forEach(name => set(name, { 'vertical-align': name }));

['left', 'right', 'center', 'justify'].forEach(name => set(name, { 'text-align': name }));

set('monospace', { 'font-family': 'monospace' });
set('spacing', { 'letter-spacing': 'var(--nu-theme-border-width)' });
set('ellipsis', {
  'max-width': '100%',
  'overflow': 'hidden',
  'white-space': 'nowrap',
  'text-overflow': 'ellipsis',
});

set('wrap', { 'white-space': 'normal' });
set('nowrap', { 'white-space': 'nowrap' });

const LIST = Object.keys(MAP);

/**
 * Apply text modifiers.
 * @param {String} val - String that contains modifiers separated by space.
 */
export default function textAttr(val) {
  const { value, mods } = extractMods(val, LIST);

  if (devMode && value) {
    warn('[text] incorrect modifiers:', value);
  }

  const styles = {};

  mods.forEach(mod => {
    const modifiers = MAP[mod];
    const keys = Object.keys(modifiers);

    keys.forEach(key => {
      styles[key] = modifiers[key];
    });
  });

  return styles;
}
