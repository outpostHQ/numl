import { ICONS_PROVIDER } from './settings';
import { extractModule } from './helpers';

let loader = (name) => {
  switch (ICONS_PROVIDER) {
    case 'feather':
      return import('feather-icons')
        .then(feather => {
          name = name.replace('-outline', '');

          const icon = feather.icons[name];

          return icon ? icon.toSvg() : '';
        });
    case 'eva':
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
            return `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${contents}</svg>`
          }

          return '';
        });
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
      }).catch(e => console.error('!', e));
  },
  setLoader(_loader) {
    loader = _loader;
  }
}

export default Icons;
