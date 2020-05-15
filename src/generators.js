import { NuElement } from './elements';
import { log, warn } from './helpers';

const GENERATORS = NuElement.prototype.nuGenerators;

export default {
  set(name, cb) {
    GENERATORS[name] = cb;

    log('new style generator is defined');
  },
  define(name, cb) {
    if (GENERATORS[name]) {
      warn('style is already defined', name);

      return;
    }

    GENERATORS[name] = cb;

    log('new style generator is defined');
  },
};
