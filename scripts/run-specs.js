const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { Glob } = require("glob");
const esbuild = require("esbuild");
const { SPEC_ROOT, OUT_DIR, esbuildOptions } = require("./lib/spec.esbuild");

async function collectSpecs(filter) {
  const glob = new Glob("**/*.spec.ts", {
    cwd: SPEC_ROOT,
    ignore: ["**/*.setup.spec.ts"],
  });
  const specs = [];
  for (const rel of glob) {
    if (!filter || rel.includes(filter)) {
      specs.push(rel);
    }
  }
  specs.sort();
  return specs;
}

async function main() {
  const filter = process.argv[2] || "";
  const specs = await collectSpecs(filter);

  if (specs.length === 0) {
    console.error(
      filter
        ? `No spec files matched filter "${filter}" under ${SPEC_ROOT}`
        : `No spec files found under ${SPEC_ROOT}`,
    );
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const outfiles = [];
  for (const rel of specs) {
    const entry = path.join(SPEC_ROOT, rel);
    const outfile = path.join(OUT_DIR, rel.replace(/\.ts$/, ".cjs"));
    fs.mkdirSync(path.dirname(outfile), { recursive: true });
    await esbuild.build({
      ...esbuildOptions,
      entryPoints: [entry],
      outfile,
    });
    outfiles.push(outfile);
  }

  const result = spawnSync(process.execPath, ["--test", ...outfiles], {
    stdio: "inherit",
  });
  process.exit(result.status ?? 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
