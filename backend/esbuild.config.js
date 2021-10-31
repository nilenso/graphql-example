const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");
require("dotenv").config();

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outfile: "dist/build.js",
    bundle: true,
    minify: true,
    platform: "node",
    sourcemap: true,
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
