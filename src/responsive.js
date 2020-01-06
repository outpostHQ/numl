import { computeStyles } from './helpers';
import { generateCSS } from './css';

export const RESPONSIVE_ATTR = 'responsive';
export const RESPONSIVE_MOD = 'responsive';

export function generateCSSByZones(Element, query, name, value, zones) {
  const values = value.split('|');

  let currentValue = '';

  return zones.map((zone, i) => {
    let val = values[i];

    // if default value
    if (val == null) {
      if (currentValue) {
        val = currentValue;
      } else {
        val = '';
      }
    } else if (val === ' ') {
      val = '';
    }

    currentValue = val;

    const stls = computeStyles(name, val, Element.nuAllAttrs, Element.nuAllDefaults);

    return generateCSS(query, stls);
  });
}
