import { isNoValue } from '../helpers';

export default function boxAttr(val) {
  return {
    '--nu-box-position': isNoValue(val) ? 'static' : 'relative',
  };
}
