import { parseAttr, stripCalc } from '../helpers';

export function expandAttr(value) {
  if (!value) return;

  const { values, color } = parseAttr(value);

  let sizeY = values[0] || '0';
  let sizeX = values[1] || values[0];

  const radius = values[2] || 'var(--nu-local-radius, var(--nu-radius))';

  if (sizeY !== '0') {
    sizeY = `calc(-1 * ${stripCalc(sizeY)})`;
  }

  if (sizeX !== '0') {
    sizeX = `calc(-1 * ${stripCalc(sizeX)})`;
  }

  return [{
    $suffix: '::after',
    content: '""',
    display: 'block',
    position: 'absolute',
    top: sizeY,
    right: sizeX,
    bottom: sizeY,
    left: sizeX,
    'border-radius': radius,
    'background-image': color,
  }];
}
