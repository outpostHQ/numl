import { ICONS_PROVIDER } from './settings';
import { h } from './dom-helpers';
import { warn } from './helpers';

const handleJSON = response => response.ok ? response.json() : {};

let ION_CACHE;

function ionIconsLoader(name) {
  if (!ION_CACHE) {
    ION_CACHE = fetch(`https://unpkg.com/ionicons@5/dist/ionicons.symbols.svg`)
      .then(response => response.ok ? response.text() : '')
      .then(str => {
        const el = h('div');

        el.innerHTML = str;

        return el;
      });
  }

  return ION_CACHE.then((cache) => {
    const svg = cache.querySelector(`#${name}`);

    if (!svg.outerHTML) return '';

    const contents = svg.innerHTML.split('</title>')[1];

    return `<svg viewBox="0 0 512 512" style="stroke: currentColor; fill: currentColor;">${contents}</svg>`;
  });
}

let FEATHER_CACHE;

async function featherIconsLoader(name) {
  name = name.replace('-outline', '');

  if (!FEATHER_CACHE) {
    FEATHER_CACHE = fetch(`https://unpkg.com/feather-icons@4/dist/icons.json`)
      .then(handleJSON);
  }

  return FEATHER_CACHE.then((cache) => {
    if (!cache || !cache[name]) return '';

    const contents = cache[name];

    return `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" style="stroke-width: var(--icon-stroke-width);" stroke-linecap="round" stroke-linejoin="round">${contents}</svg>`;
  });
}

let EVA_CACHE;

async function evaIconsLoader(name) {
  if (!EVA_CACHE) {
    EVA_CACHE = Promise.all([
      fetch('https://unpkg.com/eva-icons@1.1.3/fill-icons.json')
        .then(handleJSON),
      fetch('https://unpkg.com/eva-icons@1.1.3/outline-icons.json')
        .then(handleJSON),
    ])
      .then((maps) => {
        return maps.reduce((obj, map) => Object.assign(obj, map), {});
      });
  }

  return EVA_CACHE.then((cache) => {
    const contents = cache[name];

    if (!contents) return '';

    return `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">${contents}</svg>`;
  });
}

let loader = (name) => {
  if (ICONS_PROVIDER in Icons.loaders) {
    return Icons.loaders[ICONS_PROVIDER](name);
  }

  warn('icon not found', { name });

  return Promise.resolve('');
}

const ICONS_CACHE = {};

const Icons = {
  load(names, type) {
    if (names in ICONS_CACHE) return ICONS_CACHE[names];

    return ICONS_CACHE[names] = Promise
      .all(names.split(/\s+/g)
        .map(name => {
          if (!name || typeof name !== 'string' || !name.trim()) return Promise.resolve('');

          return loader(name, type)
            .catch(() => '');
        }))
      .then(list => {
        return list.find(iconData => !!iconData);
      })
      .catch(e => warn(e));
  },
  setLoader(_loader) {
    loader = _loader;
  },
  loaders: {
    feather: featherIconsLoader,
    eva: evaIconsLoader,
    ion: ionIconsLoader,
  },
}

export default Icons;
