import NuDefinition from './definition';
import {
  computeStyles,
  log,
  normalizeAttrStates,
  parseAttr, warn,
} from '../helpers';
import { generateCSS, insertRuleSet } from '../css';
import { generateCSSByZones, RESPONSIVE_ATTR } from '../responsive';

export const BASE_ATTR = 'size';

const ElementStub = {
  nuAllGenerators: {
    [BASE_ATTR](val) {
      const { values } = parseAttr(val, 0);

      return { 'font-size': values[0] };
    },
  },
  nuAllStyles: {},
};

export default class NuBase extends NuDefinition {
  static get nuTag() {
    return 'nu-base';
  }

  static get nuGenerators() {
    return {
      size: '',
    };
  }

  nuConnected() {
    super.nuConnected();

    this.nuApply();
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (!this.nuIsConnected) return;

    if (name === BASE_ATTR) {
      this.nuApply();
    }
  }

  nuApply() {
    if (document.querySelector('nu-base') !== this) {
      warn('only single instance of nu-base is allowed');

      return;
    }

    const value = this.getAttribute(BASE_ATTR);
    const normalizedValue = normalizeAttrStates(value);
    const query = ':root';
    const isResponsive = normalizedValue.includes('|');
    const respContext = this.nuContext && this.nuContext.responsive && this.nuContext.responsive.context;

    let css;

    if (isResponsive && respContext) {
      const zones = ['max'].concat(respContext.getAttribute(RESPONSIVE_ATTR).split('|'));
      const styles = generateCSSByZones(ElementStub, query, BASE_ATTR, value, zones);

      css = respContext.nuResponsive()(styles);
    } else {
      let styles = computeStyles(BASE_ATTR, value, ElementStub.nuAllGenerators, ElementStub.nuAllStyles);

      css = generateCSS(query, styles, true);
    }

    insertRuleSet(`base`, css, null, true);

    log('set base:', { value: normalizedValue });
  }
}
