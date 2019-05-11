var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var PATHS = {
  app: path.resolve(__dirname, 'v2/app'),
  public: path.resolve(__dirname, 'public/js')
};

var common = {
  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};

// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      'babel-polyfill',
      PATHS.app + '/main.js'
    ],
    output: {
      path: '/',
      filename: 'bundle.js',
      publicPath: '/'
    },
    devtool: 'eval',
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loaders: ['eslint'],
          include: PATHS.app
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'react-hot',
          include: PATHS.app
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets:['es2015', 'react', 'stage-2']
          }
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"development"',
          'SCREENER_API_URL': '"/api/v2"',
          'REALTIME_KEY': '"v9Qffn"',
          'REALTIME_TOKEN': '"4YNxBJ4SrZ92"',
          'INTERCOM_APP_ID': '"nkzcjdop"',
          'GOOGLE_ANALYTICS_ID': '"UA-46810443-1"'
        }
      })
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    entry: [
      'babel-polyfill',
      PATHS.app + '/main.js'
    ],
    output: {
        path: PATHS.public,
        filename: 'bundle-BJnrgKZdE.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets:['es2015', 'react', 'stage-2']
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"',
          'SCREENER_API_URL': '"/api/v2"',
          'REALTIME_KEY': '"v9Qffn"',
          'REALTIME_TOKEN': '"4YNxBJ4SrZ92"',
          'INTERCOM_APP_ID': '"hifoqfmg"',
          'GOOGLE_ANALYTICS_ID': '"UA-46810443-1"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}
