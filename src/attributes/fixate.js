export default function fixateAttr() {
  return [{
    $suffix: ':not([place])',
    position: 'fixed',
    top: 'var(--nu-fixate-top, 0)',
    right: 'var(--nu-fixate-right, 0)',
    bottom: 'var(--nu-fixate-bottom, 0)',
    left: 'var(--nu-fixate-left, 0)',
  }, {
    $suffix: ':not([width]):not([place])',
    width: 'var(--nu-fixate-width)',
  }];
}
