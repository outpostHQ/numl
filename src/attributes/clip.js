import { parseAttr } from '../helpers';

export default function clipAttr(val) {
  if (val) {
    const { value } = parseAttr(val);

    return {
      'clip-path': value,
    };
  }
}

