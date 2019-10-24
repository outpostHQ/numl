export default function shadowMixin() {
  return {
    attributes: {
      shadow: {
        '--nu-depth-shadow': '0 0 0 0 rgba(0, 0, 0, 0)',
      },
      border: {
        '--nu-stroke-shadow': '0 0 0 0 rgba(0, 0, 0, 0), inset 0 0 0 0 rgba(0, 0, 0, 0)',
      },
    },
    shared: {
      'box-shadow': 'var(--nu-stroke-shadow), var(--nu-depth-shadow)',
    },
  };
}
