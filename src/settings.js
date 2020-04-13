import { ROOT, setRootContext } from './context';
import { requestIdleCallback } from './helpers';

const DATASET = ROOT.dataset;
const SCHEME_OPTIONS = ['auto', 'light', 'dark'];
const CONTRAST_OPTIONS = ['auto', 'low', 'high'];

export function scheme(val) {
  const currentScheme = DATASET.nuScheme || 'auto';

  if (!SCHEME_OPTIONS.includes(currentScheme)) {
    currentScheme = 'auto';
  }

  if (val == null) {
    return currentScheme;
  }

  if (SCHEME_OPTIONS.includes(val)) {
    DATASET.nuScheme = val;
  }
};

export function contrast (val) {
  const currentContrast = DATASET.nuContrast || 'auto';

  if (!CONTRAST_OPTIONS.includes(currentContrast)) {
    currentContrast = 'auto';
  }

  if (val == null) {
    return currentContrast;
  }

  if (CONTRAST_OPTIONS.includes(val)) {
    DATASET.nuContrast = val;
  }
};

export function reduceMotion(bool) {
  if (bool == null) return DATASET.nuReduceMotion != null;

  if (bool) {
    DATASET.nuReduceMotion = '';
  } else {
    delete DATASET.nuReduceMotion;
  }
}

setRootContext('scheme', scheme());
setRootContext('contrast', contrast());
setRootContext('reduceMotion', scheme());
setRootContext('useShadow', DATASET.nuShadow != null);

if (requestIdleCallback) {
  if (!reduceMotion()) {
    reduceMotion(true);

    requestIdleCallback(() => {
      reduceMotion(false);
    });
  }
}
