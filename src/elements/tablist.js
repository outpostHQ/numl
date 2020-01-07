import NuRadioGroup from './radiogroup';

export default class NuTablist extends NuRadioGroup {
  static get nuTag() {
    return 'nu-tablist';
  }

  static get nuRole() {
    return 'tablist';
  }

  static get nuId() {
    return 'tablist';
  }

  static get nuDefaults() {
    return {
      gap: 1,
    };
  }

  static get nuItemRole() {
    return 'tab';
  }
}
