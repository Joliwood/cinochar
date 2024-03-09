module.exports = {
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  plugins: ['import', 'jsx-a11y', 'react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'ts', '.tsx'] }],
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'react/no-unescaped-entities': 0,
    'no-underscore-dangle': 'off',
    'react/function-component-definition': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'arrow-body-style': 'off',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],
  },
  ignorePatterns: ['tailwind.config.js'],
};
