import minify from 'rollup-plugin-babel-minify';
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace';
import pkg from './package.json';
import cssnano from 'cssnano';

const ENV = process.env.ROLLUP_WATCH ? 'development' : 'production';

export default [
  {
    input: 'src/pack.js',
    external: ['ms'],
    output: [
      { name: 'NudeFramework Pack', file: pkg.module.replace('.js', '.pack.js'), format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      ENV === 'production' ? minify({
        comments: false,
      }) : undefined,
      postcss({
        extract: true,
        plugins: [cssnano()],
        extensions: [ '.css' ],
      })
    ]
  },
  {
    input: 'src/pack.js',
    external: ['ms'],
    output: [
      { name: 'NudeFramework Pack Dev', file: pkg.module.replace('.js', '.pack.dev.js'), format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      postcss({
        extensions: [ '.css' ],
      })
    ]
  },
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      { name: 'NudeFramework', file: pkg.module, format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      ENV === 'production' ? minify({
        comments: false,
      }) : undefined,
      postcss({
        plugins: [cssnano()],
        extensions: [ '.css' ],
      })
    ]
  },
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      { name: 'NudeFramework Dev', file: pkg.module.replace('.js', '.dev.js'), format: 'es' }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      postcss({
        extensions: [ '.css' ],
      })
    ]
  },
];
