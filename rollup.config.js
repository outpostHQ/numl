import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const DEV = !!process.env.ROLLUP_WATCH;
const VERSION = `"${pkg.version}"`;
// const moduleName = pkg.module;

function partConfig(url) {
  return {
    input: `src/${url}`,
    external: ['ms'],
    output: [{
      name: 'Nude',
      dir: './dist/',
      format: 'iife',
      exports: 'named',
    }],
    plugins: [
      replace({
        'process.env.NODE_ENV': DEV ? '"development"' : '"production"',
        'process.env.APP_VERSION': VERSION,
      }),
      DEV ? undefined : terser(),
      svelte(),
      resolve(),
    ],
  };
}

export default [{
  input: 'src/index.js',
  external: ['ms'],
  output: [{
    name: 'Nude',
    dir: './dist/',
    // file: moduleName,
    format: 'es',
    // format: 'system',
    // exports: 'named'
  }],
  plugins: [
    replace({
      'process.env.NODE_ENV': DEV ? '"development"' : '"production"',
      'process.env.APP_VERSION': VERSION,
    }),
    DEV ? undefined : terser(),
    svelte(),
    resolve(),
  ]
},
  partConfig('components/datepicker.svelte'),
  partConfig('converters/markdown.js'),
  partConfig('converters/code.js'),
  partConfig('formatters/datetime.js'),
  partConfig('formatters/number.js'),
  partConfig('behaviors/fixate.js'),
  partConfig('behaviors/popup.js'),
  partConfig('behaviors/button.js'),
];
