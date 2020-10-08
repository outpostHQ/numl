import { parseAttr } from '../helpers';

export default function flexAttr(val) {
  if (!val) return;

  const { values } = parseAttr(val, 0);

  return {
    flex: values.join(' '),
  };
}
