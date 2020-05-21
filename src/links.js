import { deepQueryAll } from './helpers';
import { ROOT } from './context';

let timerId;

export function handleLinksState(force = false) {
  if (timerId && !force) return;

  if (force) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    timerId = null;

    const windowHeight = window.innerHeight;
    const links = deepQueryAll(ROOT, '[nu][to^="#"]');

    links.forEach(link => {
      const id = link.getAttribute('to').slice(1);

      const target = link.nuQueryById(id);

      if (!target) return;

      const rect = target.getBoundingClientRect();

      const bottom = rect.y + rect.height;

      let isCurrent = false;

      if ((rect.y <= 0 && bottom >= windowHeight)
        || (rect.y >= 0 && bottom <= windowHeight)
        || (rect.y >= 0 && rect.y <= windowHeight / 2)
        || (bottom <= windowHeight && bottom >= windowHeight / 2)) {
        isCurrent = true;
      }

      link.nuSetMod('current', isCurrent);
    });
  }, force ? 0 : 100);
}

export default function () {
  window.addEventListener('scroll', handleLinksState, { passive: true });

  setTimeout(handleLinksState, 50);
}
