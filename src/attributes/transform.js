export default function transformAttr(val) {
  return val ? { 'transform': val } : null;
}
