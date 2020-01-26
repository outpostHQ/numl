// Don't work without Fixate Mixin!

export default function dropAttr() {
  return [{
    $suffix: ':not([place])',
    position: 'fixed',
    top: 'var(--nu-fixate-top, initial)',
    right: 'var(--nu-fixate-right, initial)',
    bottom: 'var(--nu-fixate-bottom, initial)',
    left: 'var(--nu-fixate-left, initial)',
  }];
}
