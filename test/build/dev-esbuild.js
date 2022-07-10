const path = require('path');
const alias = require('esbuild-plugin-alias');

require('esbuild').build({
    entryPoints: [path.resolve(__dirname, '../1/index.jsx')],
    bundle: true,
    platform: 'neutral',
    external: ['path'],
    outfile: path.resolve(__dirname, '../test-1.js'),
    plugins: [
      alias({
        'lvgljs-ui': path.resolve(__dirname, '../../src/render/react/index.js'),
      }),
    ],
}).catch(() => process.exit(1))