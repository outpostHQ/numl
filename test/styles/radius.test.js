import radiusAttr from '../../src/styles/radius';
import { checkGenerator } from '../utils';

checkGenerator('radius', radiusAttr, {
  '': {
    '--local-radius': 'var(--radius)',
    'border-radius': 'var(--local-radius)',
  },
  'n': undefined,
  '1r': {
    '--local-radius': 'var(--radius)',
    'border-radius': 'var(--local-radius)',
  },
  '2r': {
    '--local-radius': 'calc(2 * var(--radius))',
    'border-radius': 'var(--local-radius)',
  },
  'top': {
    '--local-radius': 'var(--radius) var(--radius) 0 0',
    'border-radius': 'var(--local-radius)',
  },
  '1r right': {
    '--local-radius': '0 var(--radius) var(--radius) 0',
    'border-radius': 'var(--local-radius)',
  },
  '2r bottom': {
    '--local-radius': '0 0 calc(2 * var(--radius)) calc(2 * var(--radius))',
    'border-radius': 'var(--local-radius)',
  },
  'left': {
    '--local-radius': 'var(--radius) 0 0 var(--radius)',
    'border-radius': 'var(--local-radius)',
  },
  'round': {
    '--local-radius': '9999rem',
    'border-radius': 'var(--local-radius)',
  },
  'round top': {
    '--local-radius': '9999rem 9999rem 0 0',
    'border-radius': 'var(--local-radius)',
  },
  'ellipse': {
    '--local-radius': '50%',
    'border-radius': 'var(--local-radius)',
  },
  'ellipse left 2r': {
    '--local-radius': '50% 0 0 50%',
    'border-radius': 'var(--local-radius)',
  },
  'leaf': {
    '--local-radius': 'var(--leaf-sharp-radius) var(--radius) var(--leaf-sharp-radius) var(--radius)',
    'border-radius': 'var(--local-radius)',
  },
  'backleaf': {
    '--local-radius': 'var(--radius) var(--leaf-sharp-radius) var(--radius) var(--leaf-sharp-radius)',
    'border-radius': 'var(--local-radius)',
  },
  'leaf 1.5r .5r': {
    '--local-radius': 'calc(.5 * var(--radius)) calc(1.5 * var(--radius)) calc(.5 * var(--radius)) calc(1.5 * var(--radius))',
    'border-radius': 'var(--local-radius)',
  },
  'backleaf 1.5r .5r': {
    '--local-radius': 'calc(1.5 * var(--radius)) calc(.5 * var(--radius)) calc(1.5 * var(--radius)) calc(.5 * var(--radius))',
    'border-radius': 'var(--local-radius)',
  },
});
