import NuCell from './cell';

export default class NuRowHeader extends NuCell {
  static get nuTag() {
    return 'nu-rowheader';
  }

  static get nuRole() {
    return 'rowheader';
  }

  static get nuDefaults() {
    return {
      text: 'w6 middle',
      border: '1x right',
    };
  }
}
