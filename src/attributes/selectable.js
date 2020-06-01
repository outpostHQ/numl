import { isNoValue } from '../helpers';

const SELECT_MAP = {
  'all': 'all',
}

export default function selectableAttr(val) {
  const mod = val.split(/\s+/g)[0];

  return { 'user-select': isNoValue(mod) ? 'none' : (SELECT_MAP[mod] || 'auto') };
}
