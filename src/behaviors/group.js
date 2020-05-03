import Behavior from './behavior';

export default class GroupBehavior extends Behavior {
  connected() {
    this.setContext('group', this);
  }
}
