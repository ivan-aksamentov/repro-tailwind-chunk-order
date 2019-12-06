module.exports = ({ file, _1, env }) => ({
  plugins: {
    'postcss-omit-import-tilde': {},

    'postcss-easy-import': { root: file.dirname },

    tailwindcss: {},

    'postcss-preset-env': {
      stage: 2,
      features: {
        'postcss-custom-properties': { preserve: false },
      },
      autoprefixer: {
        remove: false,
        grid: true,
        flexbox: true,
      },
    },

    cssnano: {
      // don't normalize whitespace to keep bundle readable
      preset: ['default', { normalizeWhitespace: false, discardComments: { removeAll: true } }],
    },
  },
})
