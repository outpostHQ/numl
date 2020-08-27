import { handleProp } from '../../src/definitions/props';
import { expect } from '../utils';
import { computeStyles } from '../../src/helpers';
import propAttr from '../../src/attributes/prop';

describe('Compute properties', () => {
  it('should handle metric units', () => {
    expect(computeStyles('--prop', '1x', { prop: propAttr }, {}))
      .to.eql([ { '--nu-prop': 'var(--nu-gap)' } ]);
  });

  it('should handle custom properties', () => {
    expect(computeStyles('--prop', '--other', { prop: propAttr }, {}))
      .to.eql([ { '--nu-prop': 'var(--nu-other, var(--other))' } ]);
  });

  it('should handle autocalc', () => {
    expect(computeStyles('--prop', '--other + 1x', { prop: propAttr }, {}))
      .to.eql([ { '--nu-prop': 'calc((var(--nu-other, var(--other))) + var(--nu-gap))' } ]);
  });
});

describe('nu-props', function () {
  it('should handle named colors', () => {
    expect(handleProp('some-color', 'my'))
      .to.equal('some-color;var(--nu-my-color)');
  });

  it('should handle named colors with opacity', () => {
    expect(handleProp('some-color', 'my 50%'))
      .to.equal('some-color;rgba(var(--nu-my-color-rgb), 0.5)');
  });

  it('should handle metric units', () => {
    expect(handleProp('big-outline', '2ow'))
      .to.equal('big-outline;calc(2 * var(--nu-outline-width))');
  });
});
