export default function fontAttr(val) {
  if (val.includes(' ') && !val.includes('\'')) {
    val = `'${val}'`;
  }

  return {
    'font-family': 'var(--font)',
    '--font': `${val ? `${val}, ` : ''}var(--system-font)`,
  };
}
