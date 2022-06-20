const os = require('os');

const options = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'jest', 'react', 'react-hooks'],
  env: {
    node: true,
    'jest/globals': true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'react-hooks/exhaustive-deps': 0,
    'no-alert': 'error',
    'no-eq-null': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'error',
    'no-useless-call': 'error',
    'react/jsx-fragments': ['error', 'element'],
    'prefer-promise-reject-errors': 'error',
    'react/prop-types': 'error',
    'react/require-default-props': 'error',
    'react/button-has-type': 'error',
    'no-console': ['error', { allow: ['error'] }],
    'react/static-property-placement': ['error', 'static public field'],
    'no-underscore-dangle': 'error',
    'linebreak-style': os.EOL === '\n' ? ['error', 'unix'] : 'off',
    'react/jsx-no-bind': [
      'error',
      {
        ignoreDOMComponents: false,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false
      }
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: true }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/imports-first': ['error', 'absolute-first'],
    'import/extensions': ['error', 'always', { js: 'ignorePackages' }]
  },
  overrides: [
    {
      files: ['*/components/**/**.js'],
      rules: {
        'no-restricted-imports': [
          'warn',
          {
            paths: [
              {
                name: 'react-i18next',
                message:
                  'translate in the container and pass down translated string instead.'
              },
              {
                name: 'react-redux',
                message:
                  'access redux state in the container and pass down data needed instead.'
              }
            ]
          }
        ]
      }
    }
  ],
  globals: {
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
    fetch: true
  },
  parser: 'babel-eslint'
};

module.exports = options;
