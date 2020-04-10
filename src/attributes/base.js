import {
  unit,
  sizeUnit,
} from '../helpers';
import textAttr from '../attributes/text';
import placeAttr, { PLACE_VALUES } from '../attributes/place';
import borderAttr from '../attributes/border';
import shadowAttr from '../attributes/shadow';
import flowAttr from '../attributes/flow';
import gapAttr from '../attributes/gap';
import zAttr from '../attributes/z';
import interactiveAttr from '../attributes/interactive';
import sizingAttr from '../attributes/sizing';
import sizeAttr from '../attributes/size';
import transitionAttr from '../attributes/transition';
import colorAttr from '../attributes/color';
import fillAttr from '../attributes/fill';
import transformAttr from '../attributes/transform';
import spaceAttr from '../attributes/space';
import radiusAttr from '../attributes/radius';
import overflowAttr from '../attributes/overflow';
import hideAttr from '../attributes/hide';
import imageAttr from '../attributes/image';
import paddingAttr from '../attributes/padding';
import beforeAttr from '../attributes/before';
import afterAttr from '../attributes/after';
import scrollbarAttr from '../attributes/scrollbar';
import filterAttr from '../attributes/filter';
import scaleAttr from '../attributes/scale';
import rotateAttr from '../attributes/rotate';
import moveAttr from '../attributes/move';
import showAttr from '../attributes/show';
import fadeAttr from '../attributes/fade';
import toggleAttr from '../attributes/toggle';
import focusableAttr from '../attributes/focusable';
import hoverableAttr from '../attributes/hoverable';
import dropAttr from '../attributes/drop';
import expandAttr from '../attributes/expand';
import opacityAttr from '../attributes/opacity';

export default {
  width: sizeUnit('width'),
  height: sizeUnit('height'),
  sizing: sizingAttr,
  radius: radiusAttr,
  'items-radius': unit('border-radius', {
    suffix: '>:not([radius])',
    empty: '--nu-radius',
    property: true,
    convert: true,
  }),
  padding: paddingAttr,
  'items-padding': unit('padding', {
    suffix: '>:not([padding])',
    empty: '--nu-gap',
    convert: true,
  }),
  overflow: overflowAttr,
  space: spaceAttr,
  border: borderAttr,
  shadow: shadowAttr,
  flow: flowAttr,
  gap: gapAttr,
  order: 'order',
  grow: 'flex-grow',
  shrink: 'flex-shrink',
  basis: unit('flex-basis', { convert: true }),
  'items-basis': unit('flex-basis', { suffix: '>:not([basis])', convert: true }),
  'items-grow': unit('flex-grow', { suffix: '>:not([grow])' }),
  'items-shrink': unit('flex-shrink', { suffix: '>:not([shrink])' }),
  'place-content': PLACE_VALUES[0],
  'place-items': PLACE_VALUES[1],
  'content': PLACE_VALUES[0],
  'items': PLACE_VALUES[1],
  'template-areas': 'grid-template-areas',
  areas: 'grid-template-areas',
  'auto-flow': 'grid-auto-flow',
  'template-columns': unit('grid-template-columns', { convert: true }),
  'template-rows': unit('grid-template-rows', { convert: true }),
  columns: unit('grid-template-columns', { convert: true }),
  rows: unit('grid-template-rows', { convert: true }),
  column: 'grid-column',
  row: 'grid-row',
  area: 'grid-area',
  contain: 'contain',
  place: placeAttr,
  z: zAttr,
  interactive: interactiveAttr,
  color: colorAttr,
  fill: fillAttr,
  filter: filterAttr,
  image: imageAttr,
  transform: transformAttr,
  scale: scaleAttr,
  rotate: rotateAttr,
  move: moveAttr,
  text: textAttr,
  cursor: 'cursor',
  size: sizeAttr,
  hide: hideAttr,
  show: showAttr,
  opacity: opacityAttr,
  transition: transitionAttr,
  scrollbar: scrollbarAttr,
  before: beforeAttr,
  after: afterAttr,
  toggle: toggleAttr,
  focusable: focusableAttr,
  hoverable: hoverableAttr,
  expand: expandAttr,
  fade: fadeAttr,
  drop: dropAttr,
};
