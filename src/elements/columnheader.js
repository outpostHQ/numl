import NuTableHeader from './tableheader';

export default class NuColumnHeader extends NuTableHeader {
  static get nuTag() {
    return 'nu-columnheader';
  }

  static get nuRole() {
    return 'columnheader';
  }

  nuConnected() {
    super.nuConnected();

    const parentGroup = this.parentNode && this.parentNode.parentNode;

    if (parentGroup && parentGroup.getAttribute('role') === 'rowgroup') {
      parentGroup.setAttribute('display', 'table-header-group');
    }
  }
}
