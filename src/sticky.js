import { deepQueryAll } from './helpers';
import { ROOT } from './context';

const STICKY_POSITION = ['-webkit-sticky', 'sticky'];

export default function () {
  let timerId;

  function handleSticky() {
    if (timerId) return;

    timerId = setTimeout(() => {
      timerId = null;

      const scrollTop = ROOT.scrollTop;
      const scrollLeft = ROOT.scrollLeft;
      const elements = deepQueryAll(ROOT, '[place*="sticky"], [nu-header]');

      elements.forEach(el => {
        if (!el.nuSetMod) return;

        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        // Comparison with 1 is required for iOS where rect.y can be positive decimal number like 0.3
        // Using 0 value will cause in false negative results.
        const sticky = (STICKY_POSITION.includes(style.position) || el.nuHasName('header'))
          && !!(scrollTop > 0 && rect.y < 1 || scrollLeft > 0 && rect.x < 1);

        el.nuSetMod('sticky', sticky);
      });
    }, 100);
  }

  window.addEventListener('scroll', handleSticky, { passive: true });
}
