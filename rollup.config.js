// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.cjs.min.js',
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()],
    },
    {
      file: 'dist/bundle.esm.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()],
    },
    // You can add more output formats as needed (e.g., UMD, etc.)
  ],
  plugins: [typescript()],
  external: ['ajv', 'axios'], // Add 'ajv' and 'axios' to the external dependencies
};
