const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(input|modal|navbar|form).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
}
