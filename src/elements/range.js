import NuWidget from './widget';

const TEMPLATE = `<nu-circle
  id="slider-cap"
  size="1.25em"
  fill="special-text"
  border="1b color(text)"
  space=".375em + 1b"
  text="v-middle"
  move="--local-rail-move-v --local-rail-move-h"></nu-circle>`;

export default class NuRange extends NuWidget {
  static get nuTag() {
    return 'nu-range';
  }

  static get nuTemplate() {
    return TEMPLATE;
  }

  static get nuWidget() {
    return import('../widgets/slider');
  }

  static get nuAttrs() {
    return {
      disabled: '',
      orient(val) {
        const vertical = val === 'v';

        return combinedAttr([{
          width: vertical ? '.5em' : '100%',
          height: vertical ? '100%' : '.5em',
          '--local-rail-move-h': vertical ? '.25em' : '0',
          '--local-rail-move-v': vertical ? '0' : '-.25em',
        }, {
          $suffix: '>',
          '--local-rail-top': vertical ? 'initial' : '0',
          '--local-rail-left': vertical ? 'initial' : '--local-offset',
          '--local-rail-bottom': vertical ? '--local-offset' : 'initial',
        }], NuRail);
      },
    };
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      radius: 'round',
      fill: 'special-bg :disabled[text 50%]',
      opacity: '1 :disabled[.5]',
      border: '1b',
      text: 'v-middle',
      cursor: 'pointer :disabled[default]',
      hoverable: '.5em :disabled[n]',
      transition: 'shadow',
      expand: '.5em',
      orient: 'h',
    };
  }
}
