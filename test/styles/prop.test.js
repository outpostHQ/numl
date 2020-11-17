import propAttr from '../../src/styles/prop';
import { checkGenerator } from '../utils';

checkGenerator('shadow', propAttr, {
  'name-color;var(--custom-color)': {
    '--name-color': 'var(--custom-color)',
    '--name-color-rgb': 'var(--custom-color-rgb)'
  },
  'name-color;rgba(50,100,250, 1)': {
    '--name-color': 'rgba(50,100,250, 1)',
    '--name-color-rgb': '50,100,250'
  },
});
