import shadowAttr from './shadow';

export default function insetAttr(val, defaults) {
  return shadowAttr(val, defaults, {
    inset: true,
    active: true,
    shadow: 'rgba(var(--nu-shadow-color-rgb), 1)',
    specialShadow: 'rgba(var(--nu-special-shadow-color-rgb), 1)',
    defaultValue: '.75em',
  });
}
