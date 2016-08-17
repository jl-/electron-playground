import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import postcssNext from 'postcss-cssnext';
import postcssBrowserReporter from 'postcss-browser-reporter';
import postcssReporter from 'postcss-reporter';
import postcssScss from 'postcss-scss';

const ROOT = path.resolve(__dirname, '..');
export const PATHS = {
    ROOT,
    NODE_MODULES: path.resolve(ROOT, 'node_modules'),
    SRC: path.resolve(ROOT, 'src'),
    MODULES: path.resolve(ROOT, 'src', 'modules'),
    COMPONENTS: path.resolve(ROOT, 'src', 'components'),
    APP: path.resolve(ROOT, 'src', 'App'),
    STYLES: path.resolve(ROOT, 'src', 'styles'),
    DIST: path.resolve(ROOT, 'dist'),
    I18N: path.resolve(ROOT, 'i18n'),
    UTILS: path.resolve(ROOT, 'utils'),
    STATICS: path.resolve(ROOT, 'statics'),
    ELECTRON_MAIN: path.resolve(ROOT, 'src', 'electron', 'main.js'),
    ASSETS_PUBLIC: ''
};

export const SASS_LOADER_CONF = [
    `includePaths[]=${PATHS.SRC}`
].join('&');

export default {
  entry: {
      app: path.resolve(PATHS.SRC, 'entry.js')
  },
  output: {
    path: PATHS.DIST,
    publicPath: PATHS.ASSETS_PUBLIC,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.css', '.scss'],
    alias: {
        src: PATHS.SRC,
        styles: PATHS.STYLES,
        modules: PATHS.MODULES,
        components: PATHS.COMPONENTS,
        utils: PATHS.UTILS,
        statics: PATHS.STATICS,
        core: path.resolve(PATHS.SRC, 'core'),
        configs: path.resolve(PATHS.SRC, 'configs')
    }
  },
  module: {
    preLoaders: [{
        test: /\.(vue|js)$/,
        loader: 'eslint',
        exclude: [PATHS.NODE_MODULES]
    }],
    loaders: [{
        test: /\.vue$/,
        loader: 'vue',
        exclude: [PATHS.NODE_MODULES]
      }, {
        test: /\.js$/,
        loader: 'babel',
        exclude: [PATHS.NODE_MODULES]
      }, {
          test: /\.(css|scss)$/,
          loader: `style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?${SASS_LOADER_CONF}`,
          include: [PATHS.APP, PATHS.COMPONENTS]
      }, {
          test: /\.(css|scss)$/,
          loader: `style!css!postcss!sass?${SASS_LOADER_CONF}`,
          include: [PATHS.STYLES]
      }, {
          test: /\.(css|scss)$/,
          loader: 'style!css!postcss',
          include: [PATHS.NODE_MODULES, PATHS.STATICS]
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000
        }
    }]
  },
  plugins: [new HtmlWebpackPlugin({
      inject: 'body',
      hash: false,
      title: 'Electron Playground',
      filename: 'index.html',
      favicon: 'statics/images/favicon.ico',
      template: path.resolve(PATHS.SRC, 'tpl.html')
  }), new webpack.optimize.OccurenceOrderPlugin()
    , new webpack.NoErrorsPlugin()
  ],
  postcss: (webpack) => {
      return {
          plugins: [
              postcssImport({
                  addDependencyTo: webpack
              }),
              postcssUrl(),
              postcssNext({
                  autoprefixer: {
                      browser: '> 1%, last 4 versions, Firefox ESR, ios >= 7'
                  }
              }),
              postcssBrowserReporter(),
              postcssReporter()
          ],
          syntax: postcssScss
      }
  }
};

