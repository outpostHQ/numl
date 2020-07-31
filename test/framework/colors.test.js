import { parseColor } from '../../src/helpers';
import { expect } from '../utils';

function expectParsedColor(value, expectedData, debug) {
  const data = parseColor(value);

  if (debug) {
    console.log(JSON.stringify(data, null, 2));
  }

  return expect(data).to.eql(expectedData);
}

describe('parseColor()', () => {
  it('should parse named colors', () => {
    expectParsedColor('named', {
      'color': 'var(--nu-named-color)',
      'name': 'named'
    });
  });

  it('should parse named colors with opacity', () => {
    expectParsedColor('named 50%', {
      'color': 'rgba(var(--nu-named-color-rgb), 0.5)',
      'name': 'named',
      opacity: 50
    });
  });

  it('should parse hex colors with conversion', () => {
    expectParsedColor('#4856f5', {
      'color': 'rgba(72,86,245,1)',
    });
  });

  it('should parse hsl/hsla colors with conversion', () => {
    expectParsedColor('hsl(1, 80%, 50%)', {
      'color': 'rgba(230,29,25,1)',
    });
    expectParsedColor('hsla(1, 80%, 50%, 50%)', {
      'color': 'rgba(230,29,25,0.5)',
    });
  });

  it('should parse hsl/hsla colors with conversion', () => {
    expectParsedColor('rgb(20,80,180)', {
      'color': 'rgb(20, 80, 180)',
    });
    expectParsedColor('rgba(20,80,180,.5)', {
      'color': 'rgba(20, 80, 180, .5)',
    });
  });
});
