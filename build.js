const path = require('path');
const glob = require('glob');
const esbuild = require('esbuild');

async function build(pattern) {
  const jsxfiles = new glob.Glob(pattern, {});
  const jobs = [];

  for (const file of jsxfiles) {
    const entry = path.resolve(__dirname, file);

    jobs.push(
      esbuild
        .build({
          entryPoints: [entry],
          bundle: true,
          platform: 'neutral',
          external: ['tjs:path'],
          outfile: path.resolve(path.dirname(entry), 'index.js'),
          define: {
            'process.env.NODE_ENV': '"development"',
          },
        })
        .then(() => console.log('Build %s complete', file)),
    );
  }

  await Promise.all(jobs);
}

async function main() {
  await build('demo/*/index.{jsx,tsx}');
  await build('test/**/index.{jsx,tsx,ts}');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
