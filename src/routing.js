export function setRouting(nav) {
  Routing.route = nav;
}

const Routing = {
  route() { return true },
  set: setRouting,
};

export default Routing;
