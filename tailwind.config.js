/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,jsx,ts,tsx}",
      "./_components/**/*.{js,jsx,ts,tsx}", // Inclua todos os componentes reutilizáveis
    ],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  