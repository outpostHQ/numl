let router = () => true;

export function setRouter(_router) {
  router = _router;
}

const Routing = {
  route(...args) { return router(...args) },
  setRouter: setRouter,
};

export default Routing;
