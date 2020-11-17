export default function WeightCombinator() {
  return {
    attrs: ['level', 'text'],
    generator(attrs, allAttrs, defaults) {
      if (!attrs.length) return;

      if (defaults.text && (defaults.text.includes('lighter') || defaults.text.includes('bolder'))) return;

      return {
        $suffix: ':not([text*="lighter"]):not([text*="bolder"])',
        'font-weight': 'var(--font-weight)',
        '--font-weight': allAttrs.reduce((value, attr) => {
          if (attrs.includes(attr)) {
            value = `var(--${attr}-font-weight, ${value})`;
          }

          return value;
        }, 'inherit'),
      };
    },
  };
}
