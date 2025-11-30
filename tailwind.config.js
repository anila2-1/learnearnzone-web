/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      keyframes: {
        blogTitle: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blogContent: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blogButton: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blogImage: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },

        /* 👇 NEW — CLOUD MOVE ANIMATION */
        cloudMove: {
          '0%': { backgroundPosition: '0% bottom' },
          '100%': { backgroundPosition: '100% bottom' },
        },
      },

      animation: {
        'slide-left': 'slideLeft 0.4s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'blog-title': 'blogTitle 0.2s ease-out',
        'blog-content': 'blogContent 0.6s ease-out',
        'blog-button': 'blogButton 0.5s ease-out',
        'blog-image': 'blogImage 0.2s ease-out',

        /* 👇 NEW — CLOUD ANIMATION */
        cloudMove: 'cloudMove 35s linear infinite',
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
}
