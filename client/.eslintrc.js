module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  rules: {
    'linebreak-style': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'no-console': 'off',
    'react/no-unescaped-entities': 0,
    'no-underscore-dangle': 'off',
  },
};
