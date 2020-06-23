import ConverterBehavior from './converter';
import CodeConverter from '../converters/code';
import { applyTheme, parseHue, requireHue } from '../themes';

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

export const CODE_THEMES = {
  [COM]: '0 0 low',
  [SPC]: false,
  [NAM]: false,
  [KEY]: '240 70',
  [NUM]: '280 100 pastel',
  [PCT]: '60 pastel',
  [REX]: '340 70',
  [STR]: '180 70',
  [UNK]: '240 0',
  [PLS]: '180 70',
  [MNS]: '1 70',
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
export const THEME_ATTRS = {};

export default class CodeBehavior extends ConverterBehavior {
  static get converter() {
    return CodeConverter;
  }

  init() {
    this.props.enumerate = (val) => {
      if (this.observe) {
        setTimeout(() => this.observe());
      }

      return val != null;
    };

    super.init();

    if (!themesDeclared) {
      declareThemes();
    }
  }

  apply(container, content, converter) {
    if (!converter) return;

    container.innerHTML = converter(
      content,
      this.enumerate,
      THEME_ATTRS,
    );
  }

  prepareContent(content) {
    const str = content || '';

    return str
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/(^|\n)\s*(?=\n$)/g, '')
      .replace(/\n\s*(?=(\n$|$))/g, '')
      .replace(/^\n/, '')
      .replace(/\n$/, '');
  }
}

function declareThemes() {
  themesDeclared = true;

  Object.entries(CODE_THEMES).forEach(([id, theme]) => {
    if (!theme) return;

    if (typeof theme === 'object') {
      const { hue, type, saturation, pastel, contrast, lightness } = theme;

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

      THEME_ATTRS[id] = { theme: name };

      if (type) {
        THEME_ATTRS[id].fill = '';
      }
    } else {
      THEME_ATTRS[id] = { color: `${requireHue(parseHue(theme))}`}
    }
  });
}
