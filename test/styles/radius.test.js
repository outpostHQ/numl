import radiusAttr from '../../src/styles/radius';
import { checkGenerator } from '../utils';

checkGenerator('radius', radiusAttr, {
  '': [{
    '--local-radius': 'var(--radius)',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': 'var(--radius)',
  }],
  'n': undefined,
  '1r': [{
    '--local-radius': 'var(--radius)',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': 'var(--radius)',
  }],
  '2r': [{
    '--local-radius': 'calc(2 * var(--radius))',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': 'calc(2 * var(--radius))',
  }],
  'top': [{
    '--local-radius': 'var(--radius) var(--radius) 0 0',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': 'var(--radius) var(--radius) 0 0',
  }],
  '1r right': [{
    '--local-radius': '0 var(--radius) var(--radius) 0',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': '0 var(--radius) var(--radius) 0',
  }],
  '2r bottom': [{
    '--local-radius': '0 0 calc(2 * var(--radius)) calc(2 * var(--radius))',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': '0 0 calc(2 * var(--radius)) calc(2 * var(--radius))',
  }],
  'left': [{
    '--local-radius': 'var(--radius) 0 0 var(--radius)',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': 'var(--radius) 0 0 var(--radius)',
  }],
  'round': [{
    '--local-radius': '9999rem',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': '9999rem',
  }],
  'round top': [{
    '--local-radius': '9999rem 9999rem 0 0',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': '9999rem 9999rem 0 0',
  }],
  'ellipse': [{
    '--local-radius': '50%',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': '50%',
  }],
  'ellipse left 2r': [{
    '--local-radius': '50% 0 0 50%',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': '50% 0 0 50%',
  }],
  'leaf': [{
    '--local-radius': 'var(--leaf-sharp-radius) var(--radius) var(--leaf-sharp-radius) var(--radius)',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': 'var(--leaf-sharp-radius) var(--radius) var(--leaf-sharp-radius) var(--radius)',
  }],
  'backleaf': [{
    '--local-radius': 'var(--radius) var(--leaf-sharp-radius) var(--radius) var(--leaf-sharp-radius)',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': 'var(--radius) var(--leaf-sharp-radius) var(--radius) var(--leaf-sharp-radius)',
  }],
  'leaf 1.5r .5r': [{
    '--local-radius': 'calc(.5 * var(--radius)) calc(1.5 * var(--radius)) calc(.5 * var(--radius)) calc(1.5 * var(--radius))',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': 'calc(.5 * var(--radius)) calc(1.5 * var(--radius)) calc(.5 * var(--radius)) calc(1.5 * var(--radius))',
  }],
  'backleaf 1.5r .5r': [{
    '--local-radius': 'calc(1.5 * var(--radius)) calc(.5 * var(--radius)) calc(1.5 * var(--radius)) calc(.5 * var(--radius))',
    'border-radius': 'var(--local-radius)',
  }, {
    "$suffix": ">*",
    '--context-radius': 'calc(1.5 * var(--radius)) calc(.5 * var(--radius)) calc(1.5 * var(--radius)) calc(.5 * var(--radius))',
  }],
});
