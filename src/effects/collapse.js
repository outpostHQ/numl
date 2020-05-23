import { getRealHeight, setTransitionTimeout, stackTrace } from '../helpers';
import transitionAttr from '../attributes/transition';

const TRANSITION = transitionAttr('opacity, height').transition;

export function collapse(host, bool) {
  host.style.display = '';
  host.style.transition = '';
  host.offsetHeight;

  if (!('nuCollapseId' in host)) {
    host.nuCollapseId = 0;
  }

  host.nuCollapseId++;

  const id = host.nuCollapseId;

  const realHeight = getRealHeight(host);

  if (!bool) {
    host.style.maxHeight = '0px';
    host.style.transition = TRANSITION;
    host.style.opacity = '0';
    host.offsetHeight;

    // setTimeout(() => {
    host.style.maxHeight = `${realHeight}px`;
    host.style.opacity = '1';

    setTransitionTimeout(host, () => {
      if (id !== host.nuCollapseId) return;

      host.style.maxHeight = '';
      host.style.opacity = '';
      host.style.transition = '';
    });
    // }, 100);
  } else {
    host.style.maxHeight = `${realHeight}px`;
    host.style.transition = TRANSITION;
    host.style.opacity = '1';
    host.offsetHeight;
    host.style.maxHeight = '0px';
    host.style.opacity = '0';

    setTransitionTimeout(host, () => {
      if (id !== host.nuCollapseId) return;

      host.style.display = 'none';
      host.style.maxHeight = '';
      host.style.opacity = '';
      host.style.transition = '';
    });
  }
}
