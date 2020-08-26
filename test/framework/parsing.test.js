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
        'calc(100vw + (10 * var(--nu-gap)))'
      ],
      'color': '',
      'mods': [],
      'value': 'calc(100vw + (10 * var(--nu-gap)))',
      'values': [
        'calc(100vw + (10 * var(--nu-gap)))',
      ],
    },

    '100vw + 10x': {
      'all': [
        'calc((100vw) + (10 * var(--nu-gap)))'
      ],
      'color': '',
      'mods': [],
      'value': 'calc((100vw) + (10 * var(--nu-gap)))',
      'values': [
        'calc((100vw) + (10 * var(--nu-gap)))',
      ],
    },

    '1x': {
      'all': [
        'var(--nu-gap)'
      ],
      'color': '',
      'mods': [],
      'value': 'var(--nu-gap)',
      'values': [
        'var(--nu-gap)',
      ],
    },

    '--padding-v --padding-h': {
      'all': [
        'var(--nu-padding-v, var(--padding-v))',
        'var(--nu-padding-h, var(--padding-h))',
      ],
      'color': '',
      'mods': [],
      'value': 'var(--nu-padding-v, var(--padding-v)) var(--nu-padding-h, var(--padding-h))',
      'values': [
        'var(--nu-padding-v, var(--padding-v))',
        'var(--nu-padding-h, var(--padding-h))',
      ],
    },

    'max max(100%, --content-width)': {
      'all': [
        'max',
        'max(100%, var(--nu-content-width, var(--content-width)))'
      ],
      'color': '',
      'mods': [
        'max',
      ],
      'value': 'max max(100%, var(--nu-content-width, var(--content-width)))',
      'values': [
        'max(100%, var(--nu-content-width, var(--content-width)))',
      ],
    }
  });
});
