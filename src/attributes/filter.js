import { convertUnit, splitStyleValue } from '../helpers';

const CONVERT_FILTERS = ['drop-shadow', 'blur'];

export default function filterAttr(val) {
  const parts = splitStyleValue(val);
  const filter = [];
  const backdropFilter = [];

  (parts || []).forEach(part => {
    part = part.replace(
      /^(backdrop\-|)([^\(]+)\((.+?)\)/,
      (s, s2, s3, s4) => `${s2}${s3}(${CONVERT_FILTERS.includes(s3) ? convertUnit(s4) : s4})`,
    );

    if (part.startsWith('backdrop-')) {
      part = part.replace('backdrop-', '');
      backdropFilter.push(part);
    } else {
      filter.push(part);
    }
  });

  const filterValue = filter.join(' ') || undefined;
  const backdropFilterValue = backdropFilter.join(' ') || undefined;

  return [{
    filter: filterValue,
    '-webkit-backdrop-filter': backdropFilterValue,
    'backdrop-filter': backdropFilterValue,
  }];
}

window.filterAttr = filterAttr;
