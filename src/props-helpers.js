export function localProp(name) {
  return prop(`local-${name}`, name);
}

export function prop(propName, fallbackPropName) {
  return `var(--nu-${propName}${fallbackPropName ? `, var(--nu-${fallbackPropName})` : ''})`;
}
