import { computeStyles, devMode, warn } from '../helpers';

function insertSuffix(styles, suffix) {
  if (!Array.isArray(styles)) {
    styles = [styles];
  }

  styles.forEach(styleMap => {
    styleMap.$suffix = `${suffix}${styleMap.$suffix || ''}`;
  });

  return styles;
}

export default function combinedAttr(attrs, Element) {
  if (Array.isArray(attrs)) {
    return attrs.reduce((all, innerAttrs) => all.concat(...combinedAttr(innerAttrs, Element)), []);
  }

  const allAttrs = Element.nuAllGenerators;
  const allDefaults = Element.nuAllStyles;
  const suffix = attrs.$suffix || '';

  delete attrs.$suffix;

  return Object.keys(attrs)
    .reduce((all, attr) => {
      if (devMode && (!allAttrs[attr] && !attr.startsWith('--'))) {
        warn('combined attr: base attribute not found');

        return all;
      }

      let styles = computeStyles(attr, attrs[attr], allAttrs, allDefaults);

      if (!styles) return all;

      const notAttr = suffix.includes('::') ? '' : `:not([${attr}])`;

      styles = insertSuffix(styles, `${suffix}${notAttr}`);

      all.push(...styles);

      return all;
    }, []);
}
