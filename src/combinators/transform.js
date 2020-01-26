export default function TransformCombinator() {
  return {
    attrs: ['transform', 'place', 'move', 'rotate', 'scale'],
    generator(attrs, allAttrs) {
      if (!attrs.length) return;

      return {
        transform: allAttrs.reduce((value, attr) => {
          if (attrs.includes(attr)) {
            value += `var(--nu-transform${attr === 'transform' ? '' : `-${attr}`}) `;
          }

          return value;
        }, ''),
      };
    },
  };
}
