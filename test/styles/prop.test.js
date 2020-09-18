import propAttr from '../../src/styles/prop';
import { checkGenerator } from '../utils';

checkGenerator('shadow', propAttr, {
  'name-color;var(--nu-custom-color)': {
    '--nu-name-color': 'var(--nu-custom-color)',
    '--nu-name-color-rgb': 'var(--nu-custom-color-rgb)'
  },
  'name-color;rgba(50,100,250, 1)': {
    '--nu-name-color': 'rgba(50,100,250, 1)',
    '--nu-name-color-rgb': '50,100,250'
  },
});
