import ConverterBehavior from './converter';
import markdownConverter from '../converters/markdown';
import { h } from '../helpers';

export default class MarkdownBehavior extends ConverterBehavior {
  static get converter() {
    return markdownConverter;
  }

  constructor($host, value = '') {
    super($host);

    const mods = value.split(/\s+/g);

    this.inline = mods.includes('inline');
  }

  init() {
    this.props.gap = (val) => {
      if (val == null) val = '2x';

      if (this.container) {
        this.container.setAttribute('gap', value);
      }

      if (this.observe) {
        setTimeout(() => this.observe());
      }
    };

    super.init();
  }

  apply(container, content, converter) {
    if (!converter) return;

    container.setAttribute('gap', this.$host.getAttribute('gap') || '2x');

    container.innerHTML = converter(
      content,
      this.inline,
    );
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
