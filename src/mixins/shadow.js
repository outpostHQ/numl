import { DEFAULT_STROKE_SHADOW } from '../attributes/border';

export default function shadowMixin() {
  return {
    fallbacks: {
      shadow: {
        // it's a hack to reset property
        // without activating child's style
        'box-shadow': 'var(--nu-stroke-shadow)',
      },
      border: {
        // it's a hack to reset property
        // without activating child's style
        'box-shadow': 'var(--nu-depth-shadow, 0 0 0 0 rgba(0, 0, 0, 0))',
      },
    },
    shared: {
      'box-shadow': `var(--nu-stroke-shadow, ${DEFAULT_STROKE_SHADOW}), var(--nu-depth-shadow, 0 0 0 0 rgba(0, 0, 0, 0))`,
    },
  };
}
