export function localProp(name, fallbackValue) {
  return prop(`local-${name}`, name, fallbackValue);
}

export function prop(propName, fallbackPropName, fallbackValue) {
  const fallbackValuePart = fallbackValue ? `, ${fallbackValue}` : '';

  return `var(--${propName}${fallbackPropName ? `, var(--${fallbackPropName}${fallbackValuePart})` : fallbackValuePart})`;
}

export function rgbColorProp(colorName, opacity, fallbackColorName, fallbackValue) {
  const fallbackValuePart = fallbackValue ? `, ${fallbackValue}` : '';

  return `rgba(var(--${colorName}-color-rgb${fallbackColorName ? `, var(--${fallbackColorName}-color-rgb, ${fallbackValuePart})` : fallbackValuePart}), ${opacity})`;
}

export function colorProp(colorName, fallbackColorName, fallbackValue) {
  const fallbackValuePart = fallbackValue ? `, ${fallbackValue}` : '';

  return `var(--${colorName}-color${fallbackColorName ? `, var(--${fallbackColorName}${fallbackValuePart})` : fallbackValuePart})`;
}
