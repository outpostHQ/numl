import { VAR_MOD } from '../variables';
import WidgetBehavior from './widget';

const LOCALE_VAR = 'var:locale';

export default class LocalizedWidgetBehavior extends WidgetBehavior {
  init() {
    this.props.lang = (val) => {
      this.setLocale(val);

      return val;
    };

    super.init();

    const { $host } = this;

    $host.nuSetContextHook(LOCALE_VAR, (contextLocale) => {
      if (this.locale !== contextLocale.value && !$host.hasAttribute('lang')) {
        this.apply();
      }
    });

    $host.nuSetMod(VAR_MOD, true);
  }

  connected() {
    super.connected();

    this.setLocale(this.lang);
  }

  setLocale(val) {
    const context = this.context;

    this.locale = val ? val : (context[LOCALE_VAR] && context[LOCALE_VAR].value || 'en');
  }
}
