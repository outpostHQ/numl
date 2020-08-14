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
      '--nu-local-scrollbar-thumb-color': 'var(--nu-scrollbar-thumb-color, rgba(var(--nu-text-color-rgb), .5)))',
      '--nu-local-scrollbar-border-color': 'var(--nu-scrollbar-border-color, var(--nu-border-width))',
      '--nu-local-scrollbar-bg-color': 'var(--nu-scrollbar-bg-color, var(--nu-local-bg-color, var(--nu-subtle-color)))',
    },
    {
      $suffix: '[special]',
      '--nu-local-scrollbar-thumb-color': 'var(--nu-scrollbar-thumb-color, rgba(var(--nu-white-color-rgb), .6))',
      '--nu-local-scrollbar-border-color': 'var(--nu-scrollbar-border-color, rgba(var(--nu-dark-color-rgb), .8))',
      '--nu-local-scrollbar-bg-color': 'var(--nu-scrollbar-bg-color, var(--nu-dark-color))',
    },
    {
      $suffix: '::-webkit-scrollbar',
      width: 'var(--nu-gap)',
      height: 'var(--nu-gap)',
    },
    {
      $suffix: '::-webkit-scrollbar-track',
      'background-color': 'var(--nu-local-scrollbar-bg-color)',
    },
    {
      $suffix: '::-webkit-scrollbar-thumb',
      'background-color': 'var(--nu-local-scrollbar-thumb-color)',
      'border-radius': 'var(--nu-radius)',
      border: 'var(--nu-border-width) solid var(--nu-local-scrollbar-border-color)',
    },
    {
      $suffix: '::-webkit-scrollbar-corner',
      'background-color': 'transparent',
    }
  ].concat(SCROLLBAR_SUPPORT ? [{
    'scrollbar-width': 'thin',
    'scrollbar-color': 'var(--nu-local-scrollbar-bg-color) var(--nu-local-scrollbar-thumb-color)',
  }] : []);
}
