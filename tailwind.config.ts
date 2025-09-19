import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern gradient backgrounds
        body: "#f8fafc",
        header_bg: "rgba(255, 255, 255, 0.95)",
        
        // Enhanced purple system
        purple_main: "#8b5cf6",
        purple_light: "#a78bfa",
        purple_dark: "#7c3aed",
        purple_50: "#faf5ff",
        purple_100: "#f3e8ff",
        purple_200: "#e9d5ff",
        purple_300: "#d8b4fe",
        purple_400: "#c084fc",
        purple_500: "#a855f7",
        purple_600: "#9333ea",
        purple_700: "#7c3aed",
        purple_800: "#6b21a8",
        purple_900: "#581c87",
        
        // Modern heading colors
        heading_main: "#1e293b",
        dark_heading_main: "#f8fafc",
        
        // Enhanced base colors
        base_one: "#64748b",
        dark_base_one: "#cbd5e1",
        
        // Modern dark mode
        dark_body: "#0f172a",
        dark_heading: "#1e293b",
        
        // Accent colors for modern design
        accent_blue: "#3b82f6",
        accent_green: "#10b981",
        accent_pink: "#ec4899",
        accent_orange: "#f97316",
        
        // Glass morphism
        glass_white: "rgba(255, 255, 255, 0.25)",
        glass_dark: "rgba(15, 23, 42, 0.25)",
        
        // Partners and subtle colors
        partner: "#94a3b8",
        partner_hover: "#8b5cf6",
        
        // Status colors
        success: "#059669",
        warning: "#d97706",
        error: "#dc2626",
        info: "#0284c7",
      },
      
      // Enhanced spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Modern shadows
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'modern': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'modern-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.4)',
      },
      
      // Modern border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // Animation and transitions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      
      // Enhanced typography
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      // Modern gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
        'gradient-hero': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
      },
      
      // Backdrop blur for glassmorphism
      backdropBlur: {
        'xs': '2px',
      },
    },
    
    fontFamily: {
      league_spartan: ["var(--font-league_spartan_sans)", "system-ui", "sans-serif"],
      inter: ["var(--font-inter)", "system-ui", "sans-serif"],
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        // Glassmorphism utility
        '.glass': {
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
        
        '.glass-dark': {
          background: 'rgba(15, 23, 42, 0.25)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        
        // Modern button utilities
        '.btn-modern': {
          padding: '12px 24px',
          borderRadius: '12px',
          fontWeight: '600',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(0)',
        },
        
        '.btn-modern:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        
        // Text gradient utility
        '.text-gradient': {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        
        // Smooth scrolling
        '.smooth-scroll': {
          scrollBehavior: 'smooth',
        },
        
        // No scrollbar but still scrollable
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
      };
      
      addUtilities(newUtilities);
      
      // Add component classes
      const components = {
        '.container-modern': {
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          
          '@screen sm': {
            padding: '0 1.5rem',
          },
          
          '@screen lg': {
            padding: '0 2rem',
          },
        },
        
        '.card-modern': {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
        },
        
        '.card-modern-dark': {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.3)',
        },
      };
      
      addComponents(components);
    },
  ],
};

export default config;