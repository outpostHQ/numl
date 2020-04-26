let loader = (src) => {
  return fetch(src)
    .then(response => response.text());
}

const Svg = {
  /**
   * @param src
   * @return {Promise<String>}
   */
  load(src) {
    return loader(src);
  },
  setLoader(_loader) {
    loader = _loader;
  }
}

export default Svg;
