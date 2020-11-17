import { isNoValue } from '../helpers';

export default function boxAttr(val) {
  return {
    '--box-position': isNoValue(val) ? 'static' : 'relative',
  };
}
