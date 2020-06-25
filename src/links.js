import { deepQueryAll } from './helpers';
import { ROOT } from './context';

let timerId;

export function handleLinkState(el) {
  const link = el.querySelector('a');

  if (!link) return;

  const href = link.href;
  const windowHeight = window.innerHeight;

  if (href.startsWith('#')) {
    const id = el.getAttribute('to').slice(1);

    const target = el.nuQueryById(id);

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

    el.nuSetMod('current', isCurrent);
  } else {
    el.nuSetMod('current', href === location.href);
  }
}

export function handleLinksState(force = false) {
  if (timerId && !force) return;

  if (force) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    timerId = null;

    const links = deepQueryAll(ROOT, '[nu-action][to]');

    links.forEach(handleLinkState);
  }, force ? 0 : 100);
}

export default function () {
  window.addEventListener('scroll', handleLinksState, { passive: true });

  setTimeout(handleLinksState, 50);
}
