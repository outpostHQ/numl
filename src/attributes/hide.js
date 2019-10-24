export default function hideAttr(val) {
  if (val === 'y' || val === 'yes' || val === '') {
    return { display: 'none !important' };
  }

  return null;
}
