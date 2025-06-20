// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {
        pin: "path('M12 0C5.5 0 0 5.5 0 12c0 6 6 10.5 12 18 6-7.5 12-12 12-18C24 5.5 18.5 0 12 0z')",
      },
      scale: {
        125: "1.25",
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "clip-path": (value) => ({
            clipPath: value,
          }),
        },
        { values: theme("clipPath") }
      );
    },
  ],
};
