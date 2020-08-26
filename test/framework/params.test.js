import { parseParams } from '../../src/helpers';
import { expect } from '../utils';

const DEFAULT_PARAMS = {
  param1: 'value1',
};

function checkParamParsing(map) {
  Object.entries(map).forEach(([value, parsed]) => {
    it(`value '${value}' should be parsed correctly`, () => {
      const result = parseParams(value, { ...DEFAULT_PARAMS });

      expect(result).to.eql(parsed);
    });
  });
}

describe('Params', () => {
  checkParamParsing({
    'param2(value2)': {
      param1: 'value1',
      param2: 'value2',
    },
    'param2(value2) param3': {
      param1: 'value1',
      param2: 'value2',
      param3: true,
    },
    'param2(value2) -param1': {
      param2: 'value2',
    },
    'param2(value2) #special': {
      param1: 'value1',
      param2: 'value2',
      color: 'var(--nu-special-color, var(--special-color, #special))',
    },
    'param2(value2) #special.50': {
      param1: 'value1',
      param2: 'value2',
      color: 'rgba(var(--nu-special-color-rgb), 0.5)',
    },
  });
});
