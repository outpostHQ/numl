import InputBehavior from './input';

export default class TextAreaBehavior extends InputBehavior {
  static get params() {
    return {
      tag: 'textarea',
    };
  }

  static get tag() {
    return 'textarea';
  }
}
