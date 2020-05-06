import NuRowHeader from './rowheader';

export default class NuColumnHeader extends NuRowHeader {
  static get nuTag() {
    return 'nu-columnheader';
  }

  static get nuRole() {
    return 'columnheader';
  }

  nuConnected() {
    super.nuConnected();

    const parentGroup = this.parentNode && this.parentNode.parentNode;

    if (parentGroup && parentGroup.constructor.nuRole === 'rowgroup') {
      parentGroup.setAttribute('display', 'table-header-group');
    }
  }

  static get nuStyles() {
    return {
      border: null,
    };
  }
}
