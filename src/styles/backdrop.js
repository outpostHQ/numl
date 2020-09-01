import filterAttr from './filter';

const BACKDROP_FILTER = 'backdrop-filter';
const BACKDROP_PROP = CSS.supports(BACKDROP_FILTER, 'blur(1rem)')
  ? 'backdrop-filter'
  : '-webkit-backdrop-filter';

export default function backdropAttr(val) {
  const filterStyle = filterAttr(val)[0].filter;

  return [{
    [BACKDROP_PROP]: filterStyle,
  }];
}
