import NuElement from './element';
import OrientMixin, { HORIZONTAL } from '../mixins/orient';

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

  static get nuDefaults() {
    return {
      display: 'inline-block',
      width: ':orient-x[100%] :orient-y[.5em]',
      height: ':orient-x[.5em] :orient-y[100%]',
      radius: 'round',
      fill: 'special-bg',
      border: '1b',
      text: 'v-middle',
      cursor: 'pointer',
      hoverable: '.5em',
    };
  }

  static get nuMixins() {
    return [OrientMixin()];
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

    ['mousedown', 'touchstart']
      .forEach(eventName => {
        this.addEventListener(eventName, this.nuOnDragStart);
      });
  }

  nuOnDragStart(evt) {
    this.nuSetValueByEvent(evt);
    this.nuDragging = true;

    Object.entries(EVENT_MAP)
      .forEach(([event, handler]) => {
        window.addEventListener(event, this[handler]);
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

    if (this.nuOrient === HORIZONTAL) {
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
  }
}