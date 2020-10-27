export default function fontAttr(val) {
  if (val.includes(' ') && !val.includes('\'')) {
    val = `'${val}'`;
  }

  return {
    'font-family': 'var(--nu-font)',
    '--nu-font': `${val ? `${val}, ` : ''}var(--nu-system-font)`,
  };
}
