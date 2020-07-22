import { html, fixture, expect } from '../utils';
import '../../dist/index';

describe('nu-base', () => {
  it('has default "nu" attribute', async () => {
    const el = await fixture(html`
      <nu-base>Base element</nu-base>
    `);

    expect(el.hasAttribute('nu'));
  });
});
