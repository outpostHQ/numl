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

    return !!_router(url, openNewTab); // handle routing by Vue Router
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
