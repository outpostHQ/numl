import Nude, * as ALL from './index';

const Elements = {...ALL};

Object.keys(Elements).forEach(key => {
  if (!Elements[key].nuTag) {
    delete Elements[key];
  }
});

Nude.elements = Elements;

Nude.init(
  ...Object.values(Elements).filter(el => el.nuTag !== 'nu-base'),
);

window.Nude = Nude;

export default Nude;
