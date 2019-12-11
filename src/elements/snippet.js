import NuElement from './element';
import { error } from '../helpers';
import { applyTheme, generateReferenceColor } from '../themes';

let themesDeclared = false;

export default class NuCode extends NuElement {
  static get nuTag() {
    return 'nu-code';
  }

  static get nuThemes() {
    return {
      [COM]: {
        saturation: 0,
        contrast: 'soft',
      },
      [KEY]: {
        hue: 240,
      },
      [NUM]: {
        hue: 280,
        saturation: '80p',
      },
      [PCT]: {
        hue: 1,
        saturation: 0,
        contrast: 'strong',
      },
      [REX]: {
        hue: 340,
        saturation: '80p',
      },
      [STR]: {
        hue: 180,
      },
      [UNK]: {
        hue: 240,
        saturation: 0,
      },
    };
  }

  static get nuDefaults() {
    return {
      display: 'block',
      radius: '1x',
      fill: '',
      text: 'monospace',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} > nu-block {
        white-space: pre;
      }
      ${tag} > textarea {
        display: none;
      }
      ${tag} > nu-block > nu-el {
        display: inline !important;
      }
      ${tag}[inline]:not([fill]) {
        background-color: var(--nu-subtle-color);
      }
      ${tag}[inline]:not([padding]) {
        padding: 0 var(--nu-padding);
      }
    `;
  }

  nuConnected() {
    super.nuConnected();

    if (!themesDeclared) {
      themesDeclared = true;
      declareThemes(this.constructor);
    }

    setTimeout(() => {
      const textarea = this.querySelector('textarea');

      if (!textarea) {
        error('nu-snippet: textarea tag required');
      }

      const container = document.createElement('nu-block');

      this.appendChild(container);

      this.nuObserve = () => {
        container.innerHTML = textToMarkup(textarea.textContent);
      };

      const observer = new MutationObserver(() => this.nuObserve());

      observer.observe(textarea, {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: false
      });

      this.nuSetDisconnectedHook(() => {
        observer.disconnect();
      });

      this.nuObserve();
    });
  }
}

const KEYWORD_RE = /^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/;
const COM = 'com';
const KEY = 'key';
const NAM = 'nam';
const NUM = 'num';
const PCT = 'pct';
const REX = 'rex';
const SPC = 'spc';
const STR = 'str';
const UNK = 'unk';

const TOKEN_RES = [
  [NUM, /#([0-9a-f]{6}|[0-9a-f]{3})\b/],
  [COM, /(\/\/|#).*?(?=\n|$)/],
  [COM, /\/\*[\s\S]*?\*\//],
  [COM, /<!--[\s\S]*?-->/],
  [REX, /\/(\\\/|[^\n])*?\//],
  [STR, /(['"`])(\\\1|[\s\S])*?\1/],
  [NUM, /[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?/],
  [PCT, /[\\.,:;+\-*\/=<>()[\]{}|?!&@~]/],
  [SPC, /\s+/],
  [NAM, /[\w$]+/],
  [UNK, /./]
];

function tokenize(text) {
  const tokens = [];
  const len = TOKEN_RES.length;

  let prefer_div_over_re = false;

  while (text) {
    for (let i = 0; i < len; i += 1) {
      let m = TOKEN_RES[i][1].exec(text);
      if (!m || m.index !== 0) {
        continue;
      }

      let cls = TOKEN_RES[i][0];
      if (cls === REX && prefer_div_over_re) {
        continue;
      }

      let tok = m[0];

      if (cls === NAM && KEYWORD_RE.test(tok)) {
        cls = KEY;
      }
      if (cls === SPC) {
        if (tok.indexOf('\n') >= 0) {
          prefer_div_over_re = false;
        }
      } else {
        prefer_div_over_re = cls === NUM || cls === NAM;
      }

      text = text.slice(tok.length);
      tokens.push([cls, tok]);
      break;
    }
  }

  return tokens;
}

function textToMarkup(str) {
  const lines = str.split('\n');

  if (lines[0] && !lines[0].trim()) {
    lines.splice(0, 1);
  }

  if (lines[lines.length - 1] && !lines[lines.length - 1].trim()) {
    lines.splice(-1, 1);
  }

  const firstLine = lines
    .find(line => line.trim().length);

  if (!firstLine) return;

  const tab = firstLine.match(/^\s*/)[0];

  if (tab) {
    str = lines.map(str => str.replace(tab, '')).join('\n');
  }

  return tokenize(str).reduce(function (html, token) {
    return html + `<nu-el theme="snippet-${token[0]}">${token[1]}</nu-el>`;
  }, '');
}

function declareThemes(cls) {
  Object.entries(cls.nuThemes).forEach(([id, { hue, saturation, contrast }]) => {
    const name = `snippet-${id}`;

    applyTheme(document.body, {
      color: generateReferenceColor({
        hue: hue != null ? String(hue) : '240',
        saturation: saturation != null ? String(saturation) : '100p'
      }),
      name,
      type: 'tint',
      lightness: 'normal',
      contrast: contrast || 'normal',
    }, name);
  });
}
