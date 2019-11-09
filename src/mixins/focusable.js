export default function focusable(tag, { force, cell } = {}) {
  const context = force
    ? ''
    : `html.nu-focus-enabled `;

  return `
    ${tag} {
      --nu-local-focus-color: transparent;
      --nu-local-focus-inset: ${cell ? 'inset' : '0 0'};
      --nu-local-focus-shadow: var(--nu-local-focus-inset) 0 calc(var(--nu-border-width) * 3) var(--nu-local-focus-color);

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
      border-radius: var(--nu-local-border-radius, var(--nu-border-radius));
      box-shadow: var(--nu-local-focus-shadow);
      transition: box-shadow var(--nu-animation-time) linear;
    }
    ${context}${tag}:not([disabled])[nu-focus] {
      z-index: 10;
    }
    ${context}${tag}:not([disabled])[nu-focus] {
      --nu-local-focus-color: var(--nu-focus-color);
    }
  `;
}
