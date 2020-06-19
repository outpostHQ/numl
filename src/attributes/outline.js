import { hasNoMod } from '../helpers';

const OUTLINE_STYLES = [
  {
    $suffix: '[is-pressed]:not([disabled])::before',
    opacity: '.5',
  },
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
  }
];
const SELECTOR = '[is-focus]';
const WITHIN_SELECTOR = ':focus-within';

export default function outlineAttr(val) {
  const mods = val.split(/\s+/g);

  // disable outline completely
  if (mods.includes('native')) {
    return;
  }

  /**
   * @type {Array<Object>}
   */
  const styles = [{ outline: 'none' }];

  // disable outline completely
  if (hasNoMod(mods)) {
    return styles;
  }

  const inset = mods.includes('inset');
  const outside = mods.includes('focus-outside');
  const inside = !outside && mods.includes('focus-inside');
  const focus = mods.includes('focus') || outside || inside;
  const polite = !mods.includes('intrusive') && focus;

  styles.push({
    '--nu-local-focus-color': 'transparent',
    '--nu-local-focus-shadow': `var(--nu-local-focus-inset, ${inset ? 'inset ' : ''}0 0) 0 calc(${!polite ? '1' : 'var(--nu-focus-enabler)'} * (1 - var(--nu-focus-disabler, 0)) * var(--nu-focus-width, var(--nu-selected-width))) var(--nu-local-focus-color)`,
  });

  // hide outline (if you need transition)
  if (mods.includes('hidden')) {
    return styles;
  }

  styles.push(...OUTLINE_STYLES);

  if (focus) {
    styles.push({
      $prefix: outside ? `${SELECTOR}, :host(${SELECTOR})` : '',
      $suffix: `${outside ? '' : (inside ? WITHIN_SELECTOR : SELECTOR)}`,
      '--nu-local-focus-color': 'var(--nu-focus-color)',
    });

    if (inside) {
      styles.push({
        $suffix: '>*',
        '--nu-focus-disabler': '1',
      });
    }
  } else {
    styles.push({
      '--nu-local-focus-color': 'var(--nu-focus-color)',
    });
  }

  return styles;
}
