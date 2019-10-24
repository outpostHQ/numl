export default function transformAttr(val, defaults) {
  if (!val) return;

  const hasPlaceAttr = !!defaults.place;

  if (hasPlaceAttr) {
    return [{
      '--nu-transform': val,
    }];
  } else {
    return [{
      $suffix: ':not([place])',
      'transform': val,
    }, {
      $suffix: '[place]',
      '--nu-transform': val,
    }]
  }
}
