import { devMode, DIRECTIONS, warn } from '../helpers';

const LISTENERS = new Set;

export const FIXATE_ATTR = 'drop';

function onFixateChange() {
  LISTENERS.forEach(listener => {
    listener();
  });
}

export default function FixateMixin() {
  return {
    connected() {
      if (!this.hasAttribute('place') && !this.hasAttribute(FIXATE_ATTR)) {
        this.setAttribute(FIXATE_ATTR, this.constructor.nuAllDefaults.drop || 'down');
      }

      if (!this.nuFixatePosition) {
        this.nuFixatePosition = 'bottom';
      }

      this.nuFixateChange = () => {
        if (!this.nuIsConnected) return;

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
            move = '0 0';
          } else {
            if (spos === 'top') {
              props.top = offsetY;
            } else {
              props.top = '';
              props.bottom = winHeight - offsetY - height;
            }
            move = '0 0';
          }
        }

        Object.entries(props)
          .forEach(([name, value]) => {
            value = value ? `${value}px` : '-';

            this.style.setProperty(`--nu-fixate-${name}`, value);
          });

        this.style.setProperty(`--nu-fixate-width`, `${width}px`);
        this.style.setProperty(`--nu-transform-place`, `translate(${move})`);
      };

      this.nuFixateStart = () => {
        if (this.hasAttribute('place') || !this.hasAttribute(FIXATE_ATTR)) return;

        this.nuFixateParent = this.parentNode;

        this.nuFixateChange();

        LISTENERS.add(this.nuFixateChange);
      };

      this.nuFixateEnd = () => {
        if (this.hasAttribute('place') || !this.hasAttribute(FIXATE_ATTR)) return;

        LISTENERS.delete(this.nuFixateChange);
      };

      this.nuFixateChange();
    },
    disconnected() {
      this.nuFixateEnd();
    },
    changed(name, oldValue, value) {
      if (name !== FIXATE_ATTR) return;

      if (value == null) {
        this.nuSetMod(FIXATE_ATTR, false);
        this.nuSetContext('fixate', null);

        return;
      }

      this.nuSetMod(FIXATE_ATTR, true);

      value = value.trim();

      // if (!DIRECTIONS.includes(value)) {
      //   if (devMode) {
      //     warn('fixate.mixin: wrong fixate value:', JSON.stringify(value));
      //   }
      //
      //   return;
      // }

      this.nuFixatePosition = value;
      this.nuSetContext('fixate', this);

      setTimeout(() => this.nuFixateChange(), 0);
    }
  };
}

window.addEventListener('scroll', onFixateChange);
window.addEventListener('resize', onFixateChange);
