import ComponentBehavior from './component.js';

export default class DebuggerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'debugger',
    };
  }
}
