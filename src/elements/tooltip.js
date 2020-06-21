import NuElement from './element';

export default class NuTooltip extends NuElement {
  static get nuTag() {
    return 'nu-tooltip';
  }

  static get nuId() {
    return 'tooltip';
  }

  static get nuBehaviors() {
    return {
      fixate: true,
      tooltip: true,
    };
  }

  static get nuAttrs() {
    return {
      theme: '',
    };
  }

  static get nuStyles() {
    return {
      display: 'none :tooltip[block]',
      shadow: '',
      padding: '.5x 1x',
      z: 'front',
      opacity: '1 :hidden[0]',
      transition: 'opacity',
      place: 'outside-top',
      drop: '',
      fill: 'bg',
      color: 'text',
      radius: '1r',
      border: '1bw outside',
      size: 'xs',
      interactive: 'no',
      text: 'w6 wrap',
      width: 'min-content initial 20rem',
      space: 'remove',
      sizing: 'content',
    };
  }
}
