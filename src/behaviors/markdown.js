import ConverterBehavior from './converter';
import markdownConverter from '../converters/markdown';
import { h } from '../dom-helpers';
import { BOOL_TYPE } from './widget';

export default class MarkdownBehavior extends ConverterBehavior {
  static get converter() {
    return markdownConverter;
  }

  constructor(host, value = '') {
    super(host);

    const mods = value.split(/\s+/g);

    this.inline = mods.includes('inline');
  }

  init() {
    this.props.gap = (val) => {
      if (val == null) val = '2x';

      if (this.container) {
        this.container.setAttribute('gap', val);
      }

      if (this.observe) {
        setTimeout(() => this.observe());
      }
    };
    this.props.typographer = BOOL_TYPE;
    this.props.linkify = BOOL_TYPE;

    super.init();
  }

  apply(container, content, converter) {
    if (!converter) return;

    const { inline, typographer, linkify } = this;

    container.setAttribute('gap', this.host.getAttribute('gap') || '2x');

    container.innerHTML = converter(content, {
      inline,
      typographer,
      linkify,
    });
  }

  createContainer() {
    return h(this.inline ? 'nu-el' : 'nu-flow');
  }

  prepareContent(str) {
    const tab = str.match(/^\s*/)[0];

    if (tab) {
      str = str.split('\n').map(str => str.replace(tab, '')).join('\n');
    }

    return str
      .replace(/^\s*\n/g, '')
      .replace(/\n\s*$/g, '');
  }
}
