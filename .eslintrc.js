module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers'],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', { code: 90 }],
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          '/^react/',
          'module',
          '/^components/',
          '/^pages/',
          '/^constants/',
          '/^schemas/',
          '/^settings/',
          '/^utils/',
          '/^interfaces/',
          '/^queries/',
          '/^services/',
          '/^hooks/',
          '/^stores/',
          '/^assets/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
}
