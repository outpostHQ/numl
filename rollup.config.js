import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from './package.json';

const DEV = !!process.env.ROLLUP_WATCH;
const VERSION = `"${pkg.version}"`;

function getConfigByEnv(env) {
  return {
    input: 'src/index.js',
    output: [{
      name: 'Nude',
      dir: `./dist/${env ==='development' ? 'dev/' : ''}`,
      format: 'es',
    }],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.APP_VERSION': VERSION,
      }),
      env === 'development' ? undefined : terser(),
      commonjs(),
      svelte(),
      resolve(),
      json(),
    ]
  }
}

export default [
  getConfigByEnv('development'),
].concat(!DEV ? [
  getConfigByEnv('production')
] : []);
