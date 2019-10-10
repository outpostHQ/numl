import NuCell from './cell';

export default class NuColumnHeader extends NuCell {
  static get nuTag() {
    return 'nu-columnheader';
  }

  static get nuRole() {
    return 'columnheader';
  }

  static get nuDefaults() {
    return {
      display: 'table-cell',
      color: 'minor',
      background: 'minor-background',
      mod: 'w6',
    };
  }

  nuConnected() {
    super.nuConnected();

    const parentGroup = this.parentNode && this.parentNode.parentNode;

    if (parentGroup && parentGroup.constructor.nuRole === 'rowgroup') {
      parentGroup.setAttribute('display', 'table-header-group');
    }
  }
}
