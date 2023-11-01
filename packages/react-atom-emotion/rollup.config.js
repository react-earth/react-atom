import externals from 'rollup-plugin-node-externals';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

const commonPlugins = [externals(), typescript({ exclude: ['**/*.test.ts'] })];
const commonExternal = ['object-standard-path'];

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
    external: commonExternal,
    plugins: commonPlugins,
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts' }],
    external: commonExternal,
    plugins: [...commonPlugins, dts()],
  },
];
