import { deepQueryAll, requestIdleCallback, log, asyncDebounce } from './helpers';

export const ROOT = document.querySelector(':root');

const DARK = 'dark';
const LIGHT = 'light';
const HIGH = 'high';
const LOW = 'low';
const SCHEMES = [DARK, LIGHT];
const CONTRASTS = [HIGH, LOW];

function observeContext(data) {
  if (data.find(record => !record.attributeName.endsWith('-is'))) {
    setLocale();
    setOutline();
    setScheme();
    setContrast();
  }
}

const CONTEXT = {
  $shadowRoot: null,
  $parentShadowRoot: null,
};

export default CONTEXT;

function setLocale() {
  const value = ROOT.getAttribute('lang') || navigator.language || navigator.languages[0] || 'en';

  setRootContext('locale', value);
}

const schemeMedia = matchMedia('(prefers-color-scheme: dark)');
const contrastMedia = matchMedia('(prefers-contrast: high)');

let globalScheme = schemeMedia.matches ? DARK : LIGHT;
let globalContrast = contrastMedia.matches ? HIGH : LOW;

schemeMedia.addListener((_media) => {
  globalScheme = _media.matches ? DARK : LIGHT;

  setScheme();
});

contrastMedia.addListener((_media) => {
  globalContrast = _media.matches ? HIGH : LOW;

  setContrast();
});

function setScheme() {
  const setting = ROOT.dataset.nuScheme;

  ROOT.dataset.nuSchemeIs = (setting !== 'auto' && SCHEMES.includes(setting) && setting)
    || globalScheme;
}

function setContrast() {
  const setting = ROOT.dataset.nuContrast;

  ROOT.dataset.nuContrastIs = (setting !== 'auto' && CONTRASTS.includes(setting) && setting)
    || globalContrast;
}

let outlineStyleTag;

function setOutline() {
  if (outlineStyleTag && outlineStyleTag.parentNode) {
    outlineStyleTag.parentNode.removeChild(outlineStyleTag);
  }

  const showOutline = ROOT.dataset.nuOutline != null;

  if (showOutline) {
    deepQueryAll(ROOT, '[is-host]')
      .forEach(host => {
        host.nuSetMod('outline', showOutline);
      });
  }

  setRootContext('outline', showOutline);
}

export function setRootContext(name, value) {
  if (value == null) {
    if (!(name in CONTEXT)) return;

    delete CONTEXT[name];
  } else {
    if (JSON.stringify(CONTEXT[name]) === JSON.stringify(value)) return;

    CONTEXT[name] = value;
  }

  verifyRoot(name);
}

const verifyRoot = asyncDebounce((name) => {
  log('root context verification');

  requestIdleCallback(() => {
    deepQueryAll(ROOT, '[nu]')
      .forEach(el => el.nuContextChanged(name));
  });
});

// export function verifyContext(element) {
//   if (element.nuVerification) return;
//
//   element.nuVerification = true;
//
//   requestIdleCallback(() => {
//     element.nuVerification = false;
//
//     deepQueryAll(element, '[nu]')
//       .forEach(el => el.nuContextChanged(name));
//   });
// }

export function getRootContext(name) {
  return CONTEXT[name];
}

export function initContext() {
  setLocale();
  setOutline();
  setScheme();
  setContrast();

  const observer = new MutationObserver((data) => observeContext(data));

  observer.observe(ROOT, {
    characterData: false,
    attributes: true,
    childList: false,
    subtree: false
  });
}
