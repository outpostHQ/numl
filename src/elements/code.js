import NuElement from './el';
import { h } from '../dom-helpers';

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
      fill: 'hue(0 0 0) :special[hue(0 0 70 special)]',
      text: 'monospace',
      '--com-color': 'hue(0 0 low) :special[hue(0 0 12 special)]',
      '--spc-color': '--main-text-color :special[color(white)]',
      '--nam-color': '--main-text-color :special[color(white)]',
      '--key-color': 'hue(240 70) :special[hue(240 70 10 special)]',
      '--num-color': 'hue(280 100 pastel) :special[hue(280 100 10 pastel special)]',
      '--pct-color': 'hue(60 pastel) :special[hue(60 100 10 pastel special)]',
      '--rex-color': 'hue(340 70) :special[hue(340 70 10 special)]',
      '--str-color': 'hue(180 70) :special[hue(180 70 10 special)]',
      '--unk-color': 'hue(240 0) :special[hue(240 0 10 special)]',
      '--pls-color': 'hue(180 70) :special[hue(180 70 10 special)]',
      '--mns-color': 'hue(1 70) :special[hue(1 70 10 special)]',
      '--mrk-color': 'hue(240 70 60) :special[hue(240 0 0 special)]',
      '--mrk-bg-color': 'hue(240 70 3) :special[hue(240 70 50 special)]',
      '--imp-color': 'color(white)',
      '--imp-bg-color': 'hue(1 70 special)',
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
