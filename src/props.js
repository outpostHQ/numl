import { registerProp } from './behaviors/widget';
import { NuElement } from './elements';
const GENERATORS = NuElement.prototype.nuGenerators;

export default {
  define(name, cb) {
    registerProp(name, cb);

    if (!GENERATORS[name]) {
      GENERATORS[name] = '';
    }
  },
};
