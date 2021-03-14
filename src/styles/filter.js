import { convertUnit, extractStyleFuncs, isNoValue } from '../helpers';

const CONVERT_FILTERS = ['drop-shadow', 'blur'];

export default function filterAttr(val) {
  if (isNoValue(val)) return;

  const parts = extractStyleFuncs(val);
  const filters = [];

  (parts || []).forEach(part => {
    filters.push(part.replace(
      /^([\w-]+)\((.+?)\)/,
      (s, s2, s3) => `${s2}(${CONVERT_FILTERS.includes(s2) ? convertUnit(s3) : s3})`,
    ));
  });

  const filterValue = filters.join(' ') || undefined;

  return [{
    filter: filterValue,
  }];
}
