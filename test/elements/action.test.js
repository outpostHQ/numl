import { pause, fixture, html, expect } from '../utils';
import '../../dist/index';

describe('nu-action', () => {
  it('has correct aria role', async () => {
    const el = await fixture(html`
      <nu-action>Action</nu-action>
    `);

    expect(el).to.have.attr('role', 'button');
  });

  it('has correct aria role if it\'s a link', async () => {
    const el = await fixture(html`
      <nu-action to="#">Link action</nu-action>
    `);

    expect(el).to.have.attr('role', 'link');
  });

  it('has native "a" element if it\'s a link', async () => {
    const el = await fixture(html`
      <nu-action to="#">Link action</nu-action>
    `);

    const link = el.querySelector('a');

    expect(link).to.exist;
    expect(link).to.have.attr('href', '#');
    expect(link).to.have.attr('tabindex', '-1');
    expect(link).to.have.attr('role', 'none');
    expect(link).to.have.attr('rel', 'noreferrer');
    expect(link).to.have.attr('target', '_self');

    const outerEl = await fixture(html`
      <nu-action to="!#">Link action</nu-action>
    `);

    const outerLink = outerEl.querySelector('a');

    expect(outerLink).to.exist;
    expect(outerLink).to.have.attr('href', '#');
    expect(outerLink).to.have.attr('target', '_blank');
  });
});
