/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },

    extend: {
      colors: {
        "primary-orange": "hsl(26, 100%, 55%)",
        "primary-pale-orange": "hsl(25, 100%, 94%)",
        "neutral-very-dark-blue": "hsl(220, 13%, 13%)",
        "neutral-dark-grayish-blue": "hsl(219, 9%, 45%)",
        "neutral-grayish-blue": "hsl(220, 14%, 75%)",
        "neutral-light-grayish-blue": "hsl(223, 64%, 98%)",
        "neutral-white": "hsl(0, 0%, 100%)",
        "neutral-black": "hsl(0, 0%, 0%)",
      },
      fontFamily: {
        "Kumbh-sans": ["Kumbh Sans", "sans-serif"],
      },
      fontSize: {
        "body-copy": "16px",
      },
    },
  },
  plugins: [],
};
