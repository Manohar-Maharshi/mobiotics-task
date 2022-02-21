module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["forest"],
    darkTheme: "dark",
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
