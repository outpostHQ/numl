// import { injectCSS } from './helpers';

// console.log(injectCSS('body { background-color: red; }'));

const Nude = {
  points: [],
  rules: [],
  responsive: {
    setPoints(points) {
      if (process.env === 'development') console.log('nude.points', points);

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
