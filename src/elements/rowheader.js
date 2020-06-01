import NuTableHeader from './tableheader';

export default class NuRowHeader extends NuTableHeader {
  static get nuTag() {
    return 'nu-rowheader';
  }

  static get nuRole() {
    return 'rowheader';
  }
}
