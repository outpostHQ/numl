import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const DEV = !!process.env.ROLLUP_WATCH;
const VERSION = `"${pkg.version}"`;
// const moduleName = pkg.module;

function componentConfig(name) {
  return {
    input: `src/components/${name}.svelte`,
    external: ['ms'],
    output: [{
      name: 'Nude',
      dir: './dist/',
      format: 'iife',
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
    format: 'esm',
    // exports: 'default'
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
}, componentConfig('datepicker')];
