/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/page/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        prompt: ['prompt', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: '#2A777F',
        mainBg: '#24B0BA',
        subText: '#333333',
        submit: '#23BA9C'
      },
    },
  },
  plugins: [],
};
