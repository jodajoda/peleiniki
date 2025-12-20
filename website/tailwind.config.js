/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // New warm, family-friendly fonts
        handwritten: ['Reenie Beanie', 'Dancing Script', 'cursive'],
        serif: ['Crimson Pro', 'Lora', 'Georgia', 'serif'],
        body: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        accent: {
          warm: '#ff8a65',
          sunset: '#ffa726',
          gold: '#ffd93d',
          rose: '#f06292',
          lavender: '#ba68c8',
        },
        // New warm, intimate color palette inspired by family photography
        warmPaper: '#faf7f3',
        cream: {
          50: '#fdfcfb',
          100: '#f9f6f1',
          200: '#f5f0e8',
          300: '#ede6da',
        },
        peach: {
          50: '#fef5f1',
          100: '#fce8df',
          200: '#f9d5c5',
          300: '#f5b89b',
        },
        terracotta: '#d4856e',
        sunsetOrange: '#e89b6f',
        goldenHour: '#f4c791',
        warmBrown: '#7a5e52',
        charcoal: '#3d3632',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #977669 0%, #d2bab0 100%)',
        'gradient-warm': 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #ff5e4d 0%, #ff9a3f 50%, #fad089 100%)',
        'gradient-dreamy': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 25px rgba(191, 160, 148, 0.5)',
        'glow-warm': '0 0 30px rgba(255, 138, 101, 0.4)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        fadeIn: 'fadeIn 0.5s ease-out',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeInDown: 'fadeInDown 0.6s ease-out forwards',
        slideInRight: 'slideInRight 0.7s ease-out',
        slideInLeft: 'slideInLeft 0.7s ease-out',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      boxShadow: {
        '3xl': '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
