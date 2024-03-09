module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript'],
  plugins: ['import'],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  ignorePatterns: ['node_modules/', 'dist/', 'db/'],
  rules: {
    'no-console': 'off',
    'react/jsx-filename-extension': 'off',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],
    'import/prefer-default-export': 'off',
  },
};
