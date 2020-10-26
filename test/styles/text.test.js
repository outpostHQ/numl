import textAttr from '../../src/styles/text';
import { checkGenerator } from '../utils';

checkGenerator('test', textAttr, {
  'sb': {
    '--nu-font-weight': 'var(--nu-semi-bold-font-weight)',
    'font-weight': 'var(--nu-semi-bold-font-weight)'
  },
  'spacing': { 'letter-spacing': 'var(--nu-border-width)' },
  'spacing(0.02em)': { 'letter-spacing': '0.02em' },
  'shadow(1px 1px 1ow #black.50)': { 'text-shadow': '1px 1px var(--nu-outline-width) rgba(var(--nu-black-color-rgb), 0.5)' },
  'n nowrap': {
    '--nu-font-weight': 'var(--nu-normal-font-weight)',
    'font-family': 'var(--nu-font)',
    'font-style': 'initial',
    'font-weight': 'var(--nu-normal-font-weight)',
    'letter-spacing': 'normal',
    'text-decoration': 'none',
    'text-transform': 'none',
    'white-space': 'nowrap'
  },
  'u #special': {
    'text-decoration-color': 'var(--nu-special-color, var(--special-color))',
    'text-decoration-line': 'underline'
  },
});
