/** Paleta y tipografía tomadas del sistema de diseño de Figma */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F2E9',
        forest: { DEFAULT: '#1F4D3A', dark: '#173B2C' },
        mint: '#E2EDE6',
        terra: { DEFAULT: '#C2552D', dark: '#A8451F', soft: '#F7E3DA' },
        ink: '#1E2420',
        muted: '#5A655E',
        line: '#E2DACB',
        star: '#E5A100',
        call: { DEFAULT: '#16803F', dark: '#126A34' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      boxShadow: {
        soft: '0 1px 2px rgba(30,36,32,.04), 0 4px 16px rgba(30,36,32,.05)',
      },
    },
  },
  plugins: [],
}
