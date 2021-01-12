import NuEl from './el';

export default class NuFlex extends NuEl {
  static get nuTag() {
    return 'nu-flex';
  }

  static get nuStyles() {
    return {
      display: 'flex',
      flow: 'row',
      gap: '0',
    };
  }
}
