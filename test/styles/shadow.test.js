import shadowAttr from '../../src/attributes/shadow';
import { checkGenerator } from '../utils';

checkGenerator('shadow', shadowAttr, {
  '1x': { '--nu-local-depth-shadow': '0 0 var(--nu-gap) 0 rgba(var(--nu-shadow-color-rgb), .5)' },
  '2x special': { '--nu-local-depth-shadow': '0 0 calc(2 * var(--nu-gap)) 0 rgba(var(--nu-special-shadow-color-rgb), .5)' },
  '#custom.70': { '--nu-local-depth-shadow': '0 0 1rem 0 rgba(var(--nu-custom-color-rgb), 0.7)' },
  '1x 2x': { '--nu-local-depth-shadow': 'var(--nu-gap) calc(2 * var(--nu-gap)) 1rem 0 rgba(var(--nu-shadow-color-rgb), .5)' },
  '1x 2x 3x': { '--nu-local-depth-shadow': 'var(--nu-gap) calc(2 * var(--nu-gap)) calc(3 * var(--nu-gap)) 0 rgba(var(--nu-shadow-color-rgb), .5)' },
  '1x 2x 3x 4x': { '--nu-local-depth-shadow': 'var(--nu-gap) calc(2 * var(--nu-gap)) calc(3 * var(--nu-gap)) calc(4 * var(--nu-gap)) rgba(var(--nu-shadow-color-rgb), .5)' },
});
