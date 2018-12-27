import alias from "rollup-plugin-alias";
import typescript from "rollup-plugin-typescript2";
import prettier from "rollup-plugin-prettier";

import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";

const pluginsAndSo = {
  plugins: [typescript(/*{ plugin options }*/)]
};

export default [
  {
    input: "./src/node/index.ts",
    output: {
      file: "./build/node/index.js",
      format: "cjs"
    }
  },
  {
    input: "./src/xhr/index.ts",
    output: {
      file: "./build/xhr/index.js",
      format: "umd",
      name:"Karin"
    }
  }
].map(value => Object.assign(value, pluginsAndSo));
