import NuRadioGroup from './radiogroup';
import DirectionMixin from '../mixins/direction';

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
      gap: '2x :orient-v[1x]',
      flow: `row
        :orient-v[column]`,
    };
  }

  static get nuItemRole() {
    return 'tab';
  }

  static get nuMixins() {
    return [DirectionMixin({ aria: true })];
  }
}
