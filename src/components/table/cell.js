import NuBlock from '../block';
import NuComponent from '../component';

const attrs = NuComponent.nuAttrs;

Object.assign(attrs, {
  ...NuBlock.nuAttrs,
  'type': '',
});

export default class NuCell extends NuBlock {
  static get nuTag() {
    return 'cell';
  }

  static get nuAttrs() {
    return attrs;
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
