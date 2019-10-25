export default function backgroundMixin() {
  return {
    fallbacks: {
      background: {
        '--nu-background-color': 'transparent',
      },
      image: {},
    },
    shared: {
      'background-color': 'var(--nu-background-color)',
    },
  };
}
