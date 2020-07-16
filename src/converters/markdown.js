import { Remarkable } from 'numl-markdown';
import { linkify } from 'numl-markdown/linkify';

/** Parse Markdown into an NuML String. */
export default function markdownToNuml(md, options = {}) {
  const converter = new Remarkable('full', {
    typographer: options.typographer,
  });

  if (options.linkify) {
    converter.use(linkify);
  }

  let html = converter.render(md);

  if (options.inline) {
    html = html.replace(/^<nu-block padding="1x 0">/, '')
      .replace(/<\/nu-block>$/, '');
  }

  return html;
}
