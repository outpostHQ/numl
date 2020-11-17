import { hasNegativeMod, parseAttr } from '../helpers';

export default function markAttr(val) {
  const { values, mods, color } = parseAttr(val, 1);

  const size = values[0] || '0';

  /**
   * @type {Array<Object>}
   */
  const styles = [{
    '--local-mark-shadow': `0 0 0 0 transparent, 0 0 0 9999rem transparent inset`,
  }];

  const markColor = color || 'var(--local-mark-color, var(--mark-color))';
  const hover = mods.includes('hover');

  if (!hasNegativeMod(mods)) {
    styles.push({
      '--local-mark-shadow': `0 0 0 ${size} ${markColor}, 0 0 0 9999rem ${markColor} inset`,
    });

    if (hover) {
      styles[0].$suffix = ':not([is-hover])';
      styles[1].$suffix = '[is-hover]';
    }
  }

  return styles;
};
