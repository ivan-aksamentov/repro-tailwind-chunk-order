const development = process.env.NODE_ENV === 'development'
const production = process.env.NODE_ENV === 'production'
const loose = true

module.exports = api => {
  const calledByBabelLoader = api.caller(caller => Boolean(caller && caller.name === 'babel-loader'))
  return {
    compact: false,
    sourceType: 'unambiguous',
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 'core-js@3',
          modules: calledByBabelLoader ? false : 'commonjs',
          loose,
          shippedProposals: development,
          exclude: ['transform-typeof-symbol'],
        },
      ],
      ['@babel/preset-react', { useBuiltIns: true, development }],
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose }],
      ['@babel/plugin-proposal-object-rest-spread', { loose }],
      ['@babel/plugin-proposal-nullish-coalescing-operator', { loose }],
      ['@babel/plugin-proposal-optional-chaining', { loose }],
      ['@babel/plugin-proposal-numeric-separator', { loose }],
      '@babel/plugin-syntax-dynamic-import',
      '@loadable/babel-plugin',
      development && ['babel-plugin-typescript-to-proptypes', { typeCheck: './src/**/*.ts' }],
      development && 'babel-plugin-smart-webpack-import',
      production && ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }],
    ].filter(Boolean),
  }
}
