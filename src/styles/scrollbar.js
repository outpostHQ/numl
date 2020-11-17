const SCROLLBAR_SUPPORT = CSS.supports('scrollbar-width', 'thin');

export default function scrollbarAttr(val) {
  if (val == null) return null;

  if (val === 'none'.slice(0, Math.max(val.length, 1))) {
    return [{
      $suffix: '::-webkit-scrollbar',
      display: 'none',
    }].concat(SCROLLBAR_SUPPORT ? [{
      'scrollbar-width': 'none',
    }] : []);
  }

  return [
    {
      $suffix: ':not([special])',
      '--local-scrollbar-thumb-color': 'var(--scrollbar-thumb-color, rgba(var(--text-color-rgb), .5))',
      '--local-scrollbar-border-color': 'var(--scrollbar-border-color, var(--border-width))',
      '--local-scrollbar-bg-color': 'var(--scrollbar-bg-color, var(--diff-color, var(--local-bg-color)))',
    },
    {
      $suffix: '[special]',
      '--local-scrollbar-thumb-color': 'var(--scrollbar-thumb-color, rgba(var(--white-color-rgb), .6))',
      '--local-scrollbar-border-color': 'var(--scrollbar-border-color, rgba(var(--dark-color-rgb), .8))',
      '--local-scrollbar-bg-color': 'var(--scrollbar-bg-color, var(--dark-color))',
    },
    {
      $suffix: '::-webkit-scrollbar',
      width: 'var(--gap)',
      height: 'var(--gap)',
    },
    {
      $suffix: '::-webkit-scrollbar-track',
      'background-color': 'var(--local-scrollbar-bg-color)',
    },
    {
      $suffix: '::-webkit-scrollbar-thumb',
      'background-color': 'var(--local-scrollbar-thumb-color)',
      'border-radius': 'var(--radius)',
      border: 'var(--border-width) solid var(--local-scrollbar-border-color)',
    },
    {
      $suffix: '::-webkit-scrollbar-corner',
      'background-color': 'transparent',
    }
  ].concat(SCROLLBAR_SUPPORT ? [{
    'scrollbar-width': 'thin',
    'scrollbar-color': 'var(--local-scrollbar-bg-color) var(--local-scrollbar-thumb-color)',
  }] : []);
}
