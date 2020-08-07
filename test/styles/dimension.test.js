import { sizeUnit } from '../../src/helpers';
import { checkGenerator } from '../utils';

// const widthAttr = sizeUnit('width');
const heightAttr = sizeUnit('height');

checkGenerator('height', heightAttr, {
  '': {
    'height': 'auto',
    'max-height': 'initial',
    'min-height': 'auto'
  },
  '10x': {
    'height': 'calc(10 * var(--nu-gap))',
    'max-height': 'initial',
    'min-height': 'auto'
  },
  'min 10x': {
    'height': 'auto',
    'max-height': 'initial',
    'min-height': 'calc(10 * var(--nu-gap))'
  },
  'max 10x': {
    'height': 'auto',
    'max-height': 'calc(10 * var(--nu-gap))',
    'min-height': 'auto'
  },
  '5x 10x': {
    'height': 'auto',
    'max-height': 'calc(10 * var(--nu-gap))',
    'min-height': 'calc(5 * var(--nu-gap))'
  },
  '5x 100% 50x': {
    'height': '100%',
    'max-height': 'calc(50 * var(--nu-gap))',
    'min-height': 'calc(5 * var(--nu-gap))'
  },
  '100vh': {
    'height': '-webkit-fill-available',
    'max-height': 'initial',
    'min-height': 'auto'
  },
  'min 100vh': {
    'height': 'auto',
    'max-height': 'initial',
    'min-height': '-webkit-fill-available'
  },
  'max 100vh': {
    'height': 'auto',
    'max-height': '-webkit-fill-available',
    'min-height': 'auto'
  },
});

checkGenerator('height', heightAttr, {
  '': {
    'height': 'auto',
    'max-height': 'initial',
    'min-height': 'auto'
  },
  '10x': {
    'height': 'calc(10 * var(--nu-gap))',
    'max-height': 'initial',
    'min-height': 'auto'
  },
  'min 10x': {
    'height': 'auto',
    'max-height': 'initial',
    'min-height': 'calc(10 * var(--nu-gap))'
  },
  'max 10x': {
    'height': 'auto',
    'max-height': 'calc(10 * var(--nu-gap))',
    'min-height': 'auto'
  },
  '5x 10x': {
    'height': 'auto',
    'max-height': 'calc(10 * var(--nu-gap))',
    'min-height': 'calc(5 * var(--nu-gap))'
  },
  '5x 100% 50x': {
    'height': '100%',
    'max-height': 'calc(50 * var(--nu-gap))',
    'min-height': 'calc(5 * var(--nu-gap))'
  },
  '100vh': {
    'height': '-webkit-fill-available',
    'max-height': 'initial',
    'min-height': 'auto'
  },
  'min 100vh': {
    'height': 'auto',
    'max-height': 'initial',
    'min-height': '-webkit-fill-available'
  },
  'max 100vh': {
    'height': 'auto',
    'max-height': '-webkit-fill-available',
    'min-height': 'auto'
  },
});
