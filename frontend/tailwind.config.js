module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.@(js|jsx|ts|tsx)"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
