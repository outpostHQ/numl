import { devMode, extractMods, warn } from '../helpers';

const MAP = {};

function set(name, styles) {
  MAP[name] = styles;
}

['i', 'italic'].forEach(name => set(name, { 'font-style': 'italic' }));
['ni', 'non-italic'].forEach(name => set(name, { 'font-style': 'normal' }));
['u', 'underline'].forEach(name => set(name, { 'text-decoration-line': 'underline' }));
set('overline', { 'text-decoration-line': 'overline' });
set('underover', { 'text-decoration-line': 'underline overline' });
['del', 'line-through'].forEach(name => set(name, { 'text-decoration-line': 'line-through' }));
['dotted', 'wavy', 'dashed']
  .forEach(name => set(name, { 'text-decoration-style': name }));
['nd', 'no-decoration'].forEach(name => set(name, { 'text-decoration': 'none' }));
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(index => set(`w${index}`, { '--nu-font-weight': `${index}00` }));
['up', 'uppercase'].forEach(name => set(name, { 'text-transform': 'uppercase' }));
['low', 'lowercase'].forEach(name => set(name, { 'text-transform': 'lowercase' }));
['cap', 'capitalize'].forEach(name => set(name, { 'text-transform': 'capitalize' }));

['baseline', 'sub', 'sup', 'middle', 'top', 'bottom', 'text-top', 'text-bottom'].forEach(name => set(name, { 'vertical-align': name === 'sup' ? 'super' : name }));

set('v-middle', { 'vertical-align': 'var(--nu-inline-offset)' });

['left', 'right', 'center', 'justify'].forEach(name => set(name, { 'text-align': name }));

set('monospace', { 'font-family': 'var(--nu-monospace-font)', 'word-spacing': 'normal' });
set('spacing', { 'letter-spacing': 'calc(1em / 16)' });
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
set('pre', { 'white-space': 'pre' });
set('pre-wrap', { 'white-space': 'pre-wrap' });
set('pre-line', { 'white-space': 'pre-line' });
set('break-spaces', { 'white-space': 'break-spaces' });

['inherit'].forEach(name => set(name, {
  'font-family': 'inherit',
  'font-weight': 'inherit',
  'font-style': 'inherit',
  'white-space': 'inherit',
  'text-decoration': 'inherit',
  'letter-spacing': 'inherit',
  'text-transform': 'inherit',
}));
['normal', 'n'].forEach(name => set(name, {
  'font-family': 'var(--nu-font)',
  'font-weight': 'var(--nu-normal-font-weight)',
  'font-style': 'initial',
  'white-space': 'normal',
  'text-decoration': 'none',
  'letter-spacing': 'normal',
  'text-transform': 'none',
}));
['bold', 'b'].forEach(name => set(name, { 'font-weight': 'var(--nu-bold-font-weight)' }));
['semi-bold', 'sb'].forEach(name => set(name, { 'font-weight': 'var(--nu-semi-bold-font-weight)' }));
['light', 'l'].forEach(name => set(name, { 'font-weight': 'var(--nu-light-font-weight)' }));
['heading', 'h'].forEach(name => set(name, { 'font-weight': 'var(--nu-heading-font-weight)' }));
set('bolder', { 'font-weight': 'calc(var(--nu-font-weight) + var(--nu-font-weight-step))' });
set('lighter', { 'font-weight': 'calc(var(--nu-font-weight) - var(--nu-font-weight-step))' });

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

  if (!styles['font-weight'] && styles['--nu-font-weight']) {
    styles['font-weight'] = 'var(--nu-font-weight, inherit)';
  }

  if (styles['text-decoration-style'] && !styles['text-decoration-line']) {
    styles['text-decoration-line'] = 'underline';
  }

  if (!styles['--nu-font-weight'] && styles['font-weight'] && !styles['font-weight'].includes('--nu-font-weight')) {
    styles['--nu-font-weight'] = styles['font-weight'];
  }

  return styles;
}
