export default function showAttr(val) {
  if (val !== 'y' && val !== 'yes') {
    return { display: 'none !important' };
  }

  return null;
}
