import NuEl from './el';

export default class NuFlow extends NuEl {
  static get nuTag() {
    return 'nu-flow';
  }

  static get nuStyles() {
    return {
      display: 'block',
      flow: 'column',
    };
  }
}
