export function localProp(name, fallbackValue) {
  return prop(`local-${name}`, name, fallbackValue);
}

export function prop(propName, fallbackPropName, fallbackValue) {
  const fallbackValuePart = fallbackValue ? `, ${fallbackValue}` : '';

  return `var(--nu-${propName}, var(--${propName}${fallbackPropName ? `, var(--nu-${fallbackPropName}${fallbackValuePart})` : fallbackValuePart}))`;
}

export function rgbColorProp(colorName, opacity, fallbackColorName, fallbackValue) {
  const fallbackValuePart = fallbackValue ? `, ${fallbackValue}` : '';

  return `rgba(var(--nu-${colorName}-color-rgb${fallbackColorName ? `, var(--nu-${fallbackColorName}-color-rgb, ${fallbackValuePart})` : fallbackValuePart}), ${opacity})`;
}

export function colorProp(colorName, fallbackColorName, fallbackValue) {
  const fallbackValuePart = fallbackValue ? `, ${fallbackValue}` : '';

  return `var(--nu-${colorName}-color, var(--${colorName}-color${fallbackColorName ? `, var(--nu-${fallbackColorName}${fallbackValuePart})` : fallbackValuePart}))`;
}
