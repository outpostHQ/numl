import NuElement from './element';
import OrientMixin, { HORIZONTAL } from '../mixins/orient';
import combinedAttr from '../attributes/combined';

const EVENT_MAP = {
  'mousemove': 'nuOnDragging',
  'touchmove': 'nuOnDragging',
  'mouseup': 'nuOnDragEnd',
  'touchend': 'nuOnDragEnd',
  'contextmenu': 'nuOnDragEnd',
};

export default class NuRail extends NuElement {
  static get nuTag() {
    return 'nu-rail';
  }

  static get nuRole() {
    return '';
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

  static get nuMixins() {
    return {
      orient: OrientMixin(),
    };
  }

  static nuCSS({ css, tag }) {
    return `
      ${css}
      ${tag} {
        position: relative;
      }
    `;
  }

  nuConnected() {
    super.nuConnected();

    this.nuOnDragStart = this.nuOnDragStart.bind(this);
    this.nuOnDragging = this.nuOnDragging.bind(this);
    this.nuOnDragEnd = this.nuOnDragEnd.bind(this);

    this.addEventListener('touchmove', (evt) => evt.preventDefault(), { passive: true });

    this.nuSetContext('disabled', this.hasAttribute('disabled'));

    ['mousedown', 'touchstart']
      .forEach(eventName => {
        this.addEventListener(eventName, this.nuOnDragStart, { passive: true });
      });
  }

  nuOnDragStart(evt) {
    if (this.hasAttribute('disabled')) return;

    this.nuSetValueByEvent(evt);
    this.nuDragging = true;

    Object.entries(EVENT_MAP)
      .forEach(([event, handler]) => {
        window.addEventListener(event, this[handler], { passive: true });
      });
  }

  nuOnDragging(evt) {
    if (this.nuDragging) {
      this.nuSetValueByEvent(evt);
    }
  }

  nuOnDragEnd(evt) {
    if (this.nuDragging) {
      this.nuSetValueByEvent(evt);
      this.nuDragging = false;
      Object.entries(EVENT_MAP)
        .forEach(([event, handler]) => {
          window.removeEventListener(event, this[handler]);
        });

      const slider = this.querySelector('[role="slider"]');

      if (slider) {
        slider.focus();
      }
    }
  }

  nuSetValueByEvent(evt) {
    const rect = this.getBoundingClientRect();

    let value;

    this.nuSetOrient(rect.width > rect.height ? 'h' : 'v');

    if (rect.width > rect.height) {
      const pageX = (evt.pageX || (evt.touches && evt.touches.length && evt.touches[0].pageX)) - window.scrollX;
      value = Math.max(0, Math.min(1,
        (pageX - rect.x) / (rect.width)));
    } else {
      const pageY = (evt.pageY || (evt.touches && evt.touches.length && evt.touches[0].pageY)) - window.scrollY;
      value = 1 - Math.max(0, Math.min(1,
        (pageY - rect.y) / (rect.height)));
    }

    this.nuSetContext('sliderValue', value);
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    if (name === 'disabled') {
      this.nuSetContext(name, value == null);
    }
  }
}
