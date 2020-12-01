let router = () => true;

export function setRouter(_router) {
  router = _router;
}

export function setInternalRouter(_router) {
  router = (url, openNewTab) => {
    if (
      openNewTab ||
      url.startsWith('https://') ||
      url.includes('//') ||
      url.startsWith('mailto:')
    ) {
      return true;
    }

    _router(url, openNewTab); // handle routing by Vue Router

    return false;
  };
}

const Routing = {
  route(...args) {
    return router(...args)
  },
  setRouter,
  setInternalRouter,
};

export default Routing;
