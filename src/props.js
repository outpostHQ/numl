import { registerProp } from './behaviors/widget';
import { NuEl } from './elements';
const GENERATORS = NuEl.prototype.nuGenerators;

export default {
  define(name, cb) {
    registerProp(name, cb);

    if (!GENERATORS[name]) {
      GENERATORS[name] = '';
    }
  },
};
