let loader = (name) => {
  return import('feather-icons')
    .then(feather => feather.icons[name].toSvg());
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
