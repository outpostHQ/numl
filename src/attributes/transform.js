export default function transformAttr(val) {
  if (!val) return;

  return [{
    '--nu-transform': val,
  }];
}
