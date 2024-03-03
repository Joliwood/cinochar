module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript'],
  plugins: ['import'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'db/'],
  rules: {
    'no-console': 1,
    'react/jsx-filename-extension': 'off',
  },
};