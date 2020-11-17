import textAttr from '../../src/styles/text';
import { checkGenerator } from '../utils';

checkGenerator('test', textAttr, {
  'sb': {
    '--font-weight': 'var(--semi-bold-font-weight)',
    'font-weight': 'var(--semi-bold-font-weight)'
  },
  'spacing': { 'letter-spacing': 'var(--border-width)' },
  'spacing(0.02em)': { 'letter-spacing': '0.02em' },
  'shadow(1px 1px 1ow #black.50)': { 'text-shadow': '1px 1px var(--outline-width) rgba(var(--black-color-rgb), 0.5)' },
  'n nowrap': {
    '--font-weight': 'var(--normal-font-weight)',
    'font-family': 'var(--font)',
    'font-style': 'initial',
    'font-weight': 'var(--normal-font-weight)',
    'letter-spacing': 'normal',
    'text-decoration': 'none',
    'text-transform': 'none',
    'white-space': 'nowrap'
  },
  'u #special': {
    'text-decoration-color': 'var(--special-color)',
    'text-decoration-line': 'underline'
  },
});
