export default function focusableAttr(val) {
  const mods = val.split(/\s/);
  const force = mods.includes('force');
  const inset = mods.includes('inset');
  const focusable = mods.includes('y') || mods.includes('yes') || force || inset;

  return [
    {
      '--nu-local-focus-color': 'transparent',
      '--nu-local-focus-shadow': `var(--nu-local-focus-inset, ${inset ? 'inset ' : ''}0 0) 0 calc(${force ? '1' : 'var(--nu-focus-enabler)'} * var(--nu-focus-width, calc(var(--nu-border-width) * 3))) var(--nu-local-focus-color)`,
      outline: 'none',
    }
  ].concat(focusable ? [
    {
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
      transition: 'box-shadow var(--nu-transition-time) linear',
    },
    {
      $suffix: ':not([disabled])[nu-focus]',
      '--nu-local-focus-color': 'var(--nu-focus-color)',
    },
    {
      $suffix: ':not([disabled])[nu-focus]::before',
      'z-index': '9',
    },
  ] : []);
}
