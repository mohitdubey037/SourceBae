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
        'black': 'rgba(29, 36, 52, 1)',
        'grey': '#e1e1e1 !important',
        'green-700': 'rgba(0, 122, 90, 1)',
        'primary-pink-700': '#B23AFF !important',
        '1e1e1e': '#1E1E1E',
        'f9f9f9': '#f9f9f9',
      },
      height: {
        '40px': '40px',
        '39px': '39px',
        '100vh': '100vh',
        '100wh': '100wh',
      },
      fontFamily: {
        'Mulish-Light': 'MulishLight',
        'Mulish-Regular': 'MulishRegular',
        'Mulish-Medium': 'MulishMedium',
        'Mulish-SemiBold': 'MulishSemibold',
        'Mulish-Bold': 'MulishBold',
        'Mulish-ExtraLight': 'MulishExtraLight',
        'Mulish-ExtraBold': 'MulishExtraBold',
      },
      scale: {
        '80': '0.8',
        '85': '0.85'
      },
      fontSize: {
        '32': '32px'
      }
    },
  },
  plugins: [],
}


