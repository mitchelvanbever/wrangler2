import esbuild from "esbuild";
import path from "path";

// the expectation is that this is being run from the project root

async function run() {
  // main cli
  await esbuild.build({
    entryPoints: ["./src/cli.ts"],
    bundle: true,
    outdir: "./wrangler-dist",
    platform: "node",
    format: "cjs",
    // minify: true, // TODO: enable this again
    external: [
      "fsevents",
      "esbuild",
      "miniflare",
      "@miniflare/core",
      "@esbuild-plugins/node-globals-polyfill",
      "@esbuild-plugins/node-modules-polyfill",
    ], // todo - bundle miniflare too
    sourcemap: true,
    inject: [path.join(__dirname, "../import_meta_url.js")],
    define: {
      "import.meta.url": "import_meta_url",
    },
  });
}

run();
