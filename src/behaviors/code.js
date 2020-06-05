import ConverterBehavior from './converter';
import CodeConverter from '../converters/code';
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

export const CODE_THEMES = {
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
      CODE_THEMES,
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

  Object.entries(CODE_THEMES).forEach(([id, { hue, type, saturation, pastel, contrast, lightness, skip }]) => {
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
