import Nude from '../nude';

class NuResponsive extends HTMLElement {
  static get nuTag() {
    return 'nu-responsive';
  }

  connectedCallback() {
    const rootStyle = document.documentElement.style;
    const points = [];

    let min = 99999;
    let max = 0;

    for (let attr of this.attributes) {
      const value = Number(attr.value);
      const name = attr.name;
      min = Math.min(value, min);
      max = Math.max(value, max);

      rootStyle.setProperty(`--${name}-width`, `${value}px`);

      points.push({ value, name });
    }

    rootStyle.setProperty(`--min-width`, `${min}px`);
    rootStyle.setProperty(`--max-width`, `${max}px`);

    this.parentNode.removeChild(this);

    Nude.responsive.setPoints(points);
  }
}

export default NuResponsive;
