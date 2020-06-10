import NuIcon from './icon';

export default class NuDropdownIcon extends NuIcon {
  static get nuTag() {
    return 'nu-dropdownicon';
  }

  static get nuAttrs() {
    return {
      name: 'chevron-down',
      scale: '^btn:pressed[flip-y]', // if parent button is pressed then flip the icon
      space: '^:btn[.5em left right] 0', // if parent is button
    };
  }
}
