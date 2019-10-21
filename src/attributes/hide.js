export default function hideAttr(val) {
  if (val !== 'y' && val !== 'yes' && val !== '') return null;

  return { display: 'none !important' };
}
