import { deepQueryAll } from './helpers';
import { ROOT } from './context';

export default function () {
  let timerId;

  function handleSticky() {
    if (timerId) return;

    timerId = setTimeout(() => {
      timerId = null;

      const scrollTop = ROOT.scrollTop;
      const scrollLeft = ROOT.scrollLeft;
      const elements = deepQueryAll(ROOT, '[place*="sticky"], [nu-sticky]');

      elements.forEach(el => {
        if (!el.nuSetMod) return;

        const rect = el.getBoundingClientRect();
        const sticky = !!(scrollTop && rect.y === 0 || scrollLeft && rect.x === 0);

        el.nuSetMod('sticky', sticky);
      });
    }, 100);
  }

  window.addEventListener('scroll', handleSticky, { passive: true });
}
