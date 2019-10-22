import { extractMods } from '../helpers';

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

function getProp(dir, invert = false) {
  return (invert ^ dir.includes('row')) ? 'var(--nu-h-gap)' : 'var(--nu-v-gap)';
}

const MOD_LIST = Object.keys(FLEX_MAP).concat(['wrap', 'nowrap']);

/**
 * CSS Flow value. Used for flex and grid layouts.
 * @param val
 * @param defaults
 * @returns {*[]}
 */
export default function flowAttr(val, defaults) {
  val = val.trim();

  if (!val) return;

  const isGrid = val.trim().startsWith('grid-');

  if (isGrid) {
    val = val.replace('grid-', '');

    return [{
      'grid-auto-flow': val,
      'grid-gap': 'var(--nu-grid-gap, 0)',
    }];
  }

  const { mods } = extractMods(val, MOD_LIST);
  const dir = mods.find(mod => FLEX_MAP[mod]);

  if (!dir) return;

  const dirStyle = FLEX_MAP[dir];
  const dirProp = getProp(dir);

  if (!mods.includes('wrap')) {
    return [{
      'flex-flow': mods.join(' '),
    }, {
      $suffix: `${defaults.gap ? '' : '[gap]'}>:not(:last-child)`,
      [dirStyle]: dirProp,
    }];
  }

  const dirSecondStyle = FLEX_MAP_SECOND[dir];
  const invertProp = getProp(dir, true);

  return [{
    'flex-flow': mods.join(' '),
  },{
    $suffix: ':not(:empty)',
    [dirStyle]: `calc(${dirProp} * -1)`,
    [dirSecondStyle]: `calc(${invertProp} * -1)`,
  }, {
    $suffix: '[gap]>*',
    [dirStyle]: dirProp,
    [dirSecondStyle]: invertProp,
  }];
}
