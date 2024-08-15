import { defineConfig } from "tsup"

export default defineConfig({
    entry: {
        index: "src/index.ts",
    },
    format: ["esm", "iife"],
    globalName: "Avita",
    dts: true,
    clean: true,
    skipNodeModulesBundle: true,
    target: "esnext",
    minify: true,
})
