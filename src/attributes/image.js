export default function imageAttr(val) {
  return {
    'background': val,
    'background-color': 'var(--nu-background-color, var(--nu-theme-background-color))',
  };
}
