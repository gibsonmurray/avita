import { defineConfig } from "tsup"

export default defineConfig({
    entry: {
        index: "src/index.ts",
        router: "src/router.ts",
    },
    format: ["esm", "cjs", "iife"],
    globalName: "Avita",
    dts: true,
    clean: true,
    sourcemap: true,
    skipNodeModulesBundle: true,
    target: "esnext",
    minify: true,
})
