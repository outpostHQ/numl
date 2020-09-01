import { ROOT, setRootContext } from './context';
import { devMode, isNoValue, isYesValue, requestIdleCallback } from './helpers';

const DATASET = ROOT.dataset;
const SCHEME_OPTIONS = ['auto', 'light', 'dark'];
const CONTRAST_OPTIONS = ['auto', 'low', 'high'];
const ICONS_OPTIONS = ['feather', 'eva'];
const BEHAVIORS_OPTIONS = ['auto', 'no', 'manual']

export const preventInit = DATASET.nuPrevent != null;
export const behaviorOption = BEHAVIORS_OPTIONS.includes(DATASET.nuBehaviors)
  ? DATASET.nuBehaviors
  : 'auto';

export function scheme(val) {
  let currentScheme = DATASET.nuScheme || 'auto';

  if (!SCHEME_OPTIONS.includes(currentScheme)) {
    currentScheme = 'auto';
  }

  if (val == null) {
    return currentScheme;
  }

  if (SCHEME_OPTIONS.includes(val)) {
    DATASET.nuScheme = val;
  }
}

export function contrast (val) {
  let currentContrast = DATASET.nuContrast || 'auto';

  if (!CONTRAST_OPTIONS.includes(currentContrast)) {
    currentContrast = 'auto';
  }

  if (val == null) {
    return currentContrast;
  }

  if (CONTRAST_OPTIONS.includes(val)) {
    DATASET.nuContrast = val;
  }
}

export function reduceMotion(bool) {
  if (bool == null) return DATASET.nuReduceMotion != null;

  if (bool) {
    DATASET.nuReduceMotion = '';
  } else {
    delete DATASET.nuReduceMotion;
  }
}

export const USE_SHADOW = isYesValue(DATASET.nuShadow);
export const USE_HIDDEN_STYLES = DATASET.nuStyles === 'hidden';
export const ICONS_PROVIDER = ICONS_OPTIONS.includes(DATASET.nuIcons) ? DATASET.nuIcons : 'feather';
export const SCROLLBAR = DATASET.nuScrollbar != null;

setRootContext('scheme', scheme());
setRootContext('contrast', contrast());
setRootContext('reduceMotion', scheme());
setRootContext('allowShadow', USE_SHADOW);
setRootContext('iconsProvider', ICONS_PROVIDER);

if (requestIdleCallback) {
  if (!reduceMotion()) {
    reduceMotion(true);

    requestIdleCallback(() => {
      reduceMotion(false);
    });
  }
}

if (devMode) {
  DATASET.nuDev = '';
}

/**
 * Workaround over non-consistent 100vh value on mobile devices.
 */
function setWindowHeight() {
  ROOT.style.setProperty('--nu-window-height', `${window.innerHeight / 100}px`);
}

window.addEventListener('resize', setWindowHeight, { passive: true });

setWindowHeight();
