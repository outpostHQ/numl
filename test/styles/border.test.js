import borderAttr from '../../src/attributes/border';
import { checkGenerator } from '../utils';

checkGenerator('border', borderAttr, {
  '': {
    '--nu-local-stroke-shadow': '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)',
    'border': 'var(--nu-border-width) solid var(--nu-local-border-color, var(--nu-border-color))'
  },
  '1x': {
    '--nu-local-stroke-shadow': '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)',
    'border': 'var(--nu-gap) solid var(--nu-local-border-color, var(--nu-border-color))'
  },
  'top': {
    '--nu-local-stroke-shadow': '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)',
    'border-top': 'var(--nu-border-width) solid var(--nu-local-border-color, var(--nu-border-color))'
  },
  'top right bottom left': {
    '--nu-local-stroke-shadow': '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)',
    'border-top': 'var(--nu-border-width) solid var(--nu-local-border-color, var(--nu-border-color))',
    'border-bottom': 'var(--nu-border-width) solid var(--nu-local-border-color, var(--nu-border-color))',
    'border-left': 'var(--nu-border-width) solid var(--nu-local-border-color, var(--nu-border-color))',
    'border-right': 'var(--nu-border-width) solid var(--nu-local-border-color, var(--nu-border-color))'
  },
  'outside': {
    '--nu-local-stroke-shadow': '0 0 0 var(--nu-border-width) var(--nu-local-border-color, var(--nu-border-color)),\n            inset 0 0 0 0 var(--nu-local-border-color, var(--nu-border-color))'
  },
  'inside': {
    '--nu-local-stroke-shadow': '0 0 0 0 var(--nu-local-border-color, var(--nu-border-color)),\n            inset 0 0 0 var(--nu-border-width) var(--nu-local-border-color, var(--nu-border-color))'
  },
  'center': {
    '--nu-local-stroke-shadow': '0 0 0 calc((var(--nu-border-width)) / 2) var(--nu-local-border-color, var(--nu-border-color)),\n            inset 0 0 0 calc((var(--nu-border-width)) / 2) var(--nu-local-border-color, var(--nu-border-color))'
  },
  'outside top left bottom left': {
    '--nu-local-stroke-shadow': '0 calc(var(--nu-border-width) * -1) 0 0 var(--nu-local-border-color, var(--nu-border-color)),\n                  inset 0 0 0 0 var(--nu-local-border-color, var(--nu-border-color)),0 calc(var(--nu-border-width) * 1) 0 0 var(--nu-local-border-color, var(--nu-border-color)),\n                  inset 0 0 0 0 var(--nu-local-border-color, var(--nu-border-color)),calc(var(--nu-border-width) * -1) 0 0 0 var(--nu-local-border-color, var(--nu-border-color)),\n                  inset 0 0 0 0 var(--nu-local-border-color, var(--nu-border-color))'
  },
});
