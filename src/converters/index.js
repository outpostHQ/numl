function extract(module) {
  return module.default || module;
}

export default {
  code: () => extract(import('./code')),
  markdown: () => extract(import('./markdown')),
}
