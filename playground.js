import { svgElement } from './src/helpers';

const schemeWidget = Nude.getElementById("prefers-color-scheme");
const contrastWidget = Nude.getElementById("prefers-contrast");
const schemeClass = 'nu-prefers-color-scheme';
const schemeValues = ['auto', 'dark', 'light'];
const contrastClass = 'nu-prefers-contrast';
const contrastValues = ['auto', 'high', 'low'];
const reduceMotionClass = 'nu-prefers-reduced-motion';
const svgImages = require('./images/*.svg');
const pngImages = require('./images/*.png');

function getClassName(base, value) {
  if (value === 'auto') {
    return base;
  } else {
    return `${base}-${value}`;
  }
}

function reduceMotion() {
  htmlEl.classList.add(reduceMotionClass);
}

function restoreMotion() {
  htmlEl.classList.remove(reduceMotionClass);
}

const htmlEl = document.querySelector('html');

htmlEl.classList.add(schemeClass, contrastClass);

schemeWidget.addEventListener('input', function (evt) {
  const value = evt.detail;

  reduceMotion();

  setTimeout(() => {
    schemeValues.forEach(val => {
      htmlEl.classList.remove(getClassName(schemeClass, val));
    });

    const className = getClassName(schemeClass, value);

    htmlEl.classList.add(className);

    setTimeout(() => {
      restoreMotion();
    }, 3000);
  }, 0);
});

contrastWidget.addEventListener('input', function (evt) {
  const value = evt.detail;

  contrastValues.forEach(val => {
    htmlEl.classList.remove(getClassName(contrastClass, val));
  });

  const className = getClassName(contrastClass, value);

  htmlEl.classList.add(className);
});

const gzipModifier = 0.0617;

setTimeout(() => {
  const bytesEl = Nude.getElementById('bytes');
  const gzipEl = Nude.getElementById('gzip');
  const size = Math.ceil([...document.querySelectorAll('style')].reduce((sum, el) => sum += el.textContent.length, 0) / 1000);
  const gzipSize = Math.ceil(size * gzipModifier);
  bytesEl.innerText = size;
  gzipEl.innerText = gzipSize;

  const themesEl = Nude.getElementById('themes');

  themesEl.innerText = document.querySelectorAll('style[data-nu-name^="theme:"]').length;
}, 1000);

[...Nude.getElementsById('logo-vector')].forEach(el => el.setAttribute('src', svgImages.logo));
[...Nude.getElementsById('logo-raster')].forEach(el => el.setAttribute('src', pngImages.logo));
[...Nude.getElementsById('logo-background')].forEach(el => el.setAttribute('image', `no-repeat left center / contain url(${svgImages.logo})`));
