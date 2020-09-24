import { install, uninstall } from '@github/hotkey';
import { log } from '../helpers';

export default function HotKeyBehavior(host, options) {
  let installed = false;

  return {
    connected() {
      setTimeout(() => {
        const el = host.nuRef || host;

        el.dataset.hotkey = (options || '').trim();

        install(el);

        log('hotkey installed', el, el.dataset.hotkey);

        installed = true;
      }, 300);
    },
    disconnected() {
      if (installed) {

        uninstall(host);

        log('hotkey uninstalled', host, options);

        installed = false;
      }
    },
  };
}
