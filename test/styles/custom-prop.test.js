import { handleProp } from '../../src/definitions/props';
import { expect } from '../utils';
import { computeStyles } from '../../src/helpers';
import propAttr from '../../src/styles/prop';

describe('Compute properties', () => {
  it('should handle metric units', () => {
    expect(computeStyles('--prop', '1x', { prop: propAttr }, {}))
      .to.eql([ { '--prop': 'var(--gap)' } ]);
  });

  it('should handle custom properties', () => {
    expect(computeStyles('--prop', '@other', { prop: propAttr }, {}))
      .to.eql([ { '--prop': 'var(--other)' } ]);
  });

  it('should handle autocalc', () => {
    expect(computeStyles('--prop', '@other + 1x', { prop: propAttr }, {}))
      .to.eql([ { '--prop': 'calc((var(--other)) + var(--gap))' } ]);
  });
});

describe('nu-props', function () {
  it('should handle named colors', () => {
    expect(handleProp('some-color', 'my'))
      .to.equal('some-color;var(--my-color)');
  });

  it('should handle named colors with opacity', () => {
    expect(handleProp('some-color', 'my 50%'))
      .to.equal('some-color;rgba(var(--my-color-rgb), 0.5)');
  });

  it('should handle metric units', () => {
    expect(handleProp('big-outline', '2ow'))
      .to.equal('big-outline;calc(2 * var(--outline-width))');
  });
});
