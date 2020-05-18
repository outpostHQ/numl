export default function focusAttr(val) {
  const mods = val.split(/\s/);
  const input = mods.includes('input');
  const inset = mods.includes('inset');
  const outside = mods.includes('outside');
  const inside = !outside && mods.includes('inside');
  const focusable = mods.includes('y') || mods.includes('yes') || input || inset || outside || inside;

  return [
    {
      '--nu-local-focus-color': 'transparent',
      '--nu-local-focus-shadow': `var(--nu-local-focus-inset, ${inset ? 'inset ' : ''}0 0) 0 calc(${input ? '1' : 'var(--nu-focus-enabler)'} * (1 - var(--nu-focus-disabler, 0)) * var(--nu-focus-width, calc(var(--nu-border-width) * 3))) var(--nu-local-focus-color)`,
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
      $prefix: outside ? '[is-focus]:not([disabled]), :host([is-focus]:not([disabled]))' : '',
      $suffix: `${outside ? '' : (inside ? ':focus-within' : '[is-focus]')}`,
      '--nu-local-focus-color': 'var(--nu-focus-color)',
    },
    {
      $prefix: outside ? '[is-focus]:not([disabled]), :host([is-focus]:not([disabled]))' : '',
      $suffix: `${outside ? '' : (inside ? ':focus-within' : '[is-focus]')}::before`,
    },
  ] : []).concat(inside ? [{
    $suffix: '>*',
    '--nu-focus-disabler': '1',
  }] : []);
}
