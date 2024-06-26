const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],
  platform: 'node',
  bundle: true,
  minify: true,
  sourcemap: false,
  outfile: 'dist/index.js'
});
