/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,html}",
  ],
  theme: {
        extend: {
      boxShadow: {
        'custom-black': '10px 5px 0px black',
      },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xlg': '1280px',
    },
    colors: {
      transparent: 'transparent',
      theme_01: {
        vert: '#F5F378',
        vert_fonce: '#DFDD6A',
        rouge: '#F85D7B',
        rouge_fonce: '#F5375C',
        orange: '#FCC26B',
        orange_fonce: '#E3A343',
        mauve: '#DCC1FF',
        mauve_fonce: '#B687F2',
        blanc: '#fdf1ed',
        noir: '#1A1A1A',
      },
    },
    fontFamily: {
      'sans': ["Advent Pro", 'sans-serif'],
    },
  },
  plugins: [],
}}
