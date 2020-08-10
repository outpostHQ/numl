import { ICONS_PROVIDER } from './settings';
import { extractModule, warn } from './helpers';

function featherIconsLoader(name) {
  return extractModule(import('feather-icons/dist/icons.json'))
    .then(icons => {
      name = name.replace('-outline', '');

      const contents = icons[name];

      if (contents) {
        return `<svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" style="stroke-width: var(--nu-icon-stroke-width, calc(1rem / 8))" fill="none" stroke-linecap="round" stroke-linejoin="round">${contents}</svg>`;
      }

      return '';
    });
}

function evaIconsLoader(name) {
  return extractModule(import('eva-icons/eva-icons.json'))
    .then(icons => {
      let contents = icons[name];

      if (!contents) {
        name = name.replace('-outline', '');

        contents = icons[name];

        if (!contents) {
          name = `${name}-outline`;

          contents = icons[name];
        }
      }

      if (contents) {
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${contents}</svg>`;
      }

      return '';
    });
}

let loader = (name) => {
  switch (ICONS_PROVIDER) {
    case 'feather':
      return featherIconsLoader(name);
    case 'eva':
      return evaIconsLoader(name);
  }

  return Promise.resolve('');
}

const Icons = {
  load(names, type) {
    return Promise
      .all(names.split(/\s+/g)
        .map(name => {
          return loader(name, type);
        })).then(list => {
        return list.find(iconData => iconData);
      }).catch(e => warn(e));
  },
  setLoader(_loader) {
    loader = _loader;
  },
  loaders: {
    feather: featherIconsLoader,
    eva: evaIconsLoader,
  },
}

export default Icons;
