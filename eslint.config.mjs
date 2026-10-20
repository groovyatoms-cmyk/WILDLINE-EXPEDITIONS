import { defineConfig, globalIgnores } from 'eslint/config'
import next from '@next/eslint-plugin-next'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier/flat'

// eslint-config-next pulls in the typescript-eslint meta package, which refuses TypeScript 7.
// Until typescript-eslint supports it, the same rules are wired here from their own packages.
export default defineConfig([
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    languageOptions: { parser: tsParser, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { '@next/next': next, react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y, '@typescript-eslint': tsPlugin },
    settings: { react: { version: 'detect' } },
    rules: {
      ...next.configs['core-web-vitals'].rules,
      ...reactHooks.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      // Shell turns plain in-site <a href> clicks into router pushes, so anchors are deliberate.
      '@next/next/no-html-link-for-pages': 'off',
      // First render must match the static HTML, so some state is set after mount on purpose; the scroll store reads its ref once.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react/jsx-key': 'error',
      'react/no-unknown-property': 'error',
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  prettier,
  globalIgnores(['.next/**', '.vercel/**', '.swc/**', '.agents/**', '.claude/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts']),
])
