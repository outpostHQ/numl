export default {
  attrs: ['fill', 'image'],
  generator(attrs) {
    if (!attrs.length) return;

    const styles = {
      'background-color': 'var(--nu-local-bg-color)'
    };

    if (!attrs.includes('fill')) {
      styles['background-color'] = 'transparent';
    } else if (attrs.includes('image')) {
      styles['background-color'] = 'var(--nu-local-bg-color, var(--nu-bg-color))';
    }

    return styles;
  },
};
