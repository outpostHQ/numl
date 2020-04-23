function extract(promise) {
  return promise.then(module => module.default || module);
}

export default {
  datepicker: () => extract(import('./datepicker.svelte')),
};
