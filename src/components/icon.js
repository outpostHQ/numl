import {
  convertUnit, parseAllValues, svgElement,
} from '../helpers';
import NuBlock from './block';

export default class NuIcon extends NuBlock {
  static get nuTag() {
    return 'nu-icon';
  }

  static get nuRole() {
    return 'img';
  }

  static get nuAttrs() {
    return {
      size(val) {
        const converted = convertUnit(val || '');

        return val ? {
          'min-width': converted,
          'min-height': converted,
          '--nu-size': converted,
        } : null;
      },
      name(val, defaults) {
        return val
          ? {
            $suffix: ` > [name="${val}"]`,
            display: `${defaults.display} !important`,
          } : null;
      },
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
    };
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag} {
        --nu-size: 1em;

        position: relative;
        vertical-align: middle;
        min-width: 1em;
        min-height: 1em;
        background-color: transparent !important;
      }

      ${nuTag} > svg {
        position: absolute;
        left: 50%;
        top: 50%;
        width: var(--nu-size);
        height: var(--nu-size);
        transform: translate(-50%, -50%);
      }

      ${nuTag} > :not(svg) {
        display: none;
      }

      ${nuTag}[inline] {
        bottom: 0.0675em;
      }
    `;
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'name') {
      const names = parseAllValues(value);

      // empty tag
      this.innerHTML = '';

      names.forEach(name => {
        if (this.querySelector(`svg[name="${name}"]`)) return;

        window.Nude.iconLoader(name).then(svg => {
          const svgNode = svgElement(svg);

          svgNode.setAttribute('name', name);
          svgNode.style.display = 'none';

          this.appendChild(svgNode);
        });
      });
    }
  }

  nuUpdateTheme(attrTheme) {
    super.nuUpdateTheme(attrTheme);
  }
}
