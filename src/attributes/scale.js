export default function scaleAttr(val) {
  if (!val) return;

  switch (val) {
    case 'flip':
      val = '-1 -1';
      break;
    case 'flip-x':
      val = '-1 1';
      break;
    case 'flip-y':
      val = '1 -1';
      break;
  }

  val = val.split(/\s+/g).join(', ');

  return {
    $suffix: ':not([transform]):not([rotate]):not([move])',
    '--nu-transform': `scale(${val})`,
    transform: 'var(--nu-transform-place, translate(0, 0)) var(--nu-transform)',
  };
}
