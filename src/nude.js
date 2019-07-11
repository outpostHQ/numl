// import { injectCSS } from './helpers';
import { log } from './helpers';

// console.log(injectCSS('body { background-color: red; }'));

const Nude = {
  points: [],
  rules: [],
  responsive: {
    setPoints(points) {
      log('points:', points);

      Nude.points = [...points.sort((a, b) => a.value - b.value)];

      this.generateCSS();
    },
    generateCSS() {

    },
  },
  iconLoader() {
    return '';
  }
};

window.Nude = Nude;

export default Nude;
