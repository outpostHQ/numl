import paddingAttr from '../../src/attributes/padding';
import { checkGenerator } from '../utils';

checkGenerator('padding', paddingAttr, {
  '1x': { padding: 'var(--nu-gap)' },
  '1x 2x 3x': { padding: 'var(--nu-gap) calc(2 * var(--nu-gap)) calc(3 * var(--nu-gap))' },
  '1x top': { 'padding-top': 'var(--nu-gap)' },
  '1x top left': { 'padding-top': 'var(--nu-gap)', 'padding-left': 'var(--nu-gap)' }
});
