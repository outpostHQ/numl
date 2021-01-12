import NuEl from './el';

export default class NuContents extends NuEl {
  static get nuTag() {
    return 'nu-contents';
  }

  static get nuContents() {
    return '*';
  }
}
