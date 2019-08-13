export default function focusable(tag, force) {
  const context = force
    ? ''
    : '[data-nu-root][data-nu-focus-enabled] ';

  return `
    ${tag} {
      --nu-focus-color: transparent;
      --nu-focus-background-color: transparent;
      --nu-focus-inset: 0 0;
      --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
      --nu-focus-background-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-background-color);

      outline: none;
    }

    ${context}${tag}:not([disabled]) {
      --nu-focus-color: transparent;
      --nu-focus-background-color: transparent;
      --nu-focus-inset: 0 0;
      --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
      --nu-focus-background-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-background-color);
    }
    ${context}${tag}:not([disabled])::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      border-radius: var(--nu-border-radius);
      box-shadow: var(--nu-focus-shadow);
      opacity: .5;
      transition: box-shadow var(--nu-theme-animation-time) linear;
    }
    ${context}${tag}:not([disabled])[nu-focus] {
      z-index: 10;
    }
    ${context}${tag}:not([disabled])[nu-focus] {
      --nu-focus-color: var(--nu-theme-special-color);
    }
    ${context}${tag}:not([disabled])[nu-focus] {
      --nu-focus-background-color: var(--nu-theme-special-background-color);
    }
    ${context}${tag}:not([disabled])[nu-focus].-nu-cell {
      --nu-focus-inset: inset 0 0;
    }
  `;
}
