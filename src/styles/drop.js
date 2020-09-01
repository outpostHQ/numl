// Don't work without Fixate Mixin!

import { FIXATE_ATTR } from '../behaviors/fixate';
import { PLACE_ATTR } from './place';

export default function dropAttr(val, defaults) {
  return [{
    $suffix: defaults.place ? `[${FIXATE_ATTR}]` : `:not([${PLACE_ATTR}])`,
    position: 'fixed',
    top: 'var(--nu-fixate-top, initial)',
    right: 'var(--nu-fixate-right, initial)',
    bottom: 'var(--nu-fixate-bottom, initial)',
    left: 'var(--nu-fixate-left, initial)',
  }];
}
