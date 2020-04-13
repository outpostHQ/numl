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
--nu-${size}-line-height: ${arr[1]}rem;${arr[2] ? `
--nu-${size}-font-weight: ${arr[2]}rem;` : '' }`;
});

injectStyleTag(`:root{${PROPS}`, 'nu-sizes');

export default function sizeAttr(val) {
  if (!val) val = 'md';

  const tmp = val.split(/\s+/).map(vl => parseAttr(val, 1));
  const styles = {
    'font-size': 'var(--nu-font-size)',
    'line-height': 'var(--nu-line-height)',
  };

  if (tmp[0].values.length) {
    styles['--nu-font-size'] = tmp[0].values[0];
  } else if (tmp[0].mods.length) {
    styles['--nu-font-size'] = `var(--nu-${tmp[0].mods[0]}-font-size, inherit)`;
  } else {
    return;
  }

  if (tmp[1]) {
    if (tmp[1].values.length) {
      styles['--nu-line-height'] = tmp[1].values[0];
    } else if (tmp[1].mods.length) {
      styles['--nu-line-height'] = `var(--nu-${tmp[1].mods[0]}-line-height, inherit)`;
    }
  }

  if (!styles['--nu-line-height']) {
    if (tmp[0].mods.length) {
      styles['--nu-line-height'] = `var(--nu-${tmp[0].mods[0]}-line-height, inherit)`;
    } else {
      styles['--nu-line-height'] = 'var(--nu-font-size)';
    }
  }

  return styles;
}
