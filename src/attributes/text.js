import { devMode, extractMods, warn } from '../helpers';

const MAP = {};

function set(name, styles) {
  MAP[name] = styles;
}

['i', 'italic'].forEach(name => set(name, { 'font-style': 'italic' }));
['u', 'underline'].forEach(name => set(name, { 'text-decoration': 'underline' }));
['s', 'strikethrough'].forEach(name => set(name, { 'text-decoration': 'line-through' }));
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(index => set(`w${index}`, { 'font-weight': `${index}00` }));
['uppercase', 'lowercase', 'capitalize'].forEach(name => set(name, { 'text-transform': name }));

['baseline', 'sub', 'super', 'text-top', 'text-bottom', 'middle', 'top', 'bottom'].forEach(name => set(name, { 'vertical-align': name }));

set('v-middle', { 'vertical-align': 'var(--nu-inline-offset)' });

['left', 'right', 'center', 'justify'].forEach(name => set(name, { 'text-align': name }));

set('monospace', { 'font-family': 'monospace', 'word-spacing': 'normal' });
set('spacing', { 'letter-spacing': 'var(--nu-border-width)' });
set('ellipsis', {
  'max-width': '100%',
  'overflow': 'hidden',
  'white-space': 'nowrap',
  'text-overflow': 'ellipsis',
});
set('tabular-nums', {
  'font-variant-numeric': 'tabular-nums',
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
