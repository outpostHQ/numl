import {
  unit,
  generateId,
  setImmediate,
  sizeUnit, parseAllValues,
} from '../helpers';
import textAttr from '../attributes/text';
import NuBase from '../base';
import placeAttr, { PLACE_VALUES } from '../attributes/place';
import borderAttr from '../attributes/border';
import shadowAttr from '../attributes/shadow';
import flowAttr from '../attributes/flow';
import gapAttr from '../attributes/gap';
import zAttr from '../attributes/z';
import interactiveAttr from '../attributes/interactive';
import sizingAttr from '../attributes/sizing';
import sizeAttr from '../attributes/size';
import transitionAttr from '../attributes/transition';
import colorAttr from '../attributes/color';
import fillAttr from '../attributes/fill';
import transformAttr from '../attributes/transform';
import spaceAttr from '../attributes/space';
import radiusAttr from '../attributes/radius';
import overflowAttr from '../attributes/overflow';
import hideAttr from '../attributes/hide';
import imageAttr from '../attributes/image';
import paddingAttr from '../attributes/padding';
import beforeAttr from '../attributes/before';
import afterAttr from '../attributes/after';
import scrollbarAttr from '../attributes/scrollbar';
import filterAttr from '../attributes/filter';
import scaleAttr from '../attributes/scale';
import rotateAttr from '../attributes/rotate';
import moveAttr from '../attributes/move';
import showAttr from '../attributes/show';

/**
 * @class
 * @abstract
 */
export default class NuElement extends NuBase {
  static get nuTag() {
    return 'nu-el'; // abstract tag
  }

  /**
   * Element attribute config.
   * @returns {Object}
   */
  static get nuAttrs() {
    return {
      width: sizeUnit('width'),
      height: sizeUnit('height'),
      sizing: sizingAttr,
      radius: radiusAttr,
      'items-radius': unit('border-radius', {
        suffix: '>:not([radius])',
        empty: '--nu-border-radius',
        property: true,
        convert: true,
      }),
      padding: paddingAttr,
      'items-padding': unit('padding', {
        suffix: '>:not([padding])',
        empty: '--nu-indent',
        convert: true,
      }),
      overflow: overflowAttr,
      space: spaceAttr,
      border: borderAttr,
      shadow: shadowAttr,
      flow: flowAttr,
      gap: gapAttr,
      order: 'order',
      grow: 'flex-grow',
      shrink: 'flex-shrink',
      basis: unit('flex-basis', { convert: true }),
      'items-basis': unit('flex-basis', { suffix: '>:not([basis])', convert: true }),
      'items-grow': unit('flex-grow', { suffix: '>:not([grow])' }),
      'items-shrink': unit('flex-shrink', { suffix: '>:not([shrink])' }),
      'place-content': PLACE_VALUES[0],
      'place-items': PLACE_VALUES[1],
      'content': PLACE_VALUES[0],
      'items': PLACE_VALUES[1],
      'template-areas': 'grid-template-areas',
      areas: 'grid-template-areas',
      'auto-flow': 'grid-auto-flow',
      'template-columns': unit('grid-template-columns', { convert: true }),
      'template-rows': unit('grid-template-rows', { convert: true }),
      columns: unit('grid-template-columns', { convert: true }),
      rows: unit('grid-template-rows', { convert: true }),
      column: 'grid-column',
      row: 'grid-row',
      area: 'grid-area',
      place: placeAttr,
      z: zAttr,
      interactive: interactiveAttr,
      color: colorAttr,
      fill: fillAttr,
      filter: filterAttr,
      image: imageAttr,
      transform: transformAttr,
      scale: scaleAttr,
      rotate: rotateAttr,
      move: moveAttr,
      text: textAttr,
      cursor: 'cursor',
      size: sizeAttr,
      hide: hideAttr,
      show: showAttr,
      opacity: 'opacity',
      transition: transitionAttr,
      scrollbar: scrollbarAttr,
      before: beforeAttr,
      after: afterAttr,
      controls: '',
      label: '',
      level: '',
      labelledby: '',
      describedby: '',
      valuemin: '',
      valuemax: '',
      valuenow: '',
      setsize: '',
      posinset: '',
      expanded: '',
      owns: '',
      flowto: '',
      haspopup: '',
      activedescendant: '',
      t(val) {
        return val
          ? {
            $suffix: ` > [name="${val}"]`,
            display: `block !important`,
          } : null;
      },
    };
  }

  /**
   * Element default attribute values.
   * They are used only to generate initial CSS for elements.
   */
  static get nuDefaults() {
    return {
      display: 'inline-block',
      sizing: 'border',
    };
  }

  /**
   * Element initialization logic
   */
  static nuCSS({ tag, css }) {
    return `
      ${css}
      ${tag}[hidden] {
        display: none !important;
      }
    `;
  }

  /**
   * Attribute change reaction.
   * @param {String} name
   * @param {*} oldValue
   * @param {*} value
   */
  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      // ARIA
      case 'label':
      case 'level':
      case 'valuemin':
      case 'valuemax':
      case 'valuenow':
      case 'setsize':
      case 'posinset':
      case 'expanded':
      case 'haspopup':
        this.nuSetAria(name, this.nuGetAttr(name, true));
        break;
      case 'controls':
      case 'labelledby':
      case 'describedby':
      case 'owns':
      case 'flowto':
      case 'activedescendant':
        setImmediate(() => {
          value = this.nuGetAttr(name, true);

          const ariaValue = value.split(/\s+/g).map((id) => {
            let link;

            link = this.nuInvertQueryById(id);

            if (!link) return '';

            return generateId(link);
          }).join(' ');

          if (ariaValue.trim()) {
            this.nuSetAria(name, ariaValue);
          }
        });
        break;
      case 't':
        if (!this.nuIsConnected) return;

        value = this.nuGetAttr(name);

        const labels = parseAllValues(value);

        // empty tag
        this.innerHTML = '';

        labels.forEach(label => {
          if (this.querySelector(`nu-el[name="${label}"]`)) return;

          const el = document.createElement('nu-el');

          el.setAttribute('name', label);
          el.style.display = 'none';
          el.innerHTML = label.replace(/(^'|'$)/g, '');

          this.appendChild(el);
        });
        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    if (this.hasAttribute('t')) {
      this.nuChanged('t', null, this.getAttribute('t'));
    }
  }
}
