import { log, injectScript } from './helpers';
import css from './css';
import modifiers from './modifiers';

let featherPromise;

const Nude = {
  modifiers,
  css,
  iconLoader(name) {
    return (featherPromise || injectScript('https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.22.1/feather.js'))
      .then(() => window.feather.icons[name].toSvg());
  },
};

export default Nude;
