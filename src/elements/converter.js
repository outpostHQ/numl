import NuElement from './element';
import { error } from '../helpers';
import { injectStyleTag } from '../css';

export default class NuConverter extends NuElement {
  static get nuTag() {
    return 'nu-abstract-converter';
  }

  static get nuDefaults() {
    return {
      display: 'block',
    };
  }

  static get nuConverter() {}

  static nuPrepareContent(content) {
    return content;
  }

  nuConnected() {
    super.nuConnected();

    if (this.hasAttribute('shadow-root')) {
      this.attachShadow();
    }

    setTimeout(() => {
      if (this.nuRef) return;

      const nuRef = this.querySelector('textarea, pre');

      if (!nuRef) {
        error('nu-snippet: textarea tag required');
        return;
      }

      this.nuRef = nuRef;

      nuRef.setAttribute('role', 'none');
      nuRef.setAttribute('aria-hidden', 'true');

      const container = this.nuGetContainer();

      (this.nuShadow || this).appendChild(container);

      if (this.nuShadow) {
        const shadowCSS = this.constructor.nuShadowCSS();

        console.log('!!', shadowCSS);

        if (shadowCSS) {
          injectStyleTag(
            shadowCSS,
            `shadow:${this.constructor.nuTag}`,
            this.nuShadow,
          );
        }
      }

      this.nuObserve = async () => {
        const content = nuRef.tagName === 'TEXTAREA' ? nuRef.textContent : nuRef.innerHTML;

        const converter = await this.constructor.nuConverter.then(module => module.default || module);

        this.nuApply(container, content, converter);
      };

      const observer = new MutationObserver(() => this.nuObserve());

      observer.observe(nuRef, {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: false
      });

      this.nuObserve();
    });
  }

  nuApply(container, content, converter) {}

  nuGetContainer() {
    return document.createElement('nu-block');
  }
}
