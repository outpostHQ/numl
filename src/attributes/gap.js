import { convertUnit } from '../helpers';

/**
 * CSS Gap value. Used for flex and grid layouts.
 * @param val
 * @returns {*}
 */
export default function gapAttr(val, defaults) {
  if (val == null) return;

  val = convertUnit(val || '1x', 'var(--nu-theme-padding)');

  const isFlexByDefault = defaults.display.endsWith('flex');
  const isGridByDefault = defaults.display.endsWith('grid');

  const arr = [{
    $suffix: '[display$="grid"]',
    'grid-gap': val,
  }, {
    $suffix: `[display$="flex"]>*`,
    '--nu-flex-gap': val,
  }];

  if (isGridByDefault) {
    arr.push({
      $suffix: ':not([display])',
      'grid-gap': val,
    });
  }

  if (isFlexByDefault) {
    arr.push({
      $suffix: `:not([display])>*`,
      '--nu-flex-gap': val,
    });
  }

  return arr;
}
