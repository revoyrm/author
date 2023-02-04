module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#005067',
      'primary-dark': '#00283c',
      'primary-light': '#407c95',
      'primary-lightest': '#8aa3b0',
      secondary: '#e5edef',
      'secondary-dark': '#b3bbbd',
      'secondary-light': '#ffffff',
      paper: '#ffffff',
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
};
