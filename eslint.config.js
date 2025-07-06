import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.2' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'warn',
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['./src/**/*.test.{js,jsx}', './src/**/*.spec.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
      },
    },
  },
  {
    files: [
      '*.config.js',
      'babel.config.js',
      'postcss.config.js',
      'server/**/*.js',
      'server/**/*.test.js',
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        sourceType: 'script',
      },
    },
  },
  prettierConfig,
];
