import textAttr from '../../src/attributes/text';
import { checkGenerator } from '../utils';

checkGenerator('test', textAttr, {
  'sb': {
    '--nu-font-weight': 'var(--nu-semi-bold-font-weight)',
    'font-weight': 'var(--nu-semi-bold-font-weight)'
  },
  'spacing': { 'letter-spacing': 'var(--nu-border-width)' },
  'spacing(0.02em)': { 'letter-spacing': '0.02em' },
  'n nowrap': { 'white-space': 'nowrap' },
});
