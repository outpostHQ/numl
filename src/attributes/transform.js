export default function transformAttr(val) {
  return val ? {
    '--nu-local-transform': val,
    'transform': 'var(--nu-abs-transform, translate(0, 0)) var(--nu-local-transform, translate(0, 0))',
  } : null;
}
