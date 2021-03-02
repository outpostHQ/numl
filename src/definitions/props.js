import NuDefinition from './definition';
import {
  log,
  normalizeAttrStates,
  parseAttr,
  parseAttrStates,
  parseColor
} from '../helpers';
import { insertRuleSet } from '../css';

export function handleProp(varName, varValue) {
  const zones = parseAttrStates(varValue);
  const isColor = varName.endsWith('-color');

  zones.map(zone => {
    const states = zone.states;

    Object.keys(states)
      .forEach(stateName => {
        const val = states[stateName];

        states[stateName] = `${varName};${(
          isColor
            ? parseColor(val).color
            : parseAttr(val).value
        ) || ''}`;
      });
  });

  return normalizeAttrStates(zones);
}

export default class NuProps extends NuDefinition {
  static get nuTag() {
    return 'nu-props';
  }

  nuConnected() {
    super.nuConnected();

    this.nuApply();

    if (this.nuObserver) return;

    const observer = new MutationObserver(() => this.nuApply());

    observer.observe(this, {
      characterData: false,
      attributes: true,
      childList: false,
      subtree: false
    });

    this.nuObserver = observer;
  }

  nuApply() {
    const parent = this.parentNode;
    const context = this.nuParentSelector;
    const props = this.nuOwnAttrs;

    if (JSON.stringify(this.nuProps) === JSON.stringify(props)
      || !parent
      || !parent.nuGetCSS) return;

    this.nuProps = props;

    Object.entries(props).forEach(([varName, varValue]) => {
      const value = handleProp(varName, varValue);

      const css = parent.nuGetCSS(context, 'prop', value);

      insertRuleSet(`prop:${varName}:${context}`, css, null, true);

      log('apply property', { context: parent, name: varName, value: value });
    });
  }
}
