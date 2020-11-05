import insetAttr from '../../src/styles/inset';
import { checkGenerator } from '../utils';

checkGenerator('inset', insetAttr, {
  '': { '--nu-local-inset-shadow': '0 0 .75em 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), 1) inset' },
  'y': { '--nu-local-inset-shadow': '0 0 .75em 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), 1) inset' },
  'n': { '--nu-local-inset-shadow': '0 0 0rem 0 rgba(var(--nu-shadow-color-rgb), 0) inset' },
  '1x': { '--nu-local-inset-shadow': '0 0 var(--nu-gap) 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), 1) inset' },
  '2x #special-shadow': { '--nu-local-inset-shadow': '0 0 calc(2 * var(--nu-gap)) 0 var(--nu-special-shadow-color, var(--special-shadow-color)) inset' },
  '#custom.70': { '--nu-local-inset-shadow': '0 0 .75em 0 rgba(var(--nu-custom-color-rgb), 0.7) inset' },
  '1x 2x': { '--nu-local-inset-shadow': 'var(--nu-gap) calc(2 * var(--nu-gap)) .75em 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), 1) inset' },
  '1x 2x 3x': { '--nu-local-inset-shadow': 'var(--nu-gap) calc(2 * var(--nu-gap)) calc(3 * var(--nu-gap)) 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), 1) inset' },
  '1x 2x 3x 4x': { '--nu-local-inset-shadow': 'var(--nu-gap) calc(2 * var(--nu-gap)) calc(3 * var(--nu-gap)) calc(4 * var(--nu-gap)) rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), 1) inset' },
});
