import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs", "iife"],
    dts: true,
    clean: true,
    shims: true,
    skipNodeModulesBundle: true,
    target: "esnext",
    minify: true,
});