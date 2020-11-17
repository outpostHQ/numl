export default function transformAttr(val) {
  if (!val) return [{
    '--transform': 'translate(0, 0)',
  }];

  return [{
    '--transform': val,
  }];
}
