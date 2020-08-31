import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import numlPlugin from 'remarkable-numl';

/** Parse Markdown into an NuML String. */
export default function markdownToNuml(md, options = {}) {
  const converter = new Remarkable('full', {
    typographer: options.typographer,
  });

  if (options.linkify) {
    converter.use(linkify);
  }

  converter.use(numlPlugin);

  let html = converter.render(md);

  if (options.inline) {
    html = html.replace(/^<nu-block padding="1x 0">/, '')
      .replace(/<\/nu-block>$/, '');
  }

  return html;
}
