import NuDecorator from './decorator';
import CSS from '../css';
import { getLuminance } from '../helpers';

export default class NdTheme extends NuDecorator {
  static get nuTag() {
    return 'nd-theme';
  }

  static get nuAttrsList() {
    return [
      'color',
      'background-color',
      'border-color',
      'special-color',
      'border-radius',
      'border-width',
      'animation-time',
      'shadow-opacity',
    ];
  }

  nuChanged(name, oldValue, value) {
    if (!this.nuIsMounted) return;

    this.nuApply();
  }

  nuMounted() {
    super.nuMounted();

    // run only once
    if (this.nuIsMounted) return;

    this.nuApply();
  }

  nuApply() {
    const theme = this.getAttribute('name');

    if (!theme) {
      this.parentNode.setAttribute('data-nu-theme', 'default');
    }

    const attrs = this.constructor.nuAttrsList.reduce((obj, attr) => {
      const value = this.getAttribute(attr);

      obj[`--nu-theme-${attr}`] = value;

      return obj;
    }, {});

    attrs['--nu-theme-special-background-color'] = attrs['--nu-theme-background-color'];

    CSS.generateTheme(theme, attrs, this.nuParentContext);
  }
}
