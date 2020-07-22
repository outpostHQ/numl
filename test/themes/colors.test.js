import { findContrastLightness } from '../../src/color';
import { html, fixture, expect } from '../utils';

describe('Find contrast lightness', () => {
  it('works with provided contrast', () => {
    expect(findContrastLightness(10, 5)).to.equal(57.891308589378724);
  });

  it('works with coner cases', () => {
    expect(findContrastLightness(10, 1)).to.equal(10);
  });

  it('works with default contrast', () => {
    expect(findContrastLightness(10)).to.equal(54.876159392089754);
  });

  it('works in both directions', () => {
    // find darker color
    expect(findContrastLightness(40, 3, true)).to.equal(3.102398623342648);
    // find lighter color
    expect(findContrastLightness(40, 3, false)).to.equal(72.50339446521679);
  });

  it('returns undefined if result is impossible', () => {
    // find darker color
    expect(findContrastLightness(20, 3, true)).to.equal(null);
    // find lighter color
    expect(findContrastLightness(90, 3, false)).to.equal(null);
  });
});
