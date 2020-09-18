import placeAttr from '../../src/styles/place';
import { checkGenerator } from '../utils';

checkGenerator('place', placeAttr, {
  'outside-left': [{
    "--nu-place-position": "absolute",
    "--nu-transform-place": "translate(0, -50%)",
    "margin": "0 !important",
    "right": "100%",
    "top": "50%"
  }],
  'right': [{
    "--nu-place-position": "absolute",
    "--nu-transform-place": "translate(0, -50%)",
    "margin": "0 !important",
    "right": "0",
    "top": "50%"
  }],
  'right bottom 1x 2x': [{
    "--nu-place-position": "absolute",
    "--nu-transform-place": "translate(0, 0)",
    "bottom": "var(--nu-gap)",
    "margin": "0 !important",
    "right": "calc(2 * var(--nu-gap))"
  }],
  'bottom right 20% 50%': [{
    "--nu-place-position": "absolute",
    "--nu-transform-place": "translate(0, 0)",
    "bottom": "20%",
    "margin": "0 !important",
    "right": "50%"
  }],
  'left top 50% 20%': [{
    "--nu-place-position": "absolute",
    "--nu-transform-place": "translate(0, 0)",
    "left": "20%",
    "margin": "0 !important",
    "top": "50%"
  }],
});
