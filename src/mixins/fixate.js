import { devMode, DIRECTIONS, fixPosition, parseAttr, warn } from '../helpers';
import { PLACE_ATTR } from '../attributes/place';

const LISTENERS = new Set;

const FIXATE_DIRECTIONS = ['up', 'right', 'down', 'left'];

export const FIXATE_ATTR = 'drop';

function onFixateChange() {
  LISTENERS.forEach(listener => {
    listener();
  });
}

export default function FixateMixin() {
  return {
    connected() {
      const defaults = this.constructor.nuAllDefaults;
      const _this = this;

      Object.assign(this, {
        get nuIsFixate() {
          const place = _this.getAttribute(PLACE_ATTR);
          const fixate = _this.getAttribute(FIXATE_ATTR);

          if (place) {
            return false;
          }

          if (fixate == null) {
            return defaults[FIXATE_ATTR] && !defaults[PLACE_ATTR];
          }

          return true;
        }
      });

      this.nuChanged(FIXATE_ATTR, null, this.getAttribute(FIXATE_ATTR) || 'down');

      this.nuFixateChange = () => {
        if (!this.nuIsConnected || !this.nuIsFixate) return;

        const [pos, spos] = this.nuFixatePosition.split(/\s+/);
        const parent = this.nuFixateParent;

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
            value = value ? `${value}px` : '-';

            this.style.setProperty(`--nu-fixate-${name}`, value);
          });

        this.style.setProperty(`--nu-fixate-width`, `${width}px`);
        this.style.setProperty(`--nu-transform-place`, `translate(${move})`);

        setTimeout(() => {
          fixPosition(this);
        });
      };

      this.nuFixateStart = () => {
        if (!this.nuFixatePosition) return;

        this.nuFixateParent = this.parentNode;

        this.nuFixateChange();

        LISTENERS.add(this.nuFixateChange);
      };

      this.nuFixateEnd = () => {
        if (!this.nuFixatePosition) return;

        LISTENERS.delete(this.nuFixateChange);
      };
    },
    disconnected() {
      this.nuFixateEnd();
    },
    changed(name, oldValue, value) {
      if (name !== PLACE_ATTR && name !== FIXATE_ATTR) return;

      this.nuSetMod(FIXATE_ATTR, false);
      this.nuSetContext('fixate', null);
      delete this.nuFixatePosition;

      const fixate = this.nuIsFixate;
      const fixateValue = this.getAttribute(FIXATE_ATTR) || 'down';

      if (!fixate) return;

      if (devMode) {
        const { mods } = parseAttr(fixateValue);

        if ((mods[0] && !FIXATE_DIRECTIONS.includes(mods[0]))
          || (mods[1] && !DIRECTIONS.includes(mods[1]))) {
          warn('[fixate.mixin] incorrect [drop] value:', JSON.stringify(fixateValue));

          return;
        }
      }

      this.nuFixatePosition = fixateValue;
      this.nuSetMod(FIXATE_ATTR, true);
      this.nuSetContext('fixate', {
        context: this,
        position: this.nuFixatePosition,
      });

      setTimeout(() => this.nuFixateChange(), 0);
    }
  };
}

['scroll', 'resize', 'wheel', 'touchmove', 'tap'].forEach(eventName => {
  window.addEventListener(eventName, onFixateChange, { passive: true });
});
