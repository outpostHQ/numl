import { hasNoMod, parseAttr } from '../helpers';

export default function highlightAttr(val) {
  const { values, mods, color } = parseAttr(val, 1);

  const size = values[0] || '0';

  /**
   * @type {Array<Object>}
   */
  const styles = [{
    '--nu-local-highlight-shadow': `0 0 0 0 transparent, 0 0 0 9999rem transparent inset`,
  }];

  const highlightColor = color || 'var(--nu-local-mark-color, var(--nu-mark-color))';
  const hover = mods.includes('hover');

  if (!hasNoMod(mods)) {
    styles.push({
      '--nu-local-highlight-shadow': `0 0 0 ${size} ${highlightColor}, 0 0 0 9999rem ${highlightColor} inset`,
    });

    if (hover) {
      styles[0].$suffix = ':not(:hover)';
      styles[1].$suffix = ':hover';
    }
  }

  return styles;
};
