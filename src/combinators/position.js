export default function ShadowCombinator() {
  return {
    attrs: ['mark', 'box', 'place'],
    generator(attrs, allAttrs) {
      if (!attrs.length) return;

      let position = '';

      allAttrs.forEach((attr) => {
        if (!attrs.includes(attr)) return;

        if (attr === 'mark') {
          position = 'relative';
        } else {
          position = `var(--nu-${attr}-position${position ? `, ${position}` : ''})`;
        }
      });

      return { position };
    },
  };
}
