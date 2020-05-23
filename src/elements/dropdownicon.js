import NuIcon from './icon';

export default class NuDropdownIcon extends NuIcon {
  static get nuTag() {
    return 'nu-dropdownicon';
  }

  static get nuAttrs() {
    return {
      name: 'chevron-down',
      scale: '^btn:pressed[flip-y]',
      space: '1x right',
    };
  }
}
