import NuConverter from './converter';
import { applyTheme } from '../themes';

let themesDeclared = false;

const COM = 'com';
const KEY = 'key';
const NAM = 'nam';
const NUM = 'num';
const PCT = 'pct';
const REX = 'rex';
const SPC = 'spc';
const STR = 'str';
const UNK = 'unk';
const PLS = 'pls';
const MNS = 'mns';
const MRK = 'mrk';
const IMP = 'imp';

export default class NuCode extends NuConverter {
  static get nuTag() {
    return 'nu-code';
  }

  static get nuThemes() {
    return {
      [COM]: {
        saturation: 0,
        contrast: 'soft',
      },
      [SPC]: { skip: true },
      [NAM]: { skip: true },
      [KEY]: {
        hue: 240,
      },
      [NUM]: {
        hue: 280,
        saturation: 100,
        pastel: true,
      },
      [PCT]: {
        hue: 60,
        pastel: true,
      },
      [REX]: {
        hue: 340,
      },
      [STR]: {
        hue: 180,
      },
      [UNK]: {
        hue: 240,
        saturation: 0,
      },
      [PLS]: {
        hue: 180,
      },
      [MNS]: {
        hue: 1,
      },
      [MRK]: {
        hue: 240,
        type: 'tone',
      },
      [IMP]: {
        hue: 1,
        type: 'special',
        lightness: 'dim',
        saturation: 75,
        pastel: false,
      }
    };
  }

  static get nuConverter() {
    return import('../converters/code');
  }

  static get nuDefaults() {
    return {
      display: 'block',
      radius: '1r',
      fill: 'bg',
      text: 'monospace',
    };
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

  nuConnected() {
    super.nuConnected();

    if (!themesDeclared) {
      themesDeclared = true;
      declareThemes(this.constructor);
    }
  }

  nuApply(container, content, converter) {
    container.innerHTML = converter(
      extractContent(content),
      this.hasAttribute('enumerate'),
      NuCode.nuThemes,
    );
  }
}

function declareThemes(cls) {
  Object.entries(cls.nuThemes).forEach(([id, { hue, type, saturation, pastel, contrast, lightness, skip }]) => {
    if (skip) return;

    const name = `snippet-${id}`;

    applyTheme(document.body, {
      hue: hue != null ? String(hue) : 240,
      saturation: saturation != null ? saturation : (pastel ? 100 : 75),
      pastel: pastel != null ? pastel : false,
      name,
      type: type || 'tint',
      lightness: lightness || 'normal',
      contrast: contrast || 'normal',
    }, name);
  });
}

function extractContent(content) {
  const str = content || '';

  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/(^|\n)\s*(?=\n)/g, '')
    .replace(/\n\s*(?=(\n|$))/g, '')
    .replace(/^\n/, '')
    .replace(/\n$/, '');
}
