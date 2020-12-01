import { parseHue } from '../../src/themes';
import { expect } from '../utils';

describe('hue() helper: parsing work correctly', () => {
  it('with single hue value', () => {
    expect(parseHue('150')).to.eql({
      'alpha': 100,
      'contrast': 'auto',
      'hue': 150,
      'pastel': false,
      'saturation': 100,
      'special': false,
    });
  });

  it('with hue and saturation provided', () => {
    expect(parseHue('150 70')).to.eql({
      'alpha': 100,
      'contrast': 'auto',
      'hue': 150,
      'pastel': false,
      'saturation': 70,
      'special': false,
    });

    expect(parseHue('150 70%')).to.eql({
      'alpha': 100,
      'contrast': 'auto',
      'hue': 150,
      'pastel': false,
      'saturation': 70,
      'special': false,
    });
  });

  it('with hue, saturation and contrast provided', () => {
    expect(parseHue('150 70 50')).to.eql({
      'alpha': 100,
      'contrast': 50,
      'hue': 150,
      'pastel': false,
      'saturation': 70,
      'special': false,
    });

    expect(parseHue('150 70 50%')).to.eql({
      'alpha': 100,
      'contrast': 50,
      'hue': 150,
      'pastel': false,
      'saturation': 70,
      'special': false,
    });
  });

  it('with hue, saturation, contrast and alpha provided', () => {
    expect(parseHue('150 70 50 10')).to.eql({
      'alpha': 10,
      'contrast': 50,
      'hue': 150,
      'pastel': false,
      'saturation': 70,
      'special': false,
    });

    expect(parseHue('150 70 50 10%')).to.eql({
      'alpha': 10,
      'contrast': 50,
      'hue': 150,
      'pastel': false,
      'saturation': 70,
      'special': false,
    });
  });
});
