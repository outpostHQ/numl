import { devMode, DIRECTIONS, fixPosition, parseAttr, warn } from '../helpers';
import { PLACE_ATTR } from '../styles/place';

const LISTENERS = new Set;

const FIXATE_DIRECTIONS = ['up', 'right', 'down', 'left'];

export const FIXATE_ATTR = 'drop';

function onFixateChange() {
  LISTENERS.forEach(listener => {
    listener();
  });
}

export default class FixateBehavior {
  constructor(host) {
    this.host = host;
    this.change = this.change.bind(this);
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);

    this.changed(FIXATE_ATTR, host.getAttribute(FIXATE_ATTR) || 'down');
  }

  disconnected() {
    this.end();

    delete this.parent;
  }

  changed(name) {
    const { host } = this;

    if (name !== PLACE_ATTR && name !== FIXATE_ATTR) return;

    host.nuSetMod(FIXATE_ATTR, false);
    host.nuSetContext('fixate', null);
    host.style.display = '';
    host.style.opacity = '';
    delete this.position;

    const fixateValue = host.getAttribute(FIXATE_ATTR)
      || host.constructor.nuAllStyles[FIXATE_ATTR]
      || 'down';

    if (!this.enabled) return;

    if (devMode) {
      const { mods } = parseAttr(fixateValue);

      if ((mods[0] && !FIXATE_DIRECTIONS.includes(mods[0]))
        || (mods[1] && !DIRECTIONS.includes(mods[1]))) {
        warn('[fixate.behavior] incorrect [drop] value:', JSON.stringify(fixateValue));

        return;
      }
    }

    this.position = fixateValue;

    host.nuSetMod(FIXATE_ATTR, true);
    host.nuSetContext('fixate', {
      context: host,
      position: fixateValue,
    });

    host.style.display = 'none';
    host.style.opacity = '0';
  }

  get enabled() {
    const { host } = this;
    const place = host.getAttribute(PLACE_ATTR);
    const fixate = host.getAttribute(FIXATE_ATTR);
    const defaults = host.constructor.nuAllStyles;

    if (place) {
      return false;
    }

    if (fixate == null) {
      return defaults[FIXATE_ATTR] && !defaults[PLACE_ATTR];
    }

    return true;
  }

  change() {
    const { host } = this;

    const [pos, spos] = this.position.split(/\s+/);
    const parent = this.parent;

    if (!pos || !parent) return;

    const rect = parent.getBoundingClientRect();
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const width = rect.width;
    const height = rect.height;
    const offsetX = rect.x;
    const offsetY = rect.y;
    const props = {};

    let move;

    switch (pos) {
      case 'up':
        props.top = '';
        props.right = '';
        props.bottom = winHeight - offsetY;
        props.left = offsetX + (width / 2);
        move = '-50%, 0';
        break;
      case 'right':
        props.top = offsetY + (height / 2);
        props.right = '';
        props.bottom = '';
        props.left = offsetX + width;
        move = '0, -50%';
        break;
      case 'down':
        props.top = offsetY + height;
        props.right = '';
        props.bottom = '';
        props.left = offsetX + (width / 2);
        move = '-50%, 0';
        break;
      case 'left':
        props.top = offsetY + (height / 2);
        props.right = winWidth - offsetX;
        props.bottom = '';
        props.left = ``;
        move = '0, -50%';
        break;
    }

    if (spos) {
      if (pos === 'up' || pos === 'down') {
        if (spos === 'right') {
          props.left = '';
          props.right = winWidth - offsetX - width;
        } else {
          props.left = offsetX;
        }
        move = '0, 0';
      } else {
        if (spos === 'top') {
          props.top = offsetY;
        } else {
          props.top = '';
          props.bottom = winHeight - offsetY - height;
        }
        move = '0, 0';
      }
    }

    Object.entries(props)
      .forEach(([name, value]) => {
        value = value ? `${value}px` : 'initial';

        host.style.setProperty(`--nu-fixate-${name}`, value);
      });

    host.style.setProperty(`--nu-fixate-width`, `${width}px`);
    host.style.setProperty(`--nu-transform-place`, `translate(${move})`);

    setTimeout(() => {
      fixPosition(host);
    });
  }

  start() {
    const { host } = this;

    if (!this.position) return;

    host.style.display = '';
    host.style.opacity = '1';

    if (!this.parent) {
      this.parent = host.parentNode;
    }

    this.fixated = true;

    this.change();

    LISTENERS.add(this.change);
  }

  end() {
    const { host } = this;

    if (!this.fixated) return;

    this.fixated = false;

    LISTENERS.delete(this.change);

    host.style.opacity = '0';

    setTimeout(() => {
      if (!this.fixated) {
        host.style.display = 'none';
        host.style.removeProperty(`--nu-transform-place`);

        [...DIRECTIONS, 'width']
          .forEach(prop => host.style.removeProperty(`--nu-fixate-${prop}`));
      }
    }, 500);
  }
};

['scroll', 'resize', 'wheel', 'touchmove', 'tap'].forEach(eventName => {
  window.addEventListener(eventName, onFixateChange, { passive: true });
});
