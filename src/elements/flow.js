import NuBlock from './block';

export default class NuFlow extends NuBlock {
  static get nuTag() {
    return 'nu-flow';
  }

  static get nuStyles() {
    return {
      flow: 'column',
    };
  }
}
