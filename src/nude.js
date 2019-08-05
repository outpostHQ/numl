import { log } from './helpers';
import CSS from './css';

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
    return Promise.resolve('');
  },
};

window.Nude = Nude;

export default Nude;
