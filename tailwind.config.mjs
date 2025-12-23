/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        xs: "375px",
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1496px",
        "3xl": "1920px",
      },
      fontFamily: {
        PrimaryFont: ["DM Sans", "serif"],
      },
      colors: {
        textGrey: "#767676",
        textBlack: "#262626",
        bgGrey: "#979797",
        textOffwhite: "#C4C4C4",
      },
    },
  },
  plugins: [],
};
