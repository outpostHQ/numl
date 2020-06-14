import { deepQueryAll, requestIdleCallback, log, asyncDebounce } from './helpers';

export const ROOT = document.querySelector(':root');

function observeContext() {
  setLocale();
  setOutline();
}

const observer = new MutationObserver(() => observeContext());

observer.observe(ROOT, {
  characterData: false,
  attributes: true,
  childList: false,
  subtree: false
});

const CONTEXT = {
  $shadowRoot: null,
  $parentShadowRoot: null,
};

export default CONTEXT;

function setLocale() {
  const value = ROOT.getAttribute('lang') || navigator.language || navigator.languages[0] || 'en';

  setRootContext('locale', value);
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

setLocale();
setOutline();
