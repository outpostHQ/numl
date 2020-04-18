export default class Mixin {
  constructor($host) {
    this.$host = $host;
    this.$ref = $host.nuRef || $host;
  }

  mixin(name) {
    return this.$host.nuMixin(name);
  }
}
