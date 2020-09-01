import { hasNegativeMod, parseAttr } from '../helpers';
import { localProp, prop } from '../props-helpers';

const OUTLINE_STYLES = [
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
    'border-radius': localProp('radius'),
    'box-shadow': 'var(--nu-local-outline-shadow)',
    // Activate transition only if transition and focusable effects are globally enabled
    transition: 'box-shadow calc(var(--nu-transition-enabler) * var(--nu-focus-enabler) * var(--nu-transition)) linear',
    'z-index': '9',
  }
];
const SELECTOR = '[is-focus]';
const WITHIN_SELECTOR = ':focus-within';

export default function outlineAttr(val) {
  const { values, mods, color } = parseAttr(val, 2);

  // disable outline completely
  if (mods.includes('native')) {
    return;
  }

  /**
   * @type {Array<Object>}
   */
  const styles = [{ outline: 'none' }];

  // disable outline completely
  if (hasNegativeMod(mods)) {
    return styles;
  }

  const outlineSize = values[0] || prop('outline-width');
  const outlineColor = color || prop('outline-color');

  const inset = mods.includes('inset');
  const outside = mods.includes('focus-outside');
  const inside = !outside && mods.includes('focus-inside');
  const focus = mods.includes('focus') || outside || inside;
  const polite = mods.includes('visible') && focus;

  styles.push({
    '--nu-local-outline-color': 'transparent',
    '--nu-local-outline-shadow': `var(--nu-local-outline-inset, ${inset ? 'inset ' : ''}0 0) 0 calc(${!polite ? '1' : 'var(--nu-focus-enabler)'} * (1 - var(--nu-focus-disabler, 0)) * ${outlineSize}) var(--nu-local-outline-color)`,
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
      '--nu-local-outline-color': outlineColor,
    });

    if (inside) {
      styles.push({
        $suffix: '>*',
        '--nu-focus-disabler': '1',
      });
    }
  } else {
    styles.push({
      '--nu-local-outline-color': outlineColor,
    });
  }

  return styles;
}
