import NuSvelteComponent from './svelte-component';

export default class NuDatePicker extends NuSvelteComponent {
  static get nuTag() {
    return 'nu-datepicker';
  }

  static get nuComponent() {
    return import('../components/datepicker.svelte').then(module => module.default);
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
