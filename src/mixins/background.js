export default function backgroundMixin() {
  return {
    attributes: {
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
