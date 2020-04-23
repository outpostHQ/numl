import { error } from '../helpers';
import { injectStyleTag } from '../css';
import WidgetBehavior from './widget';

export default class ConverterBehavior extends WidgetBehavior {
  static get converter() {}

  connected() {
    super.connected();
    setTimeout(() => this.initConverter());
  }

  initConverter() {
    if (this.ref) return;

    console.log('!', this.ref);

    const { $host } = this;
    const ref = this.ref = $host.querySelector('textarea, pre');

    const useShadow = $host.nuContext.useShadow;

    if (useShadow) {
      $host.attachShadow({ mode: 'open' });
    }

    if (!ref) {
      error('converter: textarea tag required', this.$host);
      return;
    }

    $host.nuRef = ref;

    ref.setAttribute('role', 'none');
    ref.setAttribute('aria-hidden', 'true');

    const container = this.createContainer();

    ($host.nuShadow || $host).appendChild(container);

    if ($host.nuShadow) {
      const shadowCSS = $host.constructor.nuShadowCSS();

      if (shadowCSS) {
        injectStyleTag(
          shadowCSS,
          `shadow:${$host.constructor.nuTag}`,
          $host.nuShadow,
        );
      }
    }

    const observe = this.createObserveListener(ref, container, this.constructor.converter);

    const observer = new MutationObserver(() => observe());

    observer.observe(ref, {
      characterData: false,
      attributes: false,
      childList: true,
      subtree: false
    });

    observe();
  }

  createContainer() {
    return document.createElement('nu-block');
  }

  createObserveListener(ref, container, converter) {
    return () => {
      const content = this.prepareContent(ref.tagName === 'TEXTAREA'
        ? ref.textContent
        : ref.innerHTML);

      this.apply(container, content, converter);
    }
  }

  apply(container, content, converter) {}

  prepareContent(content) {
    return content || '';
  }
}
