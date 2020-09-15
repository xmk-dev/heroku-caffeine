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
  ],
  plugins: ['jest']
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
  },
};
