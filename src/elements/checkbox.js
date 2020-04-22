import NuActiveElement from './activeelement';

export default class NuCheckbox extends NuActiveElement {
  static get nuTag() {
    return 'nu-checkbox';
  }

  static get nuRole() {
    return 'checkbox';
  }

  static get nuTemplate() {
    return `
      <nu-icon
        name="check"
        opacity="--icon-opacity"
        transition="opacity"
        color="--icon-color"></nu-icon>
    `;
  }

  static get nuDefaults() {
    return {
      display: 'inline-grid',
      width: '1em',
      height: '1em',
      border: '1b color(text) :disabled[1b color(text 50%)]',
      radius: '.25em',
      content: 'stretch',
      items: 'center',
      padding: '0',
      sizing: 'content',
      fill: 'bg',
      cursor: 'default',
      text: 'v-middle',
      toggle: '0 :active[.5em] :pressed[0] :active:pressed[.5em]',
      hoverable: 'n :focusable[.5em]',
      expand: '.5em',

      '--icon-opacity': ':pressed[1] 0',
      '--icon-color': 'special :disabled[text 66%]',
    };
  }

  // nuConnected() {
  //   super.nuConnected();
  //
  //   if (this.querySelector('nu-icon')) return;
  //
  //   const icon = document.createElement('nu-icon');
  //
  //   setAttrs(icon, ICON_ATTRS);
  //
  //   this.appendChild(icon);
  // }
}
