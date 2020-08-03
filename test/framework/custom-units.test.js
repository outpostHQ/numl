import { customUnit } from '../../src/helpers';
import { expect } from '../utils';

describe('parseColor()', () => {
  it('should pass unit with 1 value', () => {
    expect(customUnit(1, 'x')).to.equal('var(--nu-gap)');
  });

  it('should multiple unit', () => {
    expect(customUnit(2, 'x')).to.equal('(2 * var(--nu-gap))');
  });

  it('should multiple negative values', () => {
    expect(customUnit(-2, 'x')).to.equal('(-2 * var(--nu-gap))');
  });
});
