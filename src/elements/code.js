import NuElement from './element';

export default class NuCode extends NuElement {
  static get nuTag() {
    return 'nu-code';
  }

  static get nuDefaults() {
    return {
      display: 'block',
      radius: '1r',
      fill: 'bg',
      text: 'monospace',
    };
  }

  static get nuAttrs() {
    return {
      enumerate: '',
    }
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} nu-block {
        white-space: pre;
      }
      ${tag} > pre, ${tag} > textarea {
        display: none;
      }
      ${tag} nu-el {
        display: inline !important;
      }
      ${tag}[inline]:not([fill]) {
        background-color: var(--nu-subtle-color);
      }
      ${tag}[inline]:not([padding]) {
        padding: .125rem .25em;
      }
      ${tag} nu-el[plus]::before {
        content: '+ ';
        display: inline-block;
      }
      ${tag} nu-el[minus]::before {
        content: '- ';
        display: inline-block;
      }
      ${tag} nu-el[number]::before {
        content: '1. ';
        display: inline-block;
      }
      ${tag} nu-el[fill] {
        border-radius: var(--nu-radius);
        padding: .25em;
      }
    `;
  }

  static nuShadowCSS() {
    return this.nuCSS({ tag: '', css: '' });
  }

  static get nuBehaviors() {
    return {
      code: true,
    };
  }
}
