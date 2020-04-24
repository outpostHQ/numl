export default function focusAttr(val) {
  const mods = val.split(/\s/);
  const force = mods.includes('force');
  const inset = mods.includes('inset');
  const outside = mods.includes('outside');
  const focusable = mods.includes('y') || mods.includes('yes') || force || inset || outside;

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
      // Activate transition only if transition and focusable effects are globally enabled
      transition: 'box-shadow calc(var(--nu-transition-enabler) * var(--nu-focus-enabler) * var(--nu-transition-time)) linear',
      'z-index': '9',
    },
    {
      $prefix: outside ? '[nu-focus]:not([disabled]), :host([nu-focus]:not([disabled]))' : '',
      $suffix: outside ? '' : '[nu-focus]',
      '--nu-local-focus-color': 'var(--nu-focus-color)',
    },
    {
      $prefix: outside ? '[nu-focus]:not([disabled]), :host([nu-focus]:not([disabled]))' : '',
      $suffix: `${outside ? '' : '[nu-focus]'}::before`,
    },
  ] : []);
}
