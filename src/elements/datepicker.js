import NuSvelteComponent from './svelte-component';

export default class NuDatePicker extends NuSvelteComponent {
  static get nuTag() {
    return 'nu-datepicker';
  }

  static get nuComponent() {
    return import('../components/datepicker.svelte');
  }

  static get nuAttrs() {
    return {
      value: '',
      locale: '',
      begin: '',
      end: '',
      mode: '',
    };
  }

  static get nuDefaults() {
    return {
      display: 'grid',
      gap: '',
    }
  }

  nuConnected() {
    super.nuConnected();

    this.setAttribute('type', 'date');
  }
}
