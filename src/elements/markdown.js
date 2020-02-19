import NuElement from './element';
import { injectStyleTag } from '../css';

export default class NuMarkdown extends NuElement {
  static get nuTag() {
    return 'nu-markdown';
  }

  static get nuDefaults() {
    return {
      display: 'block',
      gap: '1x',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} > pre, ${tag} > textarea {
        display: none;
      }
      ${tag} [nu-id="bold"]:not([text]) {
        font-weight: bold;
      }
      ${tag} [nu-id="italic"]:not([text]) {
        font-style: italic;
      }
    `;
  }

  nuConnected() {
    super.nuConnected();

    if (this.hasAttribute('shady')) {
      this.nuAttachShadow();
    }

    setTimeout(() => {
      const nuRef = this.querySelector('textarea, pre');

      if (!nuRef) {
        error('nu-snippet: textarea tag required');
      }

      const container = document.createElement(this.nuInline ? 'nu-el' : 'nu-flow');

      container.setAttribute('gap', this.getAttribute('gap') || '1x');

      (this.nuShadow || this).appendChild(container);

      if (this.nuShadow) {
        injectStyleTag(
          this.constructor.nuCSS({ tag: '', css: '' }),
          'shadow:nu-markdown',
          this.nuShadow,
        );
      }

      this.nuObserve = () => {
        const content = nuRef.tagName === 'TEXTAREA' ? nuRef.textContent : nuRef.innerHTML;

        content.setAttribute('role', 'none');
        content.setAttribute('aria-hidden', 'true');

        container.innerHTML = markdownToNuml(prepareContent(content), this.nuInline);
      };

      const observer = new MutationObserver(() => this.nuObserve());

      observer.observe(nuRef, {
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

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'gap' && this.nuObserve) {
      this.nuObserve();
    }
  }
}

function prepareContent(str) {
  const tab = str.match(/^\s*/)[0];

  if (tab) {
    str = str.split('\n').map(str => str.replace(tab, '')).join('\n');
  }

  return str
    .replace(/^\s*\n/g, '')
    .replace(/\n\s*$/g, '');
}

const TAGS = {
  '': ['<nu-el id="italic">', '</nu-el>'],
  _: ['<nu-el id="bold">', '</nu-el>'],
  '~': ['<nu-el text="s">', '</nu-el>'],
  '\n': ['</nu-block><nu-block>'],
  ' ': ['<br />'],
  '-': ['<nu-line></nu-line>']
};

/** Outdent a string based on the first indented line's leading whitespace
 *  @private
 */
function outdent(str) {
  return str.replace(RegExp('^' + (str.match(/^(\t| )+/) || '')[0], 'gm'), '');
}

/** Encode special attribute characters to HTML entities in a String.
 *  @private
 */
function encodeAttr(str) {
  return (str + '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Parse Markdown into an NuML String. */
export function markdownToNuml(md, inline, prevLinks) {
  let tokenizer = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm,
    context = [],
    out = '',
    links = prevLinks || {},
    last = 0,
    chunk, prev, token, inner, t, heading;

  TAGS['\n\n'] = inline ? '\n' : '</nu-block><nu-block>';

  function tag(token) {
    var desc = TAGS[token.replace(/\*/g, '_')[1] || ''],
      end = context[context.length - 1] == token;
    if (!desc) return token;
    if (!desc[1]) return desc[0];
    context[end ? 'pop' : 'push'](token);
    return desc[end | 0];
  }

  function flush() {
    let str = '';
    while (context.length) str += tag(context[context.length - 1]);
    return str;
  }

  md = md.replace(/^\[(.+?)\]:\s*(.+)$/gm, (s, name, url) => {
    links[name.toLowerCase()] = url;
    return '';
  }).replace(/^\n+|\n+$/g, '');

  while ((token = tokenizer.exec(md))) {
    prev = md.substring(last, token.index);
    last = tokenizer.lastIndex;
    chunk = token[0];
    if (prev.match(/[^\\](\\\\)*\\$/)) {
      // escaped
    }
    // Code/Indent blocks:
    else if (!inline && (token[3] || token[4])) {
      chunk = '</nu-block><nu-code padding ' + (!token[4] && token[2].toLowerCase() === 'enumerate' ? 'enumerate' : '') + '><textarea>' + outdent(encodeAttr(token[3] || token[4]).replace(/^\n+|\n+$/g, '')) + '</textarea></nu-code><nu-block>';
    }
    // > Quotes, -* lists:
    else if (!inline && token[6]) {
      t = token[6];
      if (t.match(/\./)) {
        token[5] = token[5].replace(/^\d+/gm, '');
      }
      inner = markdownToNuml(outdent(token[5].replace(/^\s*[>*+.-]/gm, '')), true);
      if (t === '>') t = 'blockquote';
      else {
        t = 'nu-list';
        inner = inner.replace(/^(.*)(\n|$)/gm, '<nu-listitem>$1</nu-listitem>');
      }
      chunk = '<' + t + (t.match(/\./) ? ' enumerate' : '') + '>' + inner + '</' + t + '>';
    }
    // Images:
    else if (!inline && token[8]) {
      chunk = `<nu-img><img src="${encodeAttr(token[8])}" alt="${encodeAttr(token[7])}"></nu-img>`;
    }
    // Links:
    else if (token[10]) {
      out = out.replace('<nu-link>', `<nu-link to="${encodeAttr(token[11] || links[prev.toLowerCase()])}">`);
      chunk = flush() + '</nu-link>';
    } else if (token[9]) {
      chunk = '<nu-link>';
    }
    // Headings:
    else if (!inline && (token[12] || token[14])) {
      heading = true;
      t = (token[14] ? token[14].length : (token[13][0] === '=' ? 1 : 2));
      chunk = '</nu-block><nu-heading level="' + t + '">' + markdownToNuml(token[12] || token[15], inline, links) + '</nu-heading><nu-block>';
    }
    // `code`:
    else if (token[16]) {
      chunk = '<nu-mark>' + encodeAttr(token[16]) + '</nu-mark>';
    }
    // Inline formatting: *em*, **strong** & friends
    else if (token[17] || token[1]) {
      chunk = tag(token[17] || '--');
    }

    out += prev;
    out += chunk;
  }

  let result = (out + md.substring(last) + flush()).trim();

  if (!inline) {
    result = ('<nu-block>' + result + '</nu-block>').replace(/<nu-block><\/nu-block>/g, '');
  }

  return result;
}

NuMarkdown.nuConvert = markdownToNuml;
