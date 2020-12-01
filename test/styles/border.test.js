import borderAttr from '../../src/styles/border';
import { checkGenerator } from '../utils';

checkGenerator('border', borderAttr, {
  '': {
    '--local-stroke-shadow': '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)',
    'border': 'var(--border-width) solid var(--border-color)'
  },
  '1x': {
    '--local-stroke-shadow': '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)',
    'border': 'var(--gap) solid var(--border-color)'
  },
  'top': {
    '--local-stroke-shadow': '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)',
    'border-top': 'var(--border-width) solid var(--border-color)'
  },
  'top right bottom left': {
    '--local-stroke-shadow': '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)',
    'border-top': 'var(--border-width) solid var(--border-color)',
    'border-bottom': 'var(--border-width) solid var(--border-color)',
    'border-left': 'var(--border-width) solid var(--border-color)',
    'border-right': 'var(--border-width) solid var(--border-color)'
  },
  'outside': {
    '--local-stroke-shadow': '0 0 0 var(--border-width) var(--border-color),\n            inset 0 0 0 0 var(--border-color)'
  },
  'inside': {
    '--local-stroke-shadow': '0 0 0 0 var(--border-color),\n            inset 0 0 0 var(--border-width) var(--border-color)'
  },
  'center': {
    '--local-stroke-shadow': '0 0 0 calc((var(--border-width)) / 2) var(--border-color),\n            inset 0 0 0 calc((var(--border-width)) / 2) var(--border-color)'
  },
  'outside top left bottom left': {
    '--local-stroke-shadow': '0 calc(var(--border-width) * -1) 0 0 var(--border-color),\n                  inset 0 0 0 0 var(--border-color),0 calc(var(--border-width) * 1) 0 0 var(--border-color),\n                  inset 0 0 0 0 var(--border-color),calc(var(--border-width) * -1) 0 0 0 var(--border-color),\n                  inset 0 0 0 0 var(--border-color)'
  },
});
