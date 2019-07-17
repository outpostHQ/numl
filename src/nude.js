// import { injectCSS } from './helpers';
import { log } from './helpers';
import CSS from './css';

// console.log(injectCSS('body { background-color: red; }'));

const dim = document.createElement('div');
const dimStyle = dim.style;

export function splitDimensions(style) {
  dimStyle.padding = style;

  return [
    dimStyle.paddingTop,
    dimStyle.paddingRight,
    dimStyle.paddingBottom,
    dimStyle.paddingTop,
  ];
}

const Nude = {
  points: [],
  rules: [],
  responsive: {
    setPoints(points) {
      log('points:', points);

      Nude.points = [...points.sort((a, b) => a.value - b.value)];
    },
  },
  CSS,
  iconLoader() {
    return '';
  },
};

window.Nude = Nude;

export default Nude;
