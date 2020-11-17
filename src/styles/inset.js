import shadowAttr from './shadow';

export default function insetAttr(val, defaults) {
  return shadowAttr(val, defaults, {
    inset: true,
    shadow: 'rgba(var(--local-shadow-color-rgb, var(--shadow-color-rgb)), 1)',
    specialShadow: 'rgba(var(--special-shadow-color-rgb), 1)',
    defaultValue: '.75em',
  });
}
