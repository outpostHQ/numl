import { ROOT } from './context';

const IGNORE_KEYS = ['Alt', 'Control', 'Meta', 'Shift'];

let enableTimerId, disableTimerId;

export function enableFocus() {
  if (enableTimerId) return;

  enableTimerId = setTimeout(() => {
    if (ROOT) {
      ROOT.style.setProperty('--nu-focus-enabler', '1');
    }

    enableTimerId = 0;
  }, 100);
}

export function disableFocus() {
  if (disableTimerId) return;

  disableTimerId = setTimeout(() => {
    if (ROOT) {
      ROOT.style.setProperty('--nu-focus-enabler', '0');
    }

    disableTimerId = 0;
  }, 100);
}

export function initFocus() {
  const win = window;

  win.addEventListener('mousedown', disableFocus);
  win.addEventListener('touchstart', disableFocus, { passive: true });
  win.addEventListener('keydown', (event) => {
    if (!IGNORE_KEYS.includes(event.key)) {
      enableFocus();
    }
  });
}
