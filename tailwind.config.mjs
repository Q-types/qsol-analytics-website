/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E40AF',
          'blue-light': '#3B82F6',
          'blue-pale': '#EFF6FF',
        },
        slate: {
          DEFAULT: '#334155',
          light: '#64748B',
        },
        success: '#059669',
        warning: '#D97706',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
