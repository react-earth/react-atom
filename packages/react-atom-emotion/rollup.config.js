import externals from 'rollup-plugin-node-externals';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

const commonPlugins = [externals(), typescript()];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        exports: 'default',
      },
      {
        file: packageJson.module,
        format: 'esm',
      },
    ],
    plugins: commonPlugins,
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts' }],
    plugins: [...commonPlugins, dts()],
  },
];
