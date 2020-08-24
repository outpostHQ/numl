import spaceAttr from '../../src/attributes/space';
import { checkGenerator } from '../utils';

checkGenerator('space', spaceAttr, {
  '': undefined,
  'n': undefined,
  '1x left': {
    'margin-left': 'calc((var(--nu-gap)) * -1)',
  },
  '1x left right': {
    'margin-left': 'calc((var(--nu-gap)) * -1)',
    'margin-right': 'calc((var(--nu-gap)) * -1)',
  },
  '1x top bottom right': {
    'margin-bottom': 'calc((var(--nu-gap)) * -1)',
    'margin-right': 'calc((var(--nu-gap)) * -1)',
    'margin-top': 'calc((var(--nu-gap)) * -1)',
  },
  '1x top bottom right left': {
    'margin-bottom': 'calc((var(--nu-gap)) * -1)',
    'margin-left': 'calc((var(--nu-gap)) * -1)',
    'margin-right': 'calc((var(--nu-gap)) * -1)',
    'margin-top': 'calc((var(--nu-gap)) * -1)',
  },
  'around': {
    'margin': 'auto',
  },
  'left': {
    'margin-left': 'auto',
  },
  'right': {
    'margin-right': 'auto'
  },
});
