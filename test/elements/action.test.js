import { pause, fixture, html, expect } from '../utils';
import '../../dist/index';

describe('nu-action', () => {
  it('has correct aria role', async () => {
    const el = await fixture(html`
      <nu-action>Action</nu-action>
    `);

    expect(el.getAttribute('role')).to.equal('button');
  });

  it('has correct aria role if it\'s a link', async () => {
    const el = await fixture(html`
      <nu-action to="#">Link action</nu-action>
    `);

    expect(el.getAttribute('role')).to.equal('link');
  });

  it('has native "a" element if it\'s a link', async () => {
    const el = await fixture(html`
      <nu-action to="#">Link action</nu-action>
    `);

    const link = el.querySelector('a');

    expect(link).to.exist;
    expect(link.getAttribute('href')).to.equal('#');
    expect(link.getAttribute('tabindex')).to.equal('-1');
    expect(link.getAttribute('role')).to.equal('none');
    expect(link.getAttribute('rel')).to.equal('noreferrer');
    expect(link.getAttribute('target')).to.equal('_self');

    const outerEl = await fixture(html`
      <nu-action to="!#">Link action</nu-action>
    `);

    const outerLink = outerEl.querySelector('a');

    expect(outerLink).to.exist;
    expect(outerLink.getAttribute('href')).to.equal('#');
    expect(outerLink.getAttribute('target')).to.equal('_blank');
  });
});
