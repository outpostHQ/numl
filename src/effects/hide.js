import { getRealHeight, setTransitionTimeout } from '../helpers';
import transitionAttr from '../attributes/transition';

export const HIDE_EFFECT_ATTR = 'effect';

const TRANSITION = transitionAttr('opacity, height').transition;
const EFFECTS = {
  collapse: {
    visible(el) {
      const realHeight = getRealHeight(el);

      return {
        maxHeight: `${realHeight}px`,
        opacity: '1',
      };
    },
    hidden: {
      maxHeight: '0',
      opacity: '0',
    },
    clear: ['maxHeight', 'opacity'],
    transition: transitionAttr('opacity, height').transition,
  },
};

function clear(host, effect) {
  if (effect && effect.clear) {
    effect.clear.forEach(style => {
      host.style[style] = '';
    });
  }

  host.style.transition = '';
}

function setStyles(host, styles, transition = '') {
  Object.assign(host.style, styles);

  if (transition) {
    host.style.transition = transition;
  }
}

export function hideEffect(host, bool, effectName) {
  effectName = host.getAttribute(HIDE_EFFECT_ATTR) || effectName;
  const effect = EFFECTS[effectName];

  host.style.display = '';
  host.style.transition = '';
  host.offsetHeight;

  if (!('nuCollapseId' in host)) {
    host.nuCollapseId = 0;
  }

  host.nuCollapseId++;

  const id = host.nuCollapseId;

  let visibleStyles = {}, hiddenStyles = {}, transition;

  if (effect) {
    const visibleEffect = effect.visible;
    const hiddenEffect = effect.hidden;

    transition = effect.transition;

    if (visibleEffect) {
      if (typeof visibleEffect === 'function') {
        visibleStyles = visibleEffect(host);
      } else {
        visibleStyles = visibleEffect;
      }
    }

    if (hiddenEffect) {
      if (typeof hiddenEffect === 'function') {
        hiddenStyles = hiddenEffect(host);
      } else {
        hiddenStyles = hiddenEffect;
      }
    }
  }

  if (!bool) {
    setStyles(host, hiddenStyles);

    host.nuSetMod('hidden', true);

    host.offsetHeight;

    setStyles(host, visibleStyles, transition);

    host.nuSetMod('hidden', false);

    setTransitionTimeout(host, () => {
      if (id !== host.nuCollapseId) return;

      clear(host, effect);
    });
  } else {
    setStyles(host, visibleStyles);

    host.nuSetMod('hidden', false);

    host.offsetHeight;

    host.nuSetMod('hidden', true);

    setStyles(host, hiddenStyles, transition);

    setTransitionTimeout(host, () => {
      if (id !== host.nuCollapseId) return;

      host.style.display = 'none';

      clear(host, effect);
    });
  }
}
