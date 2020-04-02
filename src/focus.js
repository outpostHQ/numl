import { ROOT_CONTEXT } from './helpers';

let enableTimerId, disableTimerId;

export function enableFocus() {
  if (enableTimerId) return;

  enableTimerId = setTimeout(() => {
    const root = document.querySelector(ROOT_CONTEXT);

    if (root) {
      root.style.setProperty('--nu-focus-enabler', '1');
    }

    enableTimerId = 0;
  }, 100);
}

export function disableFocus() {
  if (disableTimerId) return;

  disableTimerId = setTimeout(() => {
    const root = document.querySelector(ROOT_CONTEXT);

    if (root) {
      root.style.setProperty('--nu-focus-enabler', '0');
    }

    disableTimerId = 0;
  }, 100);
}
