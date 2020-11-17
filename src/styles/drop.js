// Don't work without Fixate Mixin!

import { FIXATE_ATTR } from '../behaviors/fixate';
import { PLACE_ATTR } from './place';

export default function dropAttr(val, defaults) {
  return [{
    $suffix: defaults.place ? `[${FIXATE_ATTR}]` : `:not([${PLACE_ATTR}])`,
    position: 'fixed',
    top: 'var(--fixate-top, initial)',
    right: 'var(--fixate-right, initial)',
    bottom: 'var(--fixate-bottom, initial)',
    left: 'var(--fixate-left, initial)',
  }];
}
