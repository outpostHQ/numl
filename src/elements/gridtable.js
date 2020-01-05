import { unit } from '../helpers';
import NuGrid from './grid';
import themeAttr from '../attributes/theme';
import fillAttr from '../attributes/fill';

const STYLE_THEME_SUFFIX = '>:not([theme])';
const STYLE_FILL_SUFFIX = '>:not([fill])';

export default class NuGridTable extends NuGrid {
  static get nuTag() {
    return 'nu-gridtable';
  }

  static get nuAttrs() {
    return {
      padding: unit('padding', {
        suffix: '>*:not([padding]):not(nu-line)',
        convert: true,
      }),
      theme(val) {
        const styles = themeAttr(val);

        return styles.map(map => {
          map.$suffix = `${STYLE_THEME_SUFFIX}${map.$suffix || ''}`;

          return map;
        });
      },
      fill(val) {
        const map = fillAttr(val);

        map.$suffix = STYLE_FILL_SUFFIX;

        return map;
      },
    };
  }

  static get nuDefaults() {
    return {
      gap: '1b',
      color: '',
      overflow: 'auto',
    };
  }

  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag} {
        background-color: var(--nu-border-color);
      }
      ${tag} > :not([fill]) {
        background-color: var(--nu-main-bg-color);
      }
      ${tag}:not([padding]) > *:not([padding]):not(nu-line) {
        padding: var(--nu-indent);
      }
      ${tag} > *:not([place]) {
        position: relative;
      }
    `;
  }

  nuConnected() {
    super.nuConnected();
  }
}

