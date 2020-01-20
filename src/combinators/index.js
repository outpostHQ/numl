import transform from './transform';
import background from './background';
import shadow from './shadow';
import { getCombinations, warn } from '../helpers';

export const combinators = {
  transform,
  background,
  shadow,
};

export default function combine(combinatorName, defaults) {
  const combinator = combinators[combinatorName];

  if (!combinator) {
    warn('wrong combinator name', JSON.stringify(combinatorName));

    return;
  }

  // get all combinator attrs
  const combinatorAttrs = combinator.attrs;

  // get all attrs that have default value
  const allDefaultAttrs = Object.entries(defaults)
    .reduce((list, [name, value]) => {
      if (value != null) {
        list.push(name);
      }

      return list;
    }, []);

  // get intersection of both
  const definedAttrs = combinatorAttrs.filter(attr => allDefaultAttrs.includes(attr));

  // get other attrs
  const possibleAttrs = combinatorAttrs.filter(attr => !definedAttrs.includes(attr));

  const combinations = getCombinations(possibleAttrs);

  combinations.push([]);

  return combinations.reduce((stylesList, combination) => {
    const presentedAttrs = [...definedAttrs, ...combination];
    const excludeAttrs = combinatorAttrs.filter(attr => !presentedAttrs.includes(attr));
    const styles = combinator.generator(presentedAttrs, combinatorAttrs);

    if (styles) {
      styles.$suffix = `${[
        ...excludeAttrs.map(attr => `:not([${attr}])`),
        ...combination.map(attr => `[${attr}]`),
      ].join('')}${styles.$suffix || ''}`;

      stylesList.push(styles);
    }

    return stylesList;
  }, []);
}
