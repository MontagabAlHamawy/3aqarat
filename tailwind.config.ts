/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "15px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      xl: "1024px",
    },
    extend: {
      colors: {
        primary: "#1a2744",
        secondary: "#667085",
        accent: {
          DEFAULT: "#106cd8",
          hover: "#3c8ce9",
        },
        body: "#18171d",
        section: "#272831",
        sidpar: "#222029",
        icone: "#4c5366",
        text: "#c8cddb",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
};
