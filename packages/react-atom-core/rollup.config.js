import resolve from '@rollup/plugin-node-resolve';
import externals from 'rollup-plugin-node-externals';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

const commonPlugins = [externals(), resolve(), typescript()];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
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
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [...commonPlugins, dts()],
  },
];
