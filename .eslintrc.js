module.exports = {
  env: {
    node: true,
    es2020: true,
    browser: true,
  },
  extends: [
    'airbnb-base',
  ],
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
  globals: {
    describe: true,
    context: true,
    beforeEach: true,
    afterEach: true,
    it: true,
    before: true,
    after: true,
    jest: true,
    expect: true,
  }
};
