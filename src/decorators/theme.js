import NuDecorator from './decorator';
import { declareTheme, generateReferenceColor, removeTheme } from '../themes';
import { convertUnit } from '../helpers';

const ATTRS_LIST = [
  'name',
  'hue',
  'saturation',
  'from',
  'mods',
  'border-radius',
  'border-width',
  'padding',
  'animation-time',
];

/**
 * @class
 * @property nuParent
 */
export default class NuTheme extends NuDecorator {
  static get nuTag() {
    return 'nu-theme';
  }

  static get nuAttrsList() {
    return [...ATTRS_LIST];
  }

  nuChanged(name, oldValue, value) {
    if (!this.nuIsConnected) return;

    this.nuApply();
  }

  nuConnected() {
    super.nuConnected();

    // run only once
    if (this.nuIsConnected) return;

    this.nuParent = this.parentNode;

    setTimeout(() => this.nuApply());
  }

  nuDisconnected() {
    super.nuDisconnected();

    // remove theme
    if (this.nuParent && this.nuName) {
      removeTheme(this.nuParent, this.nuName, this.nuProps || {});
    }
  }

  nuApply() {
    const attrs = [...this.attributes].reduce((map, attr) => {
      map[attr.name] = attr.value;

      return map;
    }, {});

    const { name = 'main', hue, saturation, from, mods, ...props } = attrs;

    const referenceColor = generateReferenceColor({ hue, saturation, from });
    const defaultMods = mods || '';

    const customProps = Object.keys(props || {})
      .reduce((map, prop) => {
        if (!ATTRS_LIST.includes(prop)) return map;

          map[`--nu-${prop}`] = convertUnit(props[prop]);

        return map;
      }, {});

    if (!referenceColor) return;

    if ((this.nuName && this.nuName !== name)
      || (this.nuReferenceColor && JSON.stringify(this.nuReferenceColor) !== JSON.stringify(referenceColor))
      || (this.nuProps && JSON.stringify(this.nuProps) !== JSON.stringify(customProps))
      || (this.nuMods && this.nuMods !== defaultMods)) {
      removeTheme(this.nuParent, this.nuName, this.nuProps);

      setTimeout(() => {
        [...this.nuParent.querySelectorAll('[nu][theme]')]
          .forEach(el => {
            el.nuEnsureThemes(true);
          });
      }, 0);
    }

    this.nuName = name;
    this.nuProps = customProps;
    this.nuReferenceColor = referenceColor;
    this.nuMods = defaultMods;

    declareTheme(this.nuParent, name, referenceColor, customProps, defaultMods || '');
  }
}
