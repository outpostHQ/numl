import './card.css';
import NuGrid from '../grid';

export default class NuCard extends NuGrid {
  static get nuTag() {
    return 'card';
  }

  nuUpdateTheme(theme) {
    super.nuUpdateTheme(theme);

    const nuTheme = this.nuTheme;

    if (nuTheme) {
      this.nuSetMod('inverted', nuTheme.invert);
    }
  }
}
