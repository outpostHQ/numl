import NuBlock from '../block';

export default class NuCell extends NuBlock {
  static get nuTag() {
    return 'cell';
  }

  static get nuAttrs() {
    return NuBlock.nuAttrs.concat(['type']);
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'type') {
      this.nuSetMod('header', value === 'header');
      this.nuSetMod('group', value === 'group');

      if (this.getAttribute('theme') == null) {
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
