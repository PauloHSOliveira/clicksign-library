import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'dist/**', 
      'node_modules/**', 
      'rollup.config*.js', 
      'rollup.config*.cjs',
      '.eslintrc.js',
      '__tests__/**',
      'setupTests.ts',
    ],
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsparser,
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      ...eslintConfigPrettier.rules,
    },
  },
];
