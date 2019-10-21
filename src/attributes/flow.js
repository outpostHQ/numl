export const FLEX_MAP = {
  row: 'margin-right',
  column: 'margin-bottom',
  'row-reverse': 'margin-left',
  'column-reverse': 'margin-top'
};

/**
 * CSS Flow value. Used for flex and grid layouts.
 * @param val
 * @param defaults
 * @returns {*[]}
 */
export default function flowAttr(val, defaults) {
  if (!val) return;

  const flexValue = `${val} nowrap`;
  const isFlexByDefault = defaults.display.endsWith('flex');
  const isGridByDefault = defaults.display.endsWith('grid');
  const isGridValue = CSS.supports('grid-auto-flow', val);
  const isFlexValue = CSS.supports('flex-flow', flexValue);

  const dirStyle = FLEX_MAP[val];
  const arr = [];

  if (isGridByDefault) {
    arr.push({
      $suffix: ':not([display])',
      'grid-auto-flow': val,
    });
  } else if (isFlexByDefault) {
    arr.push({
      $suffix: ':not([display])',
      'flex-flow': flexValue,
    }, {
      $suffix: `:not([display])>:not(:last-child)`,
      [dirStyle]: 'var(--nu-flex-gap)',
    });
  } else {
    arr.push({
      $suffix: `:not([display])>:not(:last-child)`,
      'margin-bottom': 'var(--nu-flex-gap)',
    });
  }

  if (isGridValue) {
    arr.push({
      $suffix: '[display$="grid"]',
      'grid-auto-flow': val,
    });
  }

  if (isFlexValue) {
    arr.push({
      $suffix: '[display$="flex"]',
      'flex-flow': flexValue,
    }, {
      $suffix: `[display$="flex"]>:not(:last-child)`,
      [dirStyle]: 'var(--nu-flex-gap)',
    });
  }

  return arr;
}
