module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended'
  ],
  plugins: [
      'html' // required to lint *.vue files
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  globals: {
      __I18N_LANG__: true,
      __MOMENT_LOCALE__: true
  },
  rules: {
    'max-len': [1, 120],
    'no-unused-vars': 0,
    'no-console': 1
  }
};
