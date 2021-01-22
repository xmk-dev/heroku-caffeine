module.exports = {
  env: {
    jest: true,
    node: true,
    es2020: true,
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/style',
    'plugin:jest/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended',
    'plugin:markdown/recommended',
    'plugin:switch-case/recommended',
    'plugin:optimize-regex/recommended',
    'plugin:eslint-comments/recommended',
  ],
  plugins: [
    'jest',
    'sonarjs',
    'unicorn',
    'security',
    'markdown',
    'filenames',
    'no-secrets',
    'switch-case',
    'optimize-regex',
    'eslint-comments',
    'simple-import-sort',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'no-useless-constructor': ['off'],
        '@typescript-eslint/no-useless-constructor': ['error'],
      },
    },
  ],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'simple-import-sort/sort': 'error',
    'import/prefer-default-export': 'off',
    'no-secrets/no-secrets': [
      'error',
      {
        additionalRegexes: {
          'Basic Auth': 'Authorization: Basic [A-Za-z0-9+/=]*',
        },
      },
    ],
    'filenames/match-exported': [0, 'kebab'],
    'filenames/no-index': 0,
  },
};
