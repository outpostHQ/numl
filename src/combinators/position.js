export default function PositionCombinator() {
  return {
    attrs: ['place', 'box'],
    generator(attrs) {
      if (!attrs.length) return;

      const position = attrs.length === 1
        ? `var(--nu-${attrs[0]}-position)`
        : `var(--nu-place-position, var(--nu-box-position, static))`;

      return { position };
    },
  };
}
