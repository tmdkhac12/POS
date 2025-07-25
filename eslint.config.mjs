import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
    ], 
    rules: { 
        "no-unused-vars": "off", 
        "import/no-unresolved": "error",
        "import/named": "error" 
    }, 
    parserOptions: { 
      ecmaVersion: "latest",
      sourceType: "module"
    }
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: {...globals.node, ...globals.browser} } },
]);
