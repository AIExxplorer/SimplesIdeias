// tailwind.config.cjs
module.exports = {
  content: [
    "./index.html", // Keep this if you have a root index.html
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}" // Include .astro and other types used by Astro
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#72BCA5',
        'secondary': '#F4DDB4',
        'accent': '#F1AE2B',
        'danger': '#BC0B27',
        'dark': '#4A2512',
      }
    },
  },
  plugins: [],
}