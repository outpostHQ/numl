import Behavior from './behavior';
import { deepQueryAll } from '../helpers';

export default class MenuBehavior extends Behavior {
  init() {
    this.setContext('menu', this, true);
    this.items = [];

    this.on('keydown', this.onKeyDown.bind(this));
  }

  addItem(item) {
    if (!this.items.includes(item)) {
      this.items.push(item);

      if (this.items.length === 1) {
        this.setCurrent(item);
      }
    }
  }

  removeItem(item) {
    const items = this.items;

    if (items.includes(item)) {
      items.splice(items.indexOf(item), 1);
      this.setCurrent(items[0]);
    }
  }

  setCurrent(item) {
    const currentItem = this.currentItem;
    const isCurrentFocused = currentItem ? currentItem.host === document.activeElement : false;

    if (currentItem) {
      currentItem.host.blur();
    }

    if (item) {
      this.currentItem = item;
      this.items.map(it => {
        const isCurrent = it === item;
        const type = isCurrent ? 'auto' : 'manual';

        it.nu('focusable')
          .then(Focusable => {
            Focusable.set(type);

            if (isCurrent && isCurrentFocused) {
              it.host.focus();
              Focusable.setEffect(true);

              const Act = it.host.nuButton;

              if (Act && Act.isRadio()) {
                Act.set(true);
              }
            }
          });
      });
    } else {
      this.currentItem = null;
    }
  }

  getItemsInOrder(selector, prop) {
    const elements = deepQueryAll(this.host, selector || '[nu-menuitem]');
    return (elements || [])
      .map(element => element[prop || 'nuMenuItem'])
      .filter(item => this.items.includes(item));
  }

  onKeyDown(event) {
    const items = this.getItemsInOrder();

    const index = items.indexOf(this.currentItem);

    switch(event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if (index < items.length - 1) {
          this.setCurrent(items[index + 1]);
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (index > 0) {
          this.setCurrent(items[index - 1]);
        }
        break;
      case 'Home':
        this.setCurrent(items[0]);
        break;
      case 'End':
        this.setCurrent(items[items.length - 1]);
        break;
      default:
        return;
    }

    event.stopPropagation();
    event.preventDefault();
  }
}
