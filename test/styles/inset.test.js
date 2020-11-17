import insetAttr from '../../src/styles/inset';
import { checkGenerator } from '../utils';

checkGenerator('inset', insetAttr, {
  '': { '--local-inset-shadow': '0 0 .75em 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 1) inset' },
  'y': { '--local-inset-shadow': '0 0 .75em 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 1) inset' },
  'n': { '--local-inset-shadow': '0 0 0rem 0 rgba(var(--shadow-color-rgb), 0) inset' },
  '1x': { '--local-inset-shadow': '0 0 var(--gap) 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 1) inset' },
  '2x #special-shadow': { '--local-inset-shadow': '0 0 calc(2 * var(--gap)) 0 var(--special-shadow-color) inset' },
  '#custom.70': { '--local-inset-shadow': '0 0 .75em 0 rgba(var(--custom-color-rgb), 0.7) inset' },
  '1x 2x': { '--local-inset-shadow': 'var(--gap) calc(2 * var(--gap)) .75em 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 1) inset' },
  '1x 2x 3x': { '--local-inset-shadow': 'var(--gap) calc(2 * var(--gap)) calc(3 * var(--gap)) 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 1) inset' },
  '1x 2x 3x 4x': { '--local-inset-shadow': 'var(--gap) calc(2 * var(--gap)) calc(3 * var(--gap)) calc(4 * var(--gap)) rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 1) inset' },
});
