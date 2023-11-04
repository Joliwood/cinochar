/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      'cupcake',
      'dracula',
    ],
    // prefix: 'border-radius',
  },
  theme: {
    screens: {
      xs: '350px',
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
};
