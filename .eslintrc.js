module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: ['error', 2],
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'no-param-reassign': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'linebreak-style': 'off',
    'react/no-unstable-nested-components': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-shadow': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'import/no-named-as-default-member': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
  },
};
