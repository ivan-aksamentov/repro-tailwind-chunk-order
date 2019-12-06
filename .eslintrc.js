const path = require('path')

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      globalReturn: false,
    },
    project: './tsconfig.json',
    extraFileExtensions: ['.json'],
    warnOnUnsupportedTypeScriptVersion: true,
  },
  globals: {},
  extends: [
    'react-app',

    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',

    '@typescript-eslint',
    '@typescript-eslint/tslint',

    'prettier',
  ],
  rules: {
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    'import/order': 'warn',
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': ['warn', { assert: 'either' }],
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    'no-shadow': 'off',
    'prettier/prettier': 'warn',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/state-in-constructor': 'off',

    'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],

    '@typescript-eslint/tslint/config': ['warn', { lintFile: path.join(__dirname, 'tslint.json') }],

    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',

    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
  },
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: [
        '.eslintrc.js',
        'babel.config.js',
        'jest.config.js',
        'postcss.config.js',
      ],
      rules: {
        'global-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
