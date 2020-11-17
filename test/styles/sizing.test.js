import { dimensionUnit } from '../../src/helpers';
import { checkGenerator } from '../utils';

const widthAttr = dimensionUnit('width');
const heightAttr = dimensionUnit('height');

checkGenerator('height', heightAttr, {
  '': {
    'height': 'auto',
    'max-height': 'initial',
    'min-height': 'auto'
  },
  '10x': {
    'height': 'calc(10 * var(--gap))',
    'max-height': 'initial',
    'min-height': 'auto'
  },
  'min 10x': {
    'height': 'auto',
    'max-height': 'initial',
    'min-height': 'calc(10 * var(--gap))'
  },
  'max 10x': {
    'height': 'auto',
    'max-height': 'calc(10 * var(--gap))',
    'min-height': 'auto'
  },
  '5x 10x': {
    'height': 'auto',
    'max-height': 'calc(10 * var(--gap))',
    'min-height': 'calc(5 * var(--gap))'
  },
  '5x 100% 50x': {
    'height': '100%',
    'max-height': 'calc(50 * var(--gap))',
    'min-height': 'calc(5 * var(--gap))'
  },
  'stretch': {
    'height': '-webkit-fill-available',
    'max-height': 'initial',
    'min-height': 'auto'
  },
  'min stretch': {
    'height': 'auto',
    'max-height': 'initial',
    'min-height': '-webkit-fill-available'
  },
  'max stretch': {
    'height': 'auto',
    'max-height': '-webkit-fill-available',
    'min-height': 'auto'
  },
  'max max(100vw, 10x)': {
    'height': 'auto',
    'max-height': 'max(100vw, calc(10 * var(--gap)))',
    'min-height': 'auto'
  },
});

checkGenerator('width', widthAttr, {
  '': {
    'width': 'auto',
    'max-width': 'initial',
    'min-width': 'auto'
  },
  '10x': {
    'width': 'calc(10 * var(--gap))',
    'max-width': 'initial',
    'min-width': 'auto'
  },
  'min 10x': {
    'width': 'auto',
    'max-width': 'initial',
    'min-width': 'calc(10 * var(--gap))'
  },
  'max 10x': {
    'width': 'auto',
    'max-width': 'calc(10 * var(--gap))',
    'min-width': 'auto'
  },
  '5x 10x': {
    'width': 'auto',
    'max-width': 'calc(10 * var(--gap))',
    'min-width': 'calc(5 * var(--gap))'
  },
  '5x 100% 50x': {
    'width': '100%',
    'max-width': 'calc(50 * var(--gap))',
    'min-width': 'calc(5 * var(--gap))'
  },
  'stretch': {
    'width': '-webkit-fill-available',
    'max-width': 'initial',
    'min-width': 'auto'
  },
  'min stretch': {
    'width': 'auto',
    'max-width': 'initial',
    'min-width': '-webkit-fill-available'
  },
  'max stretch': {
    'width': 'auto',
    'max-width': '-webkit-fill-available',
    'min-width': 'auto'
  },
});
