import ConverterBehavior from './converter';
import CodeConverter from '../converters/code';

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

export const NAMES = [COM, KEY, NAM, NUM, PCT, REX, SPC, STR, UNK, PLS, MNS, MRK, IMP];
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

  NAMES.forEach(name => {
    THEME_ATTRS[name] = { style: `color: var(--${name}-color, var(--main-text-color)); background-color: var(--${name}-bg-color, transparent)` };

    if (name === MRK || name === IMP) {
      THEME_ATTRS[name].radius = '.5x';
    }
  });
}
