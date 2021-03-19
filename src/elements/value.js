import NuEl from './el';

export default class NuValue extends NuEl {
  static get nuTag() {
    return 'nu-value';
  }

  static get nuBehaviors() {
    return {
      value: true,
    };
  }

  static get nuStyles() {
    return {
      filter: 'n :placeholder[saturate(0.33) contrast(0.78) opacity(var(--disabled-opacity))]',
    };
  }
}
