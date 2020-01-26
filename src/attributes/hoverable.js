import { parseAttr } from '../helpers';

export default function hoverableAttr(val) {
  const { values, mods } = parseAttr(val, true);

  const size = values[0] || '0';
  const inactiveSize = values[1] || size;

  const styles = [{
    '--nu-local-hover-shadow': `0 0 0 ${inactiveSize} transparent, 0 0 0 9999rem transparent inset`,
  }];

  if (!mods.includes('n') && !mods.includes('no')) {
    styles[0].$suffix = 'not(:hover)';
    styles.push({
      $suffix: ':hover',
      '--nu-local-hover-shadow': `0 0 0 ${size} var(--nu-hover-color), 0 0 0 9999rem var(--nu-hover-color) inset`,
    });
  }

  return styles;
};
