/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Helvetica: ["Yantramanav", "sans-serif", "Poppins"],
        Inter: ["Inter", "sans-serif", "Poppins"],
      },
      colors: {
        _black_bg: "#000000e8",
        lightGrey: "#707281",
        placeholderColor: "#B2B3BD",
        Super_lightGrey: "#CFD0D5",
        _blue: "#1D43FF",
        _sidenav_bg: "#FAFBFD",
        _sidenav_color: "#414357",
        _light_white: "#a7a7a7",
        _white: "#ffffffd9",
        _sidenav_active_color: "#1D43FF",
        _sidenav_hover_bg: "#1d43ff1a",
        _chat_color: "#36464E",
        _dark_blue: "#000000",
        _prompt_chip_bg: "rgba(29, 67, 255, 0.1)",
        _helptool_bg: "#F7FAFC",
        _green_text: "#23C16B",
        _green_light: "rgba(35, 193, 107, 0.1)",
        _dark: "#000000",
        _switch_bg: "rgba(33, 150, 243, 0.1);",
        _welcometext_lightblue: "#A0A1AB",
      },
    },
  },
  plugins: [],
};
