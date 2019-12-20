export default function scrollbarAttr(val) {
  if (val == null) return null;

  return [
    {
      $suffix: '::-webkit-scrollbar',
      width: 'var(--nu-padding)',
    },
    {
      $suffix: '::-webkit-scrollbar-track',
      'background-color': 'var(--nu-subtle-color)',
    },
    {
      $suffix: '::-webkit-scrollbar-thumb',
      'background-color': 'var(--nu-border-color)',
      'border-radius': 'var(--nu-border-radius)',
      border: 'calc(var(--nu-border-width) * 2) solid var(--nu-subtle-color)',
    },
    {
      'scrollbar-width': val || 'thin',
      'scrollbar-color': 'var(--nu-subtle-color) var(--nu-border-color)',
    },
  ];
}
