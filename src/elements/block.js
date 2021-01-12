import NuEl from './el';

export default class NuBlock extends NuEl {
  static get nuTag() {
    return 'nu-block';
  }

  static get nuStyles() {
    return {
      display: 'block',
    };
  }
}
