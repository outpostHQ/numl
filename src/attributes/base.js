import {
  unit,
  sizeUnit, gridUnit,
} from '../helpers';
import textAttr from './text';
import placeAttr, { PLACE_VALUES } from './place';
import borderAttr from './border';
import shadowAttr from './shadow';
import flowAttr from './flow';
import gapAttr from './gap';
import zAttr from './z';
import interactiveAttr from './interactive';
import sizingAttr from './sizing';
import sizeAttr from './size';
import transitionAttr from './transition';
import colorAttr from './color';
import fillAttr from './fill';
import transformAttr from './transform';
import spaceAttr from './space';
import radiusAttr from './radius';
import overflowAttr from './overflow';
import hideAttr from './hide';
import imageAttr from './image';
import paddingAttr from './padding';
import beforeAttr from './before';
import afterAttr from './after';
import scrollbarAttr from './scrollbar';
import filterAttr from './filter';
import scaleAttr from './scale';
import rotateAttr from './rotate';
import moveAttr from './move';
import showAttr from './show';
import fadeAttr from './fade';
import insetAttr from './inset';
import outlineAttr from './outline';
import markAttr from './mark';
import dropAttr from './drop';
import expandAttr from './expand';
import opacityAttr from './opacity';
import selectableAttr from './selectable';
import boxAttr from './box';
import clampAttr from './clamp';

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
  columns: gridUnit('grid-template-columns'),
  rows: gridUnit('grid-template-rows'),
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
  inset: insetAttr,
  outline: outlineAttr,
  mark: markAttr,
  expand: expandAttr,
  fade: fadeAttr,
  drop: dropAttr,
  origin: 'transform-origin',
  selectable: selectableAttr,
  box: boxAttr,
  'line-clamp': clampAttr,
};
