module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2019,
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
