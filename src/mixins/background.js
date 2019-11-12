export default function backgroundMixin() {
  return {
    fallbacks: {
      fill: {
        '--nu-local-bg-color': 'transparent',
      },
      image: {},
    },
    shared: {
      'background-color': 'var(--nu-local-bg-color)',
    },
  };
}
