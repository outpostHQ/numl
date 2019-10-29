export default function transformMixin() {
  return {
    fallbacks: {
      transform: {
        // it's a hack to reset property
        // without activating child's style
        // '--nu-transform-place': '-',
        transform: 'var(--nu-transform-place)',
      },
      place: {
        // it's a hack to reset property
        // without activating child's style
        // '--nu-transform': '-',
        transform: 'var(--nu-transform)',
      },
    },
    shared: {
      transform: 'var(--nu-transform-place, translate(0, 0)) var(--nu-transform, translate(0, 0))',
    },
  };
}
