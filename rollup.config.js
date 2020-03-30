import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

const DEV = !!process.env.ROLLUP_WATCH;
const VERSION = `"${pkg.version}"`;
const moduleName = pkg.module;

export default (!DEV ? [
  {
    input: 'src/pack.js',
    external: ['ms'],
    output: [
      { name: 'Nude', file: moduleName, format: 'iife', exports: 'default' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': '"production"',
        'process.env.APP_VERSION': VERSION,
      }),
      terser(),
    ]
  },
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      { name: 'Nude', file: moduleName.replace('.js', '.module.js'), format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': '"production"',
        'process.env.APP_VERSION': VERSION,
      }),
      terser(),
    ]
  },
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      {
        name: 'Nude',
        file: moduleName.replace('.js', '.module.dev.js'),
        format: 'es'
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': '"development"',
        'process.env.APP_VERSION': VERSION,
      }),
    ]
  },
]: []).concat([
  {
    input: 'src/pack.js',
    external: ['ms'],
    output: [
      {
        name: 'Nude',
        file: moduleName.replace('.js', '.dev.js'),
        format: 'iife',
        exports: 'default'
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': '"development"',
        'process.env.APP_VERSION': VERSION,
      }),
    ]
  }
]);
