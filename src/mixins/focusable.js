export default function focusable(tag, { force, cell } = {}) {
  const context = force
    ? ''
    : `html.nu-focus-enabled `;

  return `
    ${tag} {
      --nu-focus-color: transparent;
      --nu-focus-inset: ${cell ? 'inset' : '0 0'};
      --nu-focus-shadow: var(--nu-focus-inset) 0 0.1875rem var(--nu-focus-color);

      outline: none;
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
      transition: box-shadow var(--nu-theme-animation-time) linear;
    }
    ${context}${tag}:not([disabled])[nu-focus] {
      z-index: 10;
    }
    ${context}${tag}:not([disabled])[nu-focus] {
      --nu-focus-color: var(--nu-theme-focus-color);
    }
  `;
}
