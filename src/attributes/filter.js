import { convertUnit, splitStyleValue } from '../helpers';

export default function filterAttr(val) {
  const parts = splitStyleValue(val);
  const filter = [];
  const backdropFilter = [];

  (parts || []).forEach(part => {
    part = part.replace(/\((.+)\)/, (s, s2) => `(${convertUnit(s2)})`);

    if (part.startsWith('backdrop-')) {
      part = part.replace('backdrop-', '');
      backdropFilter.push(part);
    } else {
      filter.push(part);
    }
  });

  return [{
    filter: filter.join(' '),
    'backdrop-filter': backdropFilter.join(' '),
  }];
}
