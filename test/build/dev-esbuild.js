const path = require('path');
const alias = require('esbuild-plugin-alias');

const entry = path.resolve(__dirname, '../../demo/widgets/index.jsx')

require('esbuild').build({
    entryPoints: [entry],
    bundle: true,
    platform: 'neutral',
    external: ['path', 'fs'],
    outfile: path.resolve(path.dirname(entry), 'index.js'),
    plugins: [
      alias({
        'lvgljs-ui': path.resolve(__dirname, '../../src/render/react/index.js'),
      }),
    ],
}).catch(() => process.exit(1))