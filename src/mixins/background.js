export default function backgroundMixin() {
  return {
    fallbacks: {
      fill: {
        '--nu-background-color': 'transparent',
      },
      image: {},
    },
    shared: {
      'background-color': 'var(--nu-background-color)',
    },
  };
}
