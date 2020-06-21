import NuElement from './element';

export default class NuSpacer extends NuElement {
  static get nuTag() {
    return 'nu-spacer';
  }

  static get nuStyles() {
    return {
      display: 'block',
      width: 'min 1fs',
      height: 'min 1fs',
      basis: '1fs',
      size: '1x',
    };
  }
}
