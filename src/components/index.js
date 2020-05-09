import { extractModule as extract } from '../helpers';

export default {
  datepicker: () => extract(import('./datepicker.svelte')),
  dateinput: () => extract(import('./dateinput.svelte')),
  debug: () => extract(import('./debug.svelte')),
};
