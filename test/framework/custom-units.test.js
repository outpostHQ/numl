import { customUnit } from '../../src/helpers';
import units from '../../src/units';
import { expect } from '../utils';

describe('parseColor()', () => {
  it('should pass unit with 1 value', () => {
    expect(customUnit(1, 'x')).to.equal('var(--gap)');
  });

  it('should multiple unit', () => {
    expect(customUnit(2, 'x')).to.equal('(2 * var(--gap))');
  });

  it('should multiple negative values', () => {
    expect(customUnit(-2, 'x')).to.equal('(-2 * var(--gap))');
  });

  it('should be extendable', () => {
    units.define('sp', (num) => {
      return `((${num} * var(--column-width)) + (${num - 1} * var(--grid-gap)))`;
    });

    expect(customUnit(2, 'sp')).to.equal('((2 * var(--column-width)) + (1 * var(--grid-gap)))');
  });
});
