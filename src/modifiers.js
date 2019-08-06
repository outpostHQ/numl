import { injectCSS, stylesString, hasCSS } from './css';
import { error, devMode } from './helpers';

const MAP = {};

function set(name, styles, context = '') {
  if (devMode && !name.match(/^[a-z\-0-9]+$/i)) {
    return error('modifier name is not valid', name);
  }

  MAP[name] = styles;

  const selector = `${context} [mod="${name}"],
  ${context} [mod*=" ${name} "],
  ${context} [mod^="${name} "],
  ${context} [mod$=" ${name}"],
  ${context} [data-nu-mod="${name}"],
  ${context} [data-nu-mod*=" ${name} "],
  ${context} [data-nu-mod^="${name} "],
  ${context} [data-nu-mod$=" ${name}"],
  ${context} [data-nu-mod-${name}],
  ${context} [nu-mod-${name}],
  ${context} .-nu-${name}`;

  injectCSS(
    `mod:${name}:${context}`,
    selector,
    `${selector}{${typeof styles === 'string' ? styles : stylesString(styles)}}`);
}

function get(name) {
  return MAP[name];
}

const Modifiers = {
  set,
  get,
};

export const SIZES = {
  xxs: [.666, 1],
  xs: [.75, 1],
  sm: [.875, 1.5],
  md: [1, 1.5],
  lg: [1.25, 1.5],
  xl: [1.5, 2],
  xxl: [2, 2.5],
  h1: [2, 2.5],
  h2: [1.8, 2.5],
  h3: [1.6, 2],
  h4: [1.4, 2],
  h5: [1.2, 1.5],
  h6: [1, 1.5],
};

Object.keys(SIZES).forEach((size) => {
  Modifiers.set(size, {
    'font-size': `${SIZES[size][0]}rem`,
    'line-height': `${SIZES[size][1]}rem`,
    'font-weight': size.startsWith('h') ? '700' : '',
  });
});

['i', 'italic'].forEach(name => set(name, 'font-style: italic;'));
['u', 'underline'].forEach(name => set(name, 'text-decoration: underline;'));
['s', 'strikethrough'].forEach(name => set(name, 'text-decoration: line-through;'));
[1,2,3,4,5,6,7,8,9].forEach(index => set(`w${index}`, `font-weight: ${index}00;`));
['uppercase', 'lowercase'].forEach(name => set(name, `text-transform: ${name};`));

set('content-box', 'box-sizing: content-box;');
set('border-box', 'box-sizing: border-box;');
set('monospace', 'font-family: monospace;');
set('spacing', 'letter-spacing: var(--nu-pixel);');
set('ellipsis', `
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`);
set('wrap', 'white-space: normal;');
set('nowrap', 'white-space: nowrap;');
set('scroll', 'overflow: auto;');
set('no-overflow', 'overflow: hidden;');

set('rounded', 'border-radius: var(--nu-theme-border-radius);');
set('round', 'border-radius: 9999rem;');
set('ellipsee', 'border-radius: 50%;');
set('relative', 'position: relative;');

export default Modifiers;
