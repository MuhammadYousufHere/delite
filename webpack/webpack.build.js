import ESLintPlugin from 'eslint-webpack-plugin'
import path from 'path'
import nodeExternals from 'webpack-node-externals'
import Webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const { NODE_ENV, EXPOSE_SCHEMA, BUNDLE_MODULES } = process.env
export default {
  entry: {
    delite: './src/main'
  },
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    libraryTarget: 'umd'
  },
  optimization: {
    splitChunks: { name: 'vendor', chunks: 'all' },
    innerGraph: true,
    mergeDuplicateChunks: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  externals:
    BUNDLE_MODULES == 'true'
      ? [
          /* eslint-disable @typescript-eslint/no-unused-vars */
          function ({ context, request }, callback) {
            /** This will disable the schema fetching in the production */
            const blacklist =
              EXPOSE_SCHEMA == 'false' ? ['@apollo/subgraph'] : []

            if (/^fsevents$/.test(request) || blacklist.includes(request)) {
              return callback(request)
            }
            callback()
          }
        ]
      : nodeExternals(),
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'webpack-graphql-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'schema', to: 'schema' },
        { from: 'graphql', to: 'graphql' },
        { from: 'serverless.yaml' },
        { from: '.env' }
      ]
    }),
    new ESLintPlugin({
      files: 'src/**/*.ts',
      threads: true,
      failOnError: true,
      emitError: true
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // include specific files based on a RegExp
      include: /srv/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    }),
    ...(BUNDLE_MODULES == 'true'
      ? [
          new Webpack.IgnorePlugin({
            checkResource(resource) {
              const lazyImports = [
                '@nestjs/microservices',
                'cache-manager',
                '@nestjs/microservices/microservices-module',
                '@nestjs/websockets/socket-module',
                'class-transformer',
                'class-transformer/storage',
                'apollo-server-fastify',
                'class-validator',
                '@apollo/subgraph',
                '@apollo/gateway',
                '@apollo/subgraph/package.json',
                '@apollo/subgraph/dist/directives',
                'bluebird',
                'bufferutil',
                'utf-8-validate',
                'bufferutil',
                'fsevents',
                'class-transformer/cjs/storage',
                'cache-manager/package.json'
              ]
              if (lazyImports.includes(resource)) {
                try {
                  //require.resolve(resource);
                  return true
                } catch (err) {
                  return true
                }
              }
              return false
            }
          })
        ]
      : [])
  ]
}
