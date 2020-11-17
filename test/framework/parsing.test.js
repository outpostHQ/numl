import { parseAttr } from '../../src/helpers';
import { expect } from '../utils';

function checkParsing(map) {
  Object.entries(map).forEach(([value, parsed]) => {
    let [val, mode] = value.split('|');

    mode = mode ? Number(mode) : 0;

    it(`attribute '${val}' should be parsed correctly with mode ${mode}`, () => {
      const result = parseAttr(val, mode ? Number(mode) : 0);

      expect(result).to.eql(parsed);
    });
  });
}

describe('Parsing', () => {
  checkParsing({
    '': {
      'all': [],
      'color': '',
      'mods': [],
      'value': '',
      'values': [],
    },

    '1': {
      'all': [
        '1'
      ],
      'color': '',
      'mods': [],
      'value': '1',
      'values': [
        '1',
      ],
    },

    '1|1': {
      'all': [
        '1rem'
      ],
      'color': '',
      'mods': [],
      'value': '1rem',
      'values': [
        '1rem',
      ],
    },

    '(100vw + 10x)': {
      'all': [
        'calc(100vw + (10 * var(--gap)))'
      ],
      'color': '',
      'mods': [],
      'value': 'calc(100vw + (10 * var(--gap)))',
      'values': [
        'calc(100vw + (10 * var(--gap)))',
      ],
    },

    '100vw + 10x': {
      'all': [
        'calc((100vw) + (10 * var(--gap)))'
      ],
      'color': '',
      'mods': [],
      'value': 'calc((100vw) + (10 * var(--gap)))',
      'values': [
        'calc((100vw) + (10 * var(--gap)))',
      ],
    },

    '1x': {
      'all': [
        'var(--gap)'
      ],
      'color': '',
      'mods': [],
      'value': 'var(--gap)',
      'values': [
        'var(--gap)',
      ],
    },

    '@padding-v @padding-h': {
      'all': [
        'var(--padding-v)',
        'var(--padding-h)',
      ],
      'color': '',
      'mods': [],
      'value': 'var(--padding-v) var(--padding-h)',
      'values': [
        'var(--padding-v)',
        'var(--padding-h)',
      ],
    },

    '--var -5x': {
      'all': [
        'var(--var)',
        'calc(-5 * var(--gap))',
      ],
      'color': '',
      'mods': [],
      'value': 'var(--var) calc(-5 * var(--gap))',
      'values': [
        'var(--var)',
        'calc(-5 * var(--gap))',
      ],
    },

    '@var -5x': {
      'all': [
        'var(--var)',
        'calc(-5 * var(--gap))',
      ],
      'color': '',
      'mods': [],
      'value': 'var(--var) calc(-5 * var(--gap))',
      'values': [
        'var(--var)',
        'calc(-5 * var(--gap))',
      ],
    },

    '@var - 5x': {
      'all': [
        'calc((var(--var)) - (5 * var(--gap)))',
      ],
      'color': '',
      'mods': [],
      'value': 'calc((var(--var)) - (5 * var(--gap)))',
      'values': [
        'calc((var(--var)) - (5 * var(--gap)))'
      ],
    },

    '@(some, 1x) + 5x': {
      'all': [
        'calc((var(--some, var(--gap))) + (5 * var(--gap)))'
      ],
      'color': '',
      'mods': [],
      'value': 'calc((var(--some, var(--gap))) + (5 * var(--gap)))',
      'values': [
        'calc((var(--some, var(--gap))) + (5 * var(--gap)))'
      ],
    },

    '--padding-v --padding-h': {
      'all': [
        'var(--padding-v)',
        'var(--padding-h)',
      ],
      'color': '',
      'mods': [],
      'value': 'var(--padding-v) var(--padding-h)',
      'values': [
        'var(--padding-v)',
        'var(--padding-h)',
      ],
    },

    'max max(100%, --content-width)': {
      'all': [
        'max',
        'max(100%, var(--content-width))'
      ],
      'color': '',
      'mods': [
        'max',
      ],
      'value': 'max max(100%, var(--content-width))',
      'values': [
        'max(100%, var(--content-width))',
      ],
    },

    'mod -3.9x': {
      'all': [
        'mod',
        'calc(-3.9 * var(--gap))'
      ],
      'color': '',
      'mods': [
        'mod',
      ],
      'value': 'mod calc(-3.9 * var(--gap))',
      'values': [
        'calc(-3.9 * var(--gap))',
      ],
    },
  });
});
