export default function transformMixin() {
  return {
    attributes: {
      transform: {
        '--nu-transform': 'translate(0, 0)',
      },
      place: {
        '--nu-transform-place': 'translate(0, 0)',
      },
    },
    shared: {
      transform: 'var(--nu-transform-place, translate(0, 0)) var(--nu-transform, translate(0, 0))',
    },
  };
}
