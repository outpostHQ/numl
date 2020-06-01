import NuCell from './cell';

export default class NuTableHeader extends NuCell {
  static get nuTag() {
    return 'nu-tableheader';
  }

  static get nuStyles() {
    return {
      text: 'bold middle',
      fill: 'mark',
    };
  }
}
