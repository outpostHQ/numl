import { ROOT } from './context';

const IGNORE_KEYS = ['Alt', 'Control', 'Meta', 'Shift'];
const FOCUS_ALWAYS = ROOT.dataset.nuFocus === 'always';

let enableTimerId, disableTimerId;

export function enableFocus() {
  if (enableTimerId) return;

  enableTimerId = setTimeout(() => {
    if (ROOT) {
      ROOT.style.setProperty('--nu-focus-enabler', '1');
      ROOT.dataset.nuFocus = '';
    }

    enableTimerId = 0;
  }, 100);
}

export function disableFocus() {
  if (disableTimerId || FOCUS_ALWAYS) return;

  disableTimerId = setTimeout(() => {
    if (ROOT) {
      ROOT.style.setProperty('--nu-focus-enabler', '0');
      delete ROOT.dataset.nuFocus;
    }

    disableTimerId = 0;
  }, 100);
}

export function initFocus() {
  const win = window;

  win.addEventListener('mousedown', disableFocus, { capture: true });
  win.addEventListener('touchstart', disableFocus, { passive: true, capture: true });
  win.addEventListener('keydown', (event) => {
    if (!IGNORE_KEYS.includes(event.key)) {
      enableFocus();
    }
  }, { capture: true });

  if (FOCUS_ALWAYS) {
    enableFocus();
  }
}
