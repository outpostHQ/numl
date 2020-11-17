import { extractMods } from '../helpers';
import { FLEX_GAP_SUPPORTED } from './gap';

const FLEX_MAP = {
  row: 'margin-right',
  column: 'margin-bottom',
  'row-reverse': 'margin-left',
  'column-reverse': 'margin-top',
};

const FLEX_MAP_SECOND = {
  row: 'margin-bottom',
  column: 'margin-right',
  'row-reverse': 'margin-top',
  'column-reverse': 'margin-left',
};

const INVERT_MAP = {
  'margin-top': 'margin-bottom',
  'margin-right': 'margin-left',
  'margin-bottom': 'margin-top',
  'margin-left': 'margin-right',
};

function getLocalProp(dir, invert = false) {
  return (invert ^ dir.includes('row')) ? 'var(--local-h-gap)' : 'var(--local-v-gap)';
}

function getProp(dir, invert = false) {
  return (invert ^ dir.includes('row')) ? 'var(--h-gap)' : 'var(--v-gap)';
}

const MOD_LIST = Object.keys(FLEX_MAP).concat(['wrap', 'nowrap']);

/**
 * CSS Flow value. Used for flex and grid layouts.
 * @param val
 * @param defaults
 * @returns {*[]}
 */
export default function flowAttr(val, defaults) {
  if (!val) {
    if (defaults.flow) {
      val = defaults.flow;
    } else {
      return;
    }
  }

  const { mods } = extractMods(val, MOD_LIST);
  const dir = mods.find(mod => FLEX_MAP[mod]);

  if (!dir) return;

  const isGridValue = CSS.supports('grid-auto-flow', val);
  const isFlexValue = CSS.supports('flex-flow', val);

  const styles = [];

  if (isGridValue) {
    styles.push({
      'grid-auto-flow': val,
    });
  }

  if (isFlexValue) {
    const dirStyle = FLEX_MAP[dir];
    const dirProp = getProp(dir);

    styles.push({
      'flex-flow': mods.join(' '),
    });

    if (!mods.includes('wrap')) {
      styles.push({
        $suffix: `${defaults.gap ? '' : '[gap]'}>:not(:last-child)`,
        [dirStyle]: dirProp,
      }, {
        $suffix: `${defaults.gap ? '' : '[gap]'}>:not(:last-child)[nu-contents]>:first-child`,
        [dirStyle]: dirProp,
      });
    } else if (!FLEX_GAP_SUPPORTED) {
      const dirSecondStyle = FLEX_MAP_SECOND[dir];
      const invertProp = getProp(dir, true);
      const dirLocalProp = getLocalProp(dir);
      const invertLocalProp = getLocalProp(dir, true);

      styles.push({
        $suffix: ':not(:empty)',
        [dirStyle]: `calc(${dirLocalProp} * -1)`,
        [dirSecondStyle]: `calc(${invertLocalProp} * -1)`,
      });

      styles.push({
        $suffix: `${defaults.gap ? '' : '[gap]'}>*`,
        [dirStyle]: dirProp,
        [dirSecondStyle]: invertProp,
      }, {
        $suffix: `${defaults.gap ? '' : '[gap]'}>[nu-contents]>:first-child`,
        [dirStyle]: dirProp,
        [dirSecondStyle]: invertProp,
      });
    }
  }

  return styles;
}
