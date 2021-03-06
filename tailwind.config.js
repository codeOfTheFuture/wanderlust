module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "mountain-jump": "url(/assets/images/jumping-mountain.png)",
        "login-blurred": "url(/assets/images/login-blurred.png)",
      },
    },
  },
  plugins: [],
};
