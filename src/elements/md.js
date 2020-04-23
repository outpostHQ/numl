import NuMarkdown from './markdown';

export default class NuMd extends NuMarkdown {
  static get nuTag() {
    return 'nu-md';
  }

  static get nuDefaults() {
    return {
      display: 'inline-block',
      text: 'baseline',
    };
  }

  static get nuBehaviors() {
    return {
      markdown: 'inline',
    }
  }
}
