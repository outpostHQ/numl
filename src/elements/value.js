import NuElement from './el';

export default class NuValue extends NuElement {
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
      color: ':placeholder[var(--nu-placeholder-color, rgba(var(--nu-text-color-rgb), var(--nu-disabled-opacity)))] inherit',
    };
  }
}
