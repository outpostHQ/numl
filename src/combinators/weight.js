export default function WeightCombinator() {
  return {
    attrs: ['level', 'text'],
    generator(attrs, allAttrs) {
      if (!attrs.length) return;

      return {
        'font-weight': 'var(--nu-font-weight)',
        '--nu-font-weight': allAttrs.reduce((value, attr) => {
          if (attrs.includes(attr)) {
            value = `var(--nu-${attr}-font-weight, ${value})`;
          }

          return value;
        }, 'inherit'),
      };
    },
  };
}
