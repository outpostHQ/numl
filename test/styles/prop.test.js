import { handleProp } from '../../src/definitions/props';
import { expect } from '../utils';

describe('nu-props', function () {
  it('should handle named colors', () => {
    expect(handleProp('some-color', 'my'))
      .to.equal('some-color;var(--nu-my-color)');
  });

  it('should handle named colors with opacity', () => {
    expect(handleProp('some-color', 'my 50%'))
      .to.equal('some-color;rgba(var(--nu-my-color-rgb), 0.5)');
  });
});
