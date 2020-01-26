export default function focusableAttr(val) {
  const force = val === 'force';
  const focusable = val === 'y' || val === 'yes' || force;
  const $prefix = force ? '' : 'html.nu-focus-enabled ';

  return [
    {
      '--nu-local-focus-color': 'transparent',
      '--nu-local-focus-inset': '0 0',
      '--nu-local-focus-shadow': 'var(--nu-local-focus-inset) 0 calc(var(--nu-border-width) * 3) var(--nu-local-focus-color)',
      outline: 'none',
    }
  ].concat(focusable ? [
    {
      $prefix,
      $suffix: ':not([disabled])::before',
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      'pointer-events': 'none',
      'border-radius': 'var(--nu-local-radius, var(--nu-radius))',
      'box-shadow': 'var(--nu-local-focus-shadow)',
      transition: 'box-shadow var(--nu-animation-time) linear',
    },
    {
      $prefix,
      $suffix: ':not([disabled])[nu-focus]',
      'z-index': '9',
      '--nu-local-focus-color': 'var(--nu-focus-color)',
    },
  ] : []);
}
