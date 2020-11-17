import spaceAttr from '../../src/styles/space';
import { checkGenerator } from '../utils';

checkGenerator('space', spaceAttr, {
  '': undefined,
  'n': undefined,
  '1x left': {
    'margin-left': 'calc((var(--gap)) * -1)',
  },
  '1x left right': {
    'margin-left': 'calc((var(--gap)) * -1)',
    'margin-right': 'calc((var(--gap)) * -1)',
  },
  '1x top bottom right': {
    'margin-bottom': 'calc((var(--gap)) * -1)',
    'margin-right': 'calc((var(--gap)) * -1)',
    'margin-top': 'calc((var(--gap)) * -1)',
  },
  '1x top bottom right left': {
    'margin-bottom': 'calc((var(--gap)) * -1)',
    'margin-left': 'calc((var(--gap)) * -1)',
    'margin-right': 'calc((var(--gap)) * -1)',
    'margin-top': 'calc((var(--gap)) * -1)',
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
