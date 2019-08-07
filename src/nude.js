import { log } from './helpers';
import css from './css';
import modifiers from './modifiers';

const Nude = {
  modifiers,
  css,
  iconLoader() {
    return Promise.resolve('');
  },
};

export default Nude;
