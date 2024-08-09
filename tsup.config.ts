import { defineConfig } from "tsup"

export default defineConfig({
    entry: {
        "avita/index": "src/index.ts",
        "avita/router": "src/router.ts",
    },
    format: ["esm", "cjs", "iife"],
    dts: true,
    clean: true,
    shims: true,
    skipNodeModulesBundle: true,
    target: "esnext",
    minify: true,
})
