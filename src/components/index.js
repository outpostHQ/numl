import { extractModule as extract } from '../helpers';

export default {
  datepicker: () => extract(import('./datepicker.svelte')),
  debug: () => extract(import('./debug.svelte')),
};
