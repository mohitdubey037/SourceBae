module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'navy-blue-700': "rgba(1, 95, 154, 1)",
        'navy-blue-100': "rgba(1, 95, 154, 0.12)",
        'black-500': "rgba(58, 58, 58, 0.5)",
        'light-blue-700': 'rgba(196, 196, 196, 1)',
        'blue-700': "rgba(92, 109, 255, 1)",
        'blue-100': "rgba(92, 109, 255, 0.12)",
        'grey': '#e1e1e1 !important',
        'green-700': 'rgba(0, 122, 90, 1)'
      },
      height: {
        '40px': '40px',
        '39px': '39px',
      }
    },
  },
  plugins: [],
}


