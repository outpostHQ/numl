import { Remarkable } from 'numl-markdown';

const converter = new Remarkable();

/** Parse Markdown into an NuML String. */
export default function markdownToNuml(md, inline) {
  let html = converter.render(md);
  console.log('!', md, html);

  if (inline) {
    html = html.replace(/^<nu-block padding="1x 0">/, '')
      .replace(/<\/nu-block>$/, '');
  }

  return html;
}
