import { Remarkable } from 'numl-markdown';
import { linkify } from 'remarkable/linkify';

const converter = new Remarkable('full')
  .use(linkify);

/** Parse Markdown into an NuML String. */
export default function markdownToNuml(md, inline) {
  let html = converter.render(md);

  if (inline) {
    html = html.replace(/^<nu-block padding="1x 0">/, '')
      .replace(/<\/nu-block>$/, '');
  }

  return html;
}
