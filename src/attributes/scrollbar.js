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
      $suffix: '::-webkit-scrollbar',
      width: 'var(--nu-gap)',
      height: 'var(--nu-gap)',
    },
    {
      $suffix: '::-webkit-scrollbar-track',
      'background-color': 'var(--nu-local-bg-color, var(--nu-subtle-color))',
    },
    {
      $suffix: '::-webkit-scrollbar-thumb',
      'background-color': 'rgba(var(--nu-text-color-rgb), .5)',
      'border-radius': 'var(--nu-radius)',
      border: 'var(--nu-border-width) solid var(--nu-subtle-color)',
    },
    {
      $suffix: '::-webkit-scrollbar-corner',
      'background-color': 'transparent',
    }
  ].concat(SCROLLBAR_SUPPORT ? [{
    'scrollbar-width': 'thin',
    'scrollbar-color': 'var(--nu-subtle-color) rgba(var(--nu-text-color-rgb), .5)',
  }] : []);
}
