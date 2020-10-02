import { deepQueryAll } from '../helpers';
import { ROOT } from '../context';
import Behavior from './behavior';

const history = window.history;

const _wr = function (type) {
  return function () {
    const rv = History.prototype[type].apply(history, arguments);
    const e = new Event(type.toLowerCase());
    window.dispatchEvent(e);
    return rv;
  };
};

history.pushState = _wr('pushState')
history.replaceState = _wr('replaceState');

let timerId;

function handleHashLinks() {
  const links = deepQueryAll(ROOT, '[is-current-spy] > a[href^="#"]');
  const arr = [];

  links.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const target = link.parentNode.nuQueryById(id);

    if (!target) return;

    const rect = target.getBoundingClientRect();
    const offset = rect.y;

    if (target) {
      arr.push({
        link,
        id,
        target,
        offset,
        parent: link.parentNode,
      });
    }
  });

  if (!arr.length) return;

  arr.sort((a, b) => b.offset - a.offset);

  let map = arr.find(map => map.offset <= 1);

  if (map) {
    map.parent.nuSetMod('current', true);
  }

  arr.forEach(mp => {
    if (mp !== map) {
      mp.parent.nuSetMod('current', false);
    }
  });
}

export function handleLinkState(link) {
  const href = link.href;

  link.parentNode && link.parentNode.nuSetMod && link.parentNode.nuSetMod('current', href === location.href.replace(location.hash, ''));
}

export function handleLinksState(force = false) {
  if (timerId && !force) return;

  if (force) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    timerId = null;

    const otherLinks = deepQueryAll(ROOT, '[is-current-spy] > a:not([href^="#"])');

    handleHashLinks();
    otherLinks.forEach(handleLinkState);
  }, force ? 0 : 100);
}

['popstate', 'pushstate', 'replacestate'].forEach(eventName => {
  window.addEventListener(eventName, () => {
    setTimeout(handleLinksState, 100);
  }, { passive: true });
});

['scroll', 'hashchange'].forEach((eventName) => {
  window.addEventListener(eventName, handleHashLinks, { passive: true });
});

setTimeout(handleLinksState, 50);

export default class CurrentBehavior extends Behavior {
  connected() {
    this.setMod('current-spy', true);
  }

  disconnected() {
    this.setMod('current-spy', false);
  }
}
