export default function focusable(tag) {
  return `
    ${tag}:not([disabled]) {
      --nu-focus-color: transparent;
      --nu-focus-background-color: transparent;
      --nu-focus-inset: 0 0;
      --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);
      --nu-focus-background-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-background-color);

      outline: none;
    }
    ${tag}:not([disabled])::before {
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
    ${tag}:not([disabled])[nu-focus] {
      z-index: 10;
    }
    ${tag}:not([disabled])[nu-focus] {
      --nu-focus-color: var(--nu-theme-special-color);
    }
    ${tag}:not([disabled])[nu-focus] {
      --nu-focus-background-color: var(--nu-theme-special-background-color);
    }
    ${tag}:not([disabled])[nu-focus].-nu-cell {
      --nu-focus-inset: inset 0 0;
    }
  `;
}
