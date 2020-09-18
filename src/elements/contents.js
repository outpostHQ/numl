import NuElement from './el';

export default class NuContents extends NuElement {
  static get nuTag() {
    return 'nu-contents';
  }

  static get nuContents() {
    return '*';
  }
}
