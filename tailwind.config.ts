/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.14em' }],
      sm: ['0.875rem', { lineHeight: '1.14em' }],
      base: ['1rem', { lineHeight: '1.14em' }],
      lg: ['1.125rem', { lineHeight: '1.14em' }],
      xl: ['1.375rem', { lineHeight: '1.14em' }],
      '2xl': ['1.5rem', { lineHeight: '1.14em' }],
      '3xl': ['1.875rem', { lineHeight: '1.14em' }],
      '4xl': ['2.25rem', { lineHeight: '1.14em' }],
      '5xl': ['3rem', { lineHeight: '1.14em' }],
      '6xl': ['3.75rem', { lineHeight: '1.14em' }],
      '7xl': ['4.5rem', { lineHeight: '1.14em' }],
      '8xl': ['6rem', { lineHeight: '1.14em' }],
      '9xl': ['8rem', { lineHeight: '1.14em' }],
    },
    extend: {
      screens: {
        laptop: '1024px',
        tablet: '768px',
        mobile: '640px',
        phone: '480px',
      } as const,
      colors: {
        primary: '#095bf3',
        secondary: '#9acefc',
        bg: '#000',
        twitter: '#08a0e9',
        freemint: '#c6f120',
        warpcast: '#794aee',
        grey: '#848795',
        'base-chain': '#0154FD',
        metamask: '#E8831D',
      } as const,
    },
  },
  plugins: [
    require('./tailwind-plugins/scrollbar.js'),
    require('./tailwind-plugins/padding.js'),
  ],
};

export default config;
