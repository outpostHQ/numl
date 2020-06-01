import NuElement from './element';
import combinedAttr from '../attributes/combined';

export default class NuSlider extends NuElement {
  static get nuTag() {
    return 'nu-slider';
  }

  static get nuRole() {
    return 'slider';
  }

  static get nuTemplate() {
    return `
      <nu-circle
        id="slider-cap"
        place="top left --nu-local-rail-top --nu-local-rail-left"
        size="1.25em"
        radius="round"
        fill="special-text"
        border="1bw color(text)"
        space=".375em + 1bw"
        text="v-middle"
        move="--local-rail-move-v --local-rail-move-h"
        orient="h"
        opacity="1"
        outline="focus-outside"></nu-circle>
    `;
  }

  static get nuGenerators() {
    return {
      orient(val) {
        const vertical = val === 'v';

        return combinedAttr([{
          width: vertical ? '.5em' : '100%',
          height: vertical ? '10x' : '.5em',
          '--local-rail-move-h': vertical ? '-.5em - 1bw' : '-.5em + 1bw',
          '--local-rail-move-v': vertical ? '-.5em + 1bw' : '-.5em - 1bw',
          '--local-rail-top': vertical ? '(100% - --local-offset)' : '0',
          '--local-rail-left': vertical ? 'initial' : '--local-offset',
          '--local-rail-bottom': vertical ? '--local-offset' : 'initial',
          '--orient': vertical ? 'v' : 'h',
        }], NuSlider);
      },
    };
  }

  static get nuStyles() {
    return {
      display: 'inline-block',
      radius: 'round',
      fill: 'special-bg :disabled[text 50%]',
      opacity: '1 :disabled[.5]',
      border: '1bw',
      text: 'v-middle',
      cursor: 'pointer :disabled[default]',
      mark: '.5em hover :disabled[n]',
      transition: 'shadow',
      expand: '.5em',
      orient: 'h',
      outline: 'n',
      box: 'y',
    };
  }

  static get nuBehaviors() {
    return {
      orient: 'dynamic',
      slider: true,
    };
  }
}
