import outlineAttr from '../../src/styles/outline';
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
  'box-shadow': 'var(--local-outline-shadow)',
  // Activate transition only if transition and focusable effects are globally enabled
  transition: 'box-shadow calc(var(--transition-enabler) * var(--transition)) linear',
  'z-index': '9',
};

checkGenerator('outline', outlineAttr, {
  '': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(1 * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--local-outline-color": "var(--outline-color)"
    },
  ],
  'n': [DISABLE_STYLES],
  'y': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(1 * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--local-outline-color": "var(--outline-color)"
    },
  ],
  '1x': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(1 * (1 - var(--focus-disabler, 0)) * var(--gap)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--local-outline-color": "var(--outline-color)"
    },
  ],
  '#special': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(1 * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--local-outline-color": "var(--special-color)"
    },
  ],
  'inset': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, inset 0 0) 0 calc(1 * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      "--local-outline-color": "var(--outline-color)"
    },
  ],
  'focus': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(1 * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '',
      $suffix: '[is-focus]',
      "--local-outline-color": "var(--outline-color)"
    },
  ],
  'focus-inside': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(1 * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '',
      $suffix: ':focus-within',
      "--local-outline-color": "var(--outline-color)"
    },
    {
      $suffix: '>*',
      '--focus-disabler': '1',
    }
  ],
  'focus-outside': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(1 * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '[is-focus], :host([is-focus])',
      $suffix: '',
      "--local-outline-color": "var(--outline-color)"
    },
  ],
  'focus visible': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(var(--focus-enabler) * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '',
      $suffix: '[is-focus]',
      "--local-outline-color": "var(--outline-color)"
    },
  ],
  'focus-inside visible': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(var(--focus-enabler) * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '',
      $suffix: ':focus-within',
      "--local-outline-color": "var(--outline-color)"
    },
    {
      $suffix: '>*',
      '--focus-disabler': '1',
    }
  ],
  'focus-outside visible': [
    DISABLE_STYLES,
    {
      "--local-outline-color": "rgba(var(--outline-color-rgb), 0)",
      "--local-outline-shadow": "var(--local-outline-inset, 0 0) 0 calc(var(--focus-enabler) * (1 - var(--focus-disabler, 0)) * var(--outline-width)) var(--local-outline-color)"
    },
    OUTLINE_STYLES,
    {
      $prefix: '[is-focus], :host([is-focus])',
      $suffix: '',
      "--local-outline-color": "var(--outline-color)"
    },
  ],
});
