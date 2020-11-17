export default function BackgroundCombinator() {
  return {
    attrs: ['fill', 'image'],
    generator(attrs) {
      if (!attrs.length) return;

      const styles = {
        'background-color': 'var(--local-bg-color)'
      };

      if (!attrs.includes('fill')) {
        styles['background-color'] = 'transparent';
      } else if (attrs.includes('image')) {
        styles['background-color'] = 'var(--local-bg-color, var(--bg-color))';
      }

      return styles;
    },
  };
}
