export function transformMixin() {
  return {
    transform: 'var(--nu-transform-place, translate(0, 0)) var(--nu-transform, translate(0, 0))',
  };
}
