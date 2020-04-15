import { parseAttr } from '../helpers';
import { injectStyleTag } from '../css';

export const SIZES = {
  xxs: [.666, 1],
  xs: [.75, 1],
  sm: [.875, 1.5],
  md: [1, 1.5],
  lg: [1.25, 2],
  xl: [1.5, 2],
  xxl: [2, 2.5],
  h1: [2, 2.5],
  h2: [1.8, 2.5],
  h3: [1.6, 2],
  h4: [1.4, 2],
  h5: [1.2, 1.5],
  h6: [1, 1.5],
};

let PROPS = '';

Object.keys(SIZES).forEach(size => {
  const arr = SIZES[size];

  PROPS += `--nu-${size}-font-size: ${arr[0]}rem;
--nu-${size}-line-height: ${arr[1]}rem;`;
});

injectStyleTag(`:root{${PROPS}`, 'nu-sizes');

const BASE_STYLES = {
  'font-size': 'var(--nu-font-size)',
  'line-height': 'var(--nu-line-height)',
};

export default function sizeAttr(val) {
  if (!val) val = 'md';

  const tmp = val.split(/\s+/).map(vl => parseAttr(vl, 1));
  const styles = {};
  const mod = tmp[0].mods[0];

  if (mod === 'smaller') {
    return [{
      'font-size': 'calc(var(--nu-font-size) / 1.5)',
    }];
  } else if (mod === 'bigger') {
    return [{
      'font-size': 'var(--nu-line-height)',
    }];
  }

  tmp[1] = tmp[1] || tmp[0];

  if (tmp[0].values.length) {
    let value = tmp[0].values[0];

    styles['--nu-font-size'] = value === '-' ? 'inherit' : value;
  } else if (tmp[0].mods.length) {
    styles['--nu-font-size'] = `var(--nu-${tmp[0].mods[0]}-font-size, inherit)`;
  } else {
    return;
  }

  if (tmp[1].values.length) {
    let value = tmp[1].values[0];

    styles['--nu-line-height'] = value === '-' ? 'inherit' : value;
  } else if (tmp[1].mods.length) {
    styles['--nu-line-height'] = `var(--nu-${tmp[1].mods[0]}-line-height, inherit)`;
  }

  return [BASE_STYLES, styles];
}
