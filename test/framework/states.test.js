import { computeStyles, splitStates } from '../../src/helpers';
import { expect } from '../utils';

function testGenerator(val) {
  if (!val) {
    return [{ style: 'default' }];
  }

  return [{
    style: val,
  }];
}

function expectComputedCSS(value, expectedCSS, debug) {
  const css = computeStyles('test', value, { test: testGenerator }, {});

  if (debug) {
    console.log(JSON.stringify(css, null, 2));
  }

  return expect(css).to.eql(expectedCSS);
}

describe('Bind style to state', () => {
  it('without state binding', () => {
    expectComputedCSS('val', [
      {
        "style": "val"
      }
    ]);
  });

  it('single state binding', () => {
    expectComputedCSS(':hover[val]', [
      {
        "style": "default",
        "$suffix": ":not(:hover)"
      },
      {
        "style": "val",
        "$suffix": ":hover"
      }
    ]);
  });

  it('single state binding with default value', () => {
    expectComputedCSS('val1 :hover[val2]', [
      {
        "style": "val1",
        "$suffix": ":not(:hover)"
      },
      {
        "style": "val2",
        "$suffix": ":hover"
      }
    ]);
  });

  it('empty state value', () => {
    expectComputedCSS('val1 :hover[]', [
      {
        "style": "val1",
        "$suffix": ":not(:hover)"
      },
      {
        "style": "default",
        "$suffix": ":hover"
      }
    ]);
  });

  it('multiple states with fallback', () => {
    expectComputedCSS('val1 :hover[val2] :focus[val3]', [
      {
        "style": "val1",
        "$suffix": ":not(:hover):not([is-focus])"
      },
      {
        "style": "val2",
        "$suffix": ":hover:not([is-focus])"
      },
      {
        "style": "val3",
        "$suffix": "[is-focus]:not(:hover)"
      },
      {
        "style": "val1",
        "$suffix": "[is-focus]:hover"
      }
    ]);
  });

  it('full multiple states', () => {
    expectComputedCSS('val1 :hover[val2] :focus[val3] :hover:focus[val4]', [
      {
        "style": "val1",
        "$suffix": ":not(:hover):not([is-focus])"
      },
      {
        "style": "val2",
        "$suffix": ":hover:not([is-focus])"
      },
      {
        "style": "val3",
        "$suffix": "[is-focus]:not(:hover)"
      },
      {
        "style": "val4",
        "$suffix": "[is-focus]:hover"
      }
    ]);
  });

  it('full multiple states via "OR" syntax', () => {
    expectComputedCSS('val1 :hover.focus[val2]', [
      {
        "style": "val1",
        "$suffix": ":not(:hover):not([is-focus])"
      },
      {
        "style": "val2",
        "$suffix": ":hover:not([is-focus])"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus]:hover"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus]:not(:hover)"
      }
    ]);
  });

  it('more states states', () => {
    expectComputedCSS('val1 :hover[val2] :focus[val3] :hover:focus[val4] :pressed[val5]', [
      {
        "style": "val1",
        "$suffix": ":not(:hover):not([is-focus]):not([is-pressed])"
      },
      {
        "style": "val2",
        "$suffix": ":hover:not([is-focus]):not([is-pressed])"
      },
      {
        "style": "val3",
        "$suffix": "[is-focus]:not(:hover):not([is-pressed])"
      },
      {
        "style": "val4",
        "$suffix": "[is-focus]:hover:not([is-pressed])"
      },
      {
        "style": "val5",
        "$suffix": "[is-pressed]:not([is-focus]):not(:hover)"
      },
      {
        "style": "val1",
        "$suffix": "[is-focus]:hover[is-pressed]"
      },
      {
        "style": "val1",
        "$suffix": ":hover[is-pressed]:not([is-focus])"
      },
      {
        "style": "val1",
        "$suffix": "[is-focus][is-pressed]:not(:hover)"
      }
    ]);
  });

  it('more states via "OR" syntax', () => {
    expectComputedCSS('val1 :hover.focus.pressed[val2]', [
      {
        "style": "val1",
        "$suffix": ":not(:hover):not([is-focus]):not([is-pressed])"
      },
      {
        "style": "val2",
        "$suffix": ":hover:not([is-focus]):not([is-pressed])"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus]:hover:not([is-pressed])"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus]:hover[is-pressed]"
      },
      {
        "style": "val2",
        "$suffix": ":hover[is-pressed]:not([is-focus])"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus]:not(:hover):not([is-pressed])"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus][is-pressed]:not(:hover)"
      },
      {
        "style": "val2",
        "$suffix": "[is-pressed]:not([is-focus]):not(:hover)"
      }
    ]);
  });

  it('states via partial "OR" syntax', () => {
    expectComputedCSS('val1 :hover.focus[val2] :focus[val3]',  [
      {
        "style": "val1",
        "$suffix": ":not([is-focus]):not(:hover)"
      },
      {
        "style": "val3",
        "$suffix": "[is-focus]:not(:hover)"
      },
      {
        "style": "val2",
        "$suffix": ":hover:not([is-focus])"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus]:hover"
      }
    ]);
  });

  it('mixed complex mapping', () => {
    expectComputedCSS('val1 :hover.focus[val2] :focus[val3] :pressed[val4]', [
      {
        "style": "val1",
        "$suffix": ":not([is-focus]):not([is-pressed]):not(:hover)"
      },
      {
        "style": "val3",
        "$suffix": "[is-focus]:not(:hover):not([is-pressed])"
      },
      {
        "style": "val4",
        "$suffix": "[is-pressed]:not([is-focus]):not(:hover)"
      },
      {
        "style": "val2",
        "$suffix": ":hover:not([is-focus]):not([is-pressed])"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus]:hover:not([is-pressed])"
      },
      {
        "style": "val1",
        "$suffix": "[is-focus][is-pressed]:not(:hover)"
      },
      {
        "style": "val1",
        "$suffix": "[is-focus]:hover[is-pressed]"
      },
      {
        "style": "val1",
        "$suffix": ":hover[is-pressed]:not([is-focus])"
      }
    ]);
    expectComputedCSS('val1 :hover.focus[val2] :focus.pressed[val3]', [
      {
        "style": "val1",
        "$suffix": ":not(:hover):not([is-focus]):not([is-pressed])"
      },
      {
        "style": "val2",
        "$suffix": ":hover:not([is-focus]):not([is-pressed])"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus]:hover:not([is-pressed])"
      },
      {
        "style": "val2",
        "$suffix": "[is-focus]:not(:hover):not([is-pressed])"
      },
      {
        "style": "val3",
        "$suffix": "[is-focus][is-pressed]:not(:hover)"
      },
      {
        "style": "val3",
        "$suffix": "[is-pressed]:not([is-focus]):not(:hover)"
      },
      {
        "style": "val1",
        "$suffix": "[is-focus]:hover[is-pressed]"
      },
      {
        "style": "val1",
        "$suffix": ":hover[is-pressed]:not([is-focus])"
      }
    ]);
  });

  it.only('mixed OR/AND state', () => {
    expectComputedCSS('val1 :hover.focus:pressed[val2]', [
      {
        "$suffix": ":not(:hover):not([is-focus]):not([is-pressed])",
        "style": "val1"
      },
      {
        "$suffix": ":hover:not([is-focus]):not([is-pressed])",
        "style": "val2"
      },
      {
        "$suffix": "[is-focus]:hover[is-pressed]",
        "style": "val2"
      },
      {
        "$suffix": "[is-focus][is-pressed]:not(:hover)",
        "style": "val2"
      },
      {
        "$suffix": "[is-focus]:hover:not([is-pressed])",
        "style": "val1"
      },
      {
        "$suffix": ":hover[is-pressed]:not([is-focus])",
        "style": "val1"
      },
      {
        "$suffix": "[is-focus]:not(:hover):not([is-pressed])",
        "style": "val1"
      },
      {
        "$suffix": "[is-pressed]:not(:hover):not([is-focus])",
        "style": "val1"
      },
    ]);
  });
});
