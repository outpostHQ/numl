import { parseAttr, stripCalc } from '../helpers';

export default function hoverableAttr(val, defaults) {
  const { values, mods } = parseAttr(val, true);

  if (!mods.includes('y') && !mods.includes('yes') && !values.length) return;

  let size = values[0] || '0';
  let radius = values[1] || 'var(--nu-local-border-radius)';

  if (size !== '0') {
    size = `calc(-1 * ${stripCalc(size)})`;
  }

  return (defaults.z == null ? [{
    $suffix: ':not([z])',
    'z-index': '0',
  }] : [])
  .concat([{
    $suffix: ':not([disabled])::after',
    content: '""',
    display: 'block',
    position: 'absolute',
    top: size,
    right: size,
    bottom: size,
    left: size,
    'z-index': '-1',
    'border-radius': radius,
    'background-color': 'transparent',
    transition: 'background-color var(--nu-animation-time) linear',
  }, {
    $suffix: ':not([disabled]):hover::after',
    'background-color': 'var(--nu-hover-color)',
  }]);
};
