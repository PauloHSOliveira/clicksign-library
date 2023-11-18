import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const packageJson = require('./package.json')

export default [{
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    terser({
      ecma: 'esnext',
      mangle: { toplevel: true },
      compress: {
        toplevel: true,
        drop_console: true,
        drop_debugger: true,
      },
      output: { quote_style: 1 },
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
    nodeResolve(),
  ],
  external: ['axios-rate-limit', 'axios','axios-retry'],
},{
  input: 'src/index.ts',
  output: [{ file: 'dist/types.d.ts', format: 'es' }],
  plugins: [dts.default()],
},]
