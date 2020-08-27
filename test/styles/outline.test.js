import outlineAttr from '../../src/attributes/outline';
import { checkGenerator } from '../utils';
import { localProp } from '../../src/props-helpers';

const DISABLE_STYLES = {
  outline: 'none',
};
const OUTLINE_STYLES = {
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
};

checkGenerator('outline', outlineAttr, {
  '': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(1 * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
  ],
  'n': [DISABLE_STYLES],
  'y': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(1 * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
  ],
  '1x': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(1 * (1 - var(--nu-focus-disabler, 0)) * var(--nu-gap)) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
  ],
  '#special': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(1 * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--nu-local-outline-color": "var(--nu-special-color, var(--special-color))"
    },
  ],
  'inset': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, inset 0 0) 0 calc(1 * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
  ],
  'focus': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(1 * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '',
      $suffix: '[is-focus]',
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
  ],
  'focus-inside': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(1 * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '',
      $suffix: ':focus-within',
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
    {
      $suffix: '>*',
      '--nu-focus-disabler': '1',
    }
  ],
  'focus-outside': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(1 * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '[is-focus], :host([is-focus])',
      $suffix: '',
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
  ],
  'focus visible': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(var(--nu-focus-enabler) * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '',
      $suffix: '[is-focus]',
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
  ],
  'focus-inside visible': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(var(--nu-focus-enabler) * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '',
      $suffix: ':focus-within',
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
    {
      $suffix: '>*',
      '--nu-focus-disabler': '1',
    }
  ],
  'focus-outside visible': [
    DISABLE_STYLES,
    {
      "--nu-local-outline-color": "transparent",
      "--nu-local-outline-shadow": "var(--nu-local-outline-inset, 0 0) 0 calc(var(--nu-focus-enabler) * (1 - var(--nu-focus-disabler, 0)) * var(--nu-outline-width, var(--outline-width))) var(--nu-local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '[is-focus], :host([is-focus])',
      $suffix: '',
      "--nu-local-outline-color": "var(--nu-outline-color, var(--outline-color))"
    },
  ],
});
