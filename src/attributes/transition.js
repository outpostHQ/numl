export default function transitionAttr(val) {
  if (val == null) return;

  val = val.split(',').map(s => `${s} var(--nu-animation-time) linear`).join(',');

  return { transition: val };
}
