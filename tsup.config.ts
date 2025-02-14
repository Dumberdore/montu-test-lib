import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/AddressAutocomplete.ts"],
    clean: true,
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true, // Include sourcemaps for easier debugging
    outDir: "dist",
});