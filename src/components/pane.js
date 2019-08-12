import NuGrid from './grid';

export default class NuPane extends NuGrid {
  static get nuTag() {
    return 'nu-pane';
  }

  static nuCSS({ nuTag }) {
    return `
      ${nuTag}{
        grid-auto-flow: row;
        grid-template-rows: auto auto;
        align-content: stretch;
        justify-content: space-between;
        align-items: center;
        justify-items: center;
        grid-gap: .5rem;
        width: 100%;
      }
    `;
  }
}
