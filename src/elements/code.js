import NuElement from './element';
import { h } from '../helpers';

export default class NuCode extends NuElement {
  static get nuTag() {
    return 'nu-code';
  }

  static get nuRole() {
    return 'figure';
  }

  static get nuStyles() {
    return {
      display: 'block',
      radius: '1r',
      fill: 'main-bg',
      text: 'monospace',
    };
  }

  static nuCSS({ tag, css }) {
    return [
      ...css,

      `${tag} nu-block {
        white-space: pre;
      }`,

      `${tag} > pre, ${tag} > textarea {
        display: none;
      }`,

      `${tag} nu-el {
        display: inline !important;
      }`,

      `${tag} nu-el[plus]::before {
        content: '+ ';
        display: inline-block;
      }`,

      `${tag} nu-el[minus]::before {
        content: '- ';
        display: inline-block;
      }`,

      `${tag} nu-el[number]::before {
        content: '1. ';
        display: inline-block;
      }`,

      `${tag} nu-el[fill] {
        border-radius: var(--nu-radius);
        padding: .25em;
      }`,
    ];
  }

  static get nuBehaviors() {
    return {
      code: true,
    };
  }

  nuConnected() {
    super.nuConnected();

    this.classList.add('notranslate');

    const ref = this.querySelector('textarea, pre');

    if (!ref) return;

    const container = h('nu-block');

    container.innerHTML = (ref.tagName === 'TEXTAREA' ? ref.textContent : ref.innerHTML)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/#\[\[|!\[\[|]]#|]]!/g, '');

    this.appendChild(container);
  }
}
