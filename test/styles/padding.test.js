import paddingAttr from '../../src/styles/padding';
import { checkGenerator } from '../utils';

checkGenerator('padding', paddingAttr, {
  '1x': { padding: 'var(--gap)' },
  '1x 2x 3x': { padding: 'var(--gap) calc(2 * var(--gap)) calc(3 * var(--gap))' },
  '1x top': { 'padding-top': 'var(--gap)' },
  '1x top left': { 'padding-top': 'var(--gap)', 'padding-left': 'var(--gap)' },
  '@vp @hp': { 'padding': 'var(--vp) var(--hp)' }
});
