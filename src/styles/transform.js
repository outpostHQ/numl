export default function transformAttr(val) {
  if (!val) return [{
    '--nu-transform': 'translate(0, 0)',
  }];

  return [{
    '--nu-transform': val,
  }];
}
