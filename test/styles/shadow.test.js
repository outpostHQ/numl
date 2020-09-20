import shadowAttr from '../../src/styles/shadow';
import { checkGenerator } from '../utils';

checkGenerator('shadow', shadowAttr, {
  '': { '--nu-local-depth-shadow': '0 calc(1rem / 3) 1rem 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), .33)' },
  'y': { '--nu-local-depth-shadow': '0 calc(1rem / 3) 1rem 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), .33)' },
  'n': { '--nu-local-depth-shadow': '0 calc(0rem / 3) 0rem 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), .33)' },
  '1x': { '--nu-local-depth-shadow': '0 calc(var(--nu-gap) / 3) var(--nu-gap) 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), .33)' },
  '2x #special-shadow': { '--nu-local-depth-shadow': '0 calc(calc(2 * var(--nu-gap)) / 3) calc(2 * var(--nu-gap)) 0 var(--nu-special-shadow-color, var(--special-shadow-color))' },
  '#custom.70': { '--nu-local-depth-shadow': '0 calc(1rem / 3) 1rem 0 rgba(var(--nu-custom-color-rgb), 0.7)' },
  '1x 2x': { '--nu-local-depth-shadow': 'var(--nu-gap) calc(2 * var(--nu-gap)) 1rem 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), .33)' },
  '1x 2x 3x': { '--nu-local-depth-shadow': 'var(--nu-gap) calc(2 * var(--nu-gap)) calc(3 * var(--nu-gap)) 0 rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), .33)' },
  '1x 2x 3x 4x': { '--nu-local-depth-shadow': 'var(--nu-gap) calc(2 * var(--nu-gap)) calc(3 * var(--nu-gap)) calc(4 * var(--nu-gap)) rgba(var(--nu-local-shadow-color-rgb, var(--nu-shadow-color-rgb)), .33)' },
  'named': { '--nu-local-depth-shadow': 'var(--nu-named-shadow, var(--named-shadow)) ' },
  'named #custom': { '--nu-local-depth-shadow': 'var(--nu-named-shadow, var(--named-shadow)) var(--nu-custom-color, var(--custom-color))' },
});
