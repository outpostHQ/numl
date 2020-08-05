import { CUSTOM_UNITS, devMode, warn } from './helpers';

export default {
  define(unitName, converter) {
    if (devMode && ((typeof converter !== 'string' && typeof converter !== 'function') || !unitName || typeof unitName !== 'string')) {
      warn('invalid unit converter', { unitName, converter });
    }

    CUSTOM_UNITS[unitName] = converter;
  },
  has(name) {
    return !!CUSTOM_UNITS[name];
  },
  get(name) {
    return CUSTOM_UNITS[name];
  },
};
