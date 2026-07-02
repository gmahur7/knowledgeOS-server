import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  // Ignore build output and dependencies.
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },

  // Base JS recommended rules.
  js.configs.recommended,

  // TypeScript recommended rules (type-checked).
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  // Config files run in Node and aren't part of the app's tsconfig program.
  {
    files: ['*.js', '*.config.js'],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // Keep Prettier last so it disables any formatting-related rules.
  prettier
);
