import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginImport from 'eslint-plugin-import';
import pluginN from 'eslint-plugin-n';
import babelParser from '@babel/eslint-parser';
import pluginReactHooks from 'eslint-plugin-react-hooks';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      globals: globals.browser,
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      },
    },
    settings: {
      react: {
        version: "detect"  // se puede especificar la versión exacta, por ejemplo "17.0"
      }
    },
    plugins:{
      js: pluginJs,
      react: pluginReact,
      import: pluginImport,
      n: pluginN,
      'react-hooks': pluginReactHooks
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'react-hooks/rules-of-hooks': 'error', // Verifica las reglas de los hooks
      'react-hooks/exhaustive-deps': 'warn', // Verifica las dependencias de los efectos
      // 'no-console': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/export': 'error',
      'n/handle-callback-err': 'error'
    }
  }
];