// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
export default {
    input: "./src/index.ts",
    output: {
        format: "iife",
        file: "./dist/bundle.js",
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript({
            tsconfig: "./tsconfig.json",
            noEmitOnError: true,
        }),
    ],
};