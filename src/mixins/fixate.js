import { devMode, DIRECTIONS, warn } from '../helpers';

const LISTENERS = new Set;

function onFixateChange() {
  LISTENERS.forEach(listener => {
    listener();
  });
}

function getOffset(el, rect) {

}

export default function FixateMixin() {
  return {
    connected() {
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
          case 'top':
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
          case 'bottom':
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
          if (pos === 'top' || pos === 'bottom') {
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
        if (this.hasAttribute('place') || !this.hasAttribute('fixate')) return;

        this.nuFixateParent = this.parentNode;

        this.nuFixateChange();

        LISTENERS.add(this.nuFixateChange);
      };

      this.nuFixateEnd = () => {
        if (this.hasAttribute('place') || !this.hasAttribute('fixate')) return;

        LISTENERS.delete(this.nuFixateChange);
      };

      this.nuFixateChange();
    },
    disconnected() {
      this.nuFixateEnd();
    },
    changed(name, oldValue, value) {
      if (name !== 'fixate') return;

      if (value == null) {
        this.nuSetMod('fixate', false);
        this.nuSetContext('fixate', null);

        return;
      }

      this.nuSetMod('fixate', true);

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
