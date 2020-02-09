const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const extractSass = new MiniCSSExtractPlugin({
  filename: '[name].css',
  disable: false
});

const plugins = [
  extractSass,
  new VueLoaderPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }
    )
  );
}

const devtool = process.env.NODE_ENV === 'production'
  ? 'source-map'
  : 'eval-source-map';

const vuePath = process.env.NODE_ENV === 'production'
  ? 'vue/dist/vue.min.js'
  : 'vue/dist/vue.js';

const mode = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development';

module.exports = {
  mode,
  entry: './src/index.js',
  devtool,
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '..', 'public', 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot|jpg|png|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader'
        ]
      },
      {
        test: /\.pug$/,
        use: 'pug-plain-loader'
      }
    ]
  },
  plugins,
  resolve: {
    alias: {
      vue: vuePath
    },
    extensions: ['.js', '.json', '.vue'],
    modules: ['node_modules', path.resolve(__dirname, 'src')]
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  }
};
