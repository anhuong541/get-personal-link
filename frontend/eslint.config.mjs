import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    extends: ['next', 'prettier'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': ['error'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      'import/order': [
        1,
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'object',
            'type',
            'unknown'
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@(?!/).*', // scoped-package
              group: 'external',
              position: 'after'
            },
            {
              pattern: '@/*',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/*',
              group: 'type',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  }),
  { ignores: ['node_modules', 'dist', '.next'] }
]

export default eslintConfig
