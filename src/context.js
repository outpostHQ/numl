import { deepQueryAll } from './helpers';

export const ROOT = document.querySelector(':root');

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

function observeContext() {
  setLocale();
}

function setLocale() {
  const value = ROOT.getAttribute('lang') || navigator.language || navigator.languages[0];

  setRootContext('var:locale', { value });
}

export function setRootContext(name, value) {
  if (value == null) {
    if (!(name in CONTEXT)) return;

    delete CONTEXT[name];
  } else {
    if (CONTEXT[name] === value) return;

    CONTEXT[name] = value;
  }

  deepQueryAll(ROOT, '[nu]')
    .forEach(el => el.nuContextChanged(name))
}

export function getRootContext(name) {
  return CONTEXT[name];
}

setLocale();
