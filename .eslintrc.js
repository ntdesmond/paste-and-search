module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:import/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb-typescript', 'plugin:import/typescript'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-spaced-func': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'object-curly-newline': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/destructuring-assignment': 0,
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/require-default-props': 0,
  },
};
