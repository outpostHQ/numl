import NuBlock from '../block';
import NuElement from '../element';

export default class NuCell extends NuBlock {
  static get nuTag() {
    return 'cell';
  }

  static get nuAttrs() {
    return Object.assign(NuElement.nuAttrs, {
      ...NuBlock.nuAttrs,
      'type': '',
    });
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'type') {
      this.nuSetMod('header', value === 'header');
      this.nuSetMod('group', value === 'group');

      if (!this.hasAttribute('theme')) {
        switch (value) {
          case 'header':
            this.nuUpdateTheme('current');
            break;
          case 'group':
            this.nuUpdateTheme('!current');
            break;
        }
      }
    }
  }
}
