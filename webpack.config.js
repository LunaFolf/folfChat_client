const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        type: 'asset'
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        // test for styl files
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                includeCSS: true,
                resovleURL: true,
                compress: true,
                import: [
                  path.resolve(__dirname, 'src/styles/variables.styl')
                ]
              }
            }
          }
        ]
      },
      {
        // test for css, scss, and sass files
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json'],
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'api': path.resolve(__dirname, 'src/api')
    },
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  entry: {
    index: {
      import: __dirname + '/src/index.ts'
    }
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    clean: true
  },
  devServer: {
    client: {
      logging: 'info',
      progress: true
    },
    compress: true,
    open: false, // Super annoying when you keep having to restart the server
    port: 8080 // Should adjust in future to check for open ports
  },
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        styles: {
          name: 'styles',
          test: /\.(css|scss|sass|styl(us)?)$/,
          chunks: 'all',
          enforce: true
        },
        json: {
          name: 'json',
          type: 'json'
        }
      }
    },
    runtimeChunk: 'single'
  }
}
