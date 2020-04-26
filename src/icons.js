import { error } from './helpers';

let loader = (name) => {
  return import('feather-icons')
    .then(feather => feather.icons[name].toSvg())
    .catch(() => {
      error('icon not found:', name);

      return '';
    });
}

const Icons = {
  load(name) {
    return loader(name);
  },
  setLoader(_loader) {
    loader = _loader;
  }
}

export default Icons;
