import NuElement from './el';

export default class NuBlock extends NuElement {
  static get nuTag() {
    return 'nu-block';
  }

  static get nuStyles() {
    return {
      display: 'block',
    };
  }
}
