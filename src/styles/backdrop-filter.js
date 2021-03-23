import filterAttr from './filter';
import { isNoValue } from '../helpers';

const BACKDROP_FILTER = 'backdrop-filter';
const BACKDROP_PROP = CSS.supports(BACKDROP_FILTER, 'blur(1rem)')
  ? 'backdrop-filter'
  : '-webkit-backdrop-filter';

export default function backdropAttr(val) {
  if (isNoValue(val)) return;

  const filterStyle = filterAttr(val)[0].filter;

  return [{
    [BACKDROP_PROP]: filterStyle,
  }];
}
