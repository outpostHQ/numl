const SCROLLBAR_SUPPORT = CSS.supports('scrollbar-width', 'thin');

export default function scrollbarAttr(val) {
  if (val == null) return null;

  if (val === 'none' || val === 'no') {
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
      width: 'var(--nu-padding)',
      height: 'var(--nu-padding)',
    },
    {
      $suffix: '::-webkit-scrollbar-track',
      'background-color': 'var(--nu-subtle-color)',
    },
    {
      $suffix: '::-webkit-scrollbar-thumb',
      'background-color': 'rgba(var(--nu-text-color-rgb), .5)',
      'border-radius': 'var(--nu-border-radius)',
      border: 'var(--nu-border-width) solid var(--nu-subtle-color)',
    },
  ].concat(SCROLLBAR_SUPPORT ? [{
    'scrollbar-width': 'thin',
    'scrollbar-color': 'var(--nu-subtle-color) rgba(var(--nu-text-color-rgb), .5)',
  }] : []);
}
