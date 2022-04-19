// eslint-disable-next-line
import framework7 from 'rollup-plugin-framework7';

export default {
  plugins: [framework7({ emitCss: false })],
  root: './demo',
  base: '',
  build: {
    outDir: './www',
    assetsInlineLimit: 0,
    emptyOutDir: true,
  },
  server: {
    host: true,
  },
  esbuild: {
    jsxFactory: '$jsx',
    jsxFragment: '"Fragment"',
  },
};
