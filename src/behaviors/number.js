import FormatterBehavior from './formatter.js';
import NumberFormatter from '../formatters/number';

export default class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return NumberFormatter;
  }
}
