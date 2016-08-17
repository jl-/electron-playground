import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import * as i18n from '../i18n';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import base, {
    PATHS,
    SASS_LOADER_CONF
} from './base.conf';
const I18N_KEYS = Object.keys(i18n);

const targetNode = {
    __filename: true,
    __dirname: true
};
// const nodeModules = fs.readdirSync('node_modules')
//     .filter(x => ['.bin', '.DS_Store'].indexOf(x) === -1)
//     .reduce((res, mod) => {
//         /* eslint no-param-reassign: 0 */
//         res[mod] = `commonjs ${mod}`;
//         return res;
//     }, {});

const externalsPlugin = new webpack.ExternalsPlugin('commonjs', [
    'electron'
]);

export const webpackProdMainConf = I18N_KEYS.map(lang => {
    return merge.smart(base, {
        target: 'electron',
        entry: PATHS.ELECTRON_MAIN,
        output: {
            path: path.resolve(PATHS.DIST, lang),
            filename: 'main.js'
        },
        // node: targetNode,
        module: {
            loaders: [{
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    `css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?${SASS_LOADER_CONF}`, {
                    }),
                include: [PATHS.APP, PATHS.COMPONENTS]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                __I18N_LANG__: JSON.stringify(lang),
                __MOMENT_LOCALE__: JSON.stringify(lang),
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }), new ExtractTextPlugin('style.css')
            , externalsPlugin
            //  , new webpack.optimize.UglifyJsPlugin({
            //      compress: {
            //          warnings: false
            //      }
            //  })
        ]
    });
});

export const webpackProdRendererConf = I18N_KEYS.map(lang => {
    return merge(base, {
        target: 'electron-renderer',
        output: {
            path: path.resolve(PATHS.DIST, lang),
            filename: 'main.js'
        },
        module: {
            loaders: [{
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    `css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?${SASS_LOADER_CONF}`, {
                    }),
                include: [PATHS.APP, PATHS.COMPONENTS]
            }]
        },
        plugins: [
            new webpack.DefinePlugin({
                __I18N_LANG__: JSON.stringify(lang),
                __MOMENT_LOCALE__: JSON.stringify(lang),
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }), new ExtractTextPlugin('style.css')
            // , new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     }
            // })
        ]
    });
});


