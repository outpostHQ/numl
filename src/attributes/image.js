import { convertCustomFuncs, convertCustomProperties } from '../helpers';

const REGEX = /(linear|conic)(?=\()/g;

export default function imageAttr(val) {
  val = convertCustomProperties(convertCustomFuncs(val));

  val = val.replace(REGEX, (s) => `${s}-gradient`);

  return {
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'background-size': 'contain',
    'background': val,
  };
}
