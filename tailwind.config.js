/* eslint-disable */
/** @type {import('tailwindcss').Config} */

const designSystem = require('./design-system.json');
const tokens = designSystem.tokens;
const layout = designSystem.layout;

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: layout.container.padding.mobile,
        sm: layout.container.padding.mobile,
        md: layout.container.padding.tablet,
        lg: layout.container.padding.tablet,
        xl: layout.container.padding.desktop,
        '2xl': layout.container.padding.desktop,
      },
      screens: {
        sm: layout.maxWidth.sm,
        md: layout.maxWidth.md,
        lg: layout.maxWidth.lg,
        xl: layout.maxWidth.xl,
        '2xl': layout.maxWidth['2xl'],
      },
    },
    extend: {
      colors: {
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        background: tokens.colors.background,
        text: tokens.colors.text,
        border: tokens.colors.border,
        state: tokens.colors.state,
      },
      fontFamily: {
        sans: tokens.typography.fontFamily.sans.split(',').map(f => f.trim()),
        mono: tokens.typography.fontFamily.mono.split(',').map(f => f.trim()),
        display: tokens.typography.fontFamily.display.split(',').map(f => f.trim()),
      },

      fontSize: tokens.typography.fontSize,

      fontWeight: tokens.typography.fontWeight,

      letterSpacing: tokens.typography.letterSpacing,

      lineHeight: tokens.typography.lineHeight,

      spacing: tokens.spacing,

      borderRadius: tokens.radius,

      boxShadow: {
        ...tokens.shadows,
        'glow-primary-sm': tokens.shadows.glow.primary.sm,
        'glow-primary': tokens.shadows.glow.primary.md,
        'glow-primary-lg': tokens.shadows.glow.primary.lg,
        'glow-secondary-sm': tokens.shadows.glow.secondary.sm,
        'glow-secondary': tokens.shadows.glow.secondary.md,
        'glow-secondary-lg': tokens.shadows.glow.secondary.lg,
        'colored-primary': tokens.shadows.colored.primary,
        'colored-secondary': tokens.shadows.colored.secondary,
      },

      transitionDuration: tokens.transitions.duration,

      transitionTimingFunction: {
        ease: tokens.transitions.timing.ease,
        'ease-in': tokens.transitions.timing.easeIn,
        'ease-out': tokens.transitions.timing.easeOut,
        'ease-in-out': tokens.transitions.timing.easeInOut,
        linear: tokens.transitions.timing.linear,
      },

      zIndex: tokens.zIndex,

      screens: {
        sm: tokens.breakpoints.sm,
        md: tokens.breakpoints.md,
        lg: tokens.breakpoints.lg,
        xl: tokens.breakpoints.xl,
        '2xl': tokens.breakpoints['2xl'],
      },

      gap: layout.grid.gap,

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'scale-in-center': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }
        },
      },

      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'scale-in-center': 'scale-in-center 0.4s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-soft': 'bounce-soft 1s infinite',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-radial-top': 'radial-gradient(circle at top, var(--tw-gradient-stops))',
        'gradient-radial-center': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #8e458c 0%, #b074ad 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #c84702 0%, #d37b57 100%)',
        'gradient-primary-vertical': 'linear-gradient(180deg, #8e458c 0%, #b074ad 100%)',
        'gradient-secondary-vertical': 'linear-gradient(180deg, #c84702 0%, #d37b57 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(142, 69, 140, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(200, 71, 2, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(142, 69, 140, 0.2) 0px, transparent 50%)',
      },

      backdropBlur: {
        xs: '2px',
        '4xl': '80px',
      },
    },
  },

  variants: {
    extend: {
      opacity: ['disabled', 'group-hover'],
      cursor: ['disabled'],
      backgroundColor: ['active', 'disabled', 'group-hover'],
      borderColor: ['active', 'disabled', 'group-hover'],
      textColor: ['active', 'disabled', 'group-hover'],
      scale: ['group-hover', 'active'],
      translate: ['group-hover', 'active'],
    }
  },

  plugins: [
    function ({ addUtilities, addComponents, theme }) {
      const textUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-gradient-primary': {
          'background': theme('backgroundImage.gradient-primary'),
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.text-gradient-secondary': {
          'background': theme('backgroundImage.gradient-secondary'),
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      };

      const layoutComponents = {
        '.section-container': {
          'width': '100%',
          'margin-left': 'auto',
          'margin-right': 'auto',
          'padding-left': layout.container.padding.mobile,
          'padding-right': layout.container.padding.mobile,
          '@screen md': {
            'padding-left': layout.container.padding.tablet,
            'padding-right': layout.container.padding.tablet,
          },
          '@screen xl': {
            'padding-left': layout.container.padding.desktop,
            'padding-right': layout.container.padding.desktop,
          },
        },
        '.section-spacing-sm': {
          'padding-top': layout.section.spacing.sm,
          'padding-bottom': layout.section.spacing.sm,
        },
        '.section-spacing': {
          'padding-top': layout.section.spacing.md,
          'padding-bottom': layout.section.spacing.md,
        },
        '.section-spacing-lg': {
          'padding-top': layout.section.spacing.lg,
          'padding-bottom': layout.section.spacing.lg,
        },
        '.hero-spacing': {
          'min-height': '100vh',
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        },
      };

      const visualEffects = {
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          'background': 'rgba(0, 0, 0, 0.3)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
      };

      addUtilities(textUtilities);
      addComponents(layoutComponents);
      addUtilities(visualEffects);
    },
  ]
}
