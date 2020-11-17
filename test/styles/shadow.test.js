import shadowAttr from '../../src/styles/shadow';
import { checkGenerator } from '../utils';

checkGenerator('shadow', shadowAttr, {
  '': { '--local-depth-shadow': '0 calc(1rem / 3) 1rem 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), .33)' },
  'y': { '--local-depth-shadow': '0 calc(1rem / 3) 1rem 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), .33)' },
  'n': { '--local-depth-shadow': '0 calc(0rem / 3) 0rem 0 rgba(var(--shadow-color-rgb), 0)' },
  '1x': { '--local-depth-shadow': '0 calc(var(--gap) / 3) var(--gap) 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), .33)' },
  '2x #special-shadow': { '--local-depth-shadow': '0 calc(calc(2 * var(--gap)) / 3) calc(2 * var(--gap)) 0 var(--special-shadow-color)' },
  '#custom.70': { '--local-depth-shadow': '0 calc(1rem / 3) 1rem 0 rgba(var(--custom-color-rgb), 0.7)' },
  '1x 2x': { '--local-depth-shadow': 'var(--gap) calc(2 * var(--gap)) 1rem 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), .33)' },
  '1x 2x 3x': { '--local-depth-shadow': 'var(--gap) calc(2 * var(--gap)) calc(3 * var(--gap)) 0 rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), .33)' },
  '1x 2x 3x 4x': { '--local-depth-shadow': 'var(--gap) calc(2 * var(--gap)) calc(3 * var(--gap)) calc(4 * var(--gap)) rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), .33)' },
  'named': { '--local-depth-shadow': 'var(--named-shadow) ' },
  'named #custom': { '--local-depth-shadow': 'var(--named-shadow) var(--custom-color)' },
});
