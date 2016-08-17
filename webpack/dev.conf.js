import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import * as i18n from '../i18n';
import base, { PATHS } from './base.conf';
const I18N_KEYS = Object.keys(i18n);

export const WEBPACK_HOST = process.env.HOST || 'localhost';
export const WEBPACK_PORT = process.env.PORT || 3006;

// add hot-reload related code to entry chunks
function addDevServerEntry (entry) {
    return Object.keys(entry).reduce((res, name) => {
        res[name] = [
            `webpack-dev-server/client?http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
            'webpack/hot/only-dev-server',
            entry[name]
        ];
        return res;
    }, {});
}

const webpackDevConf = I18N_KEYS.map(lang => {
    return merge(base, {
        target: 'electron-renderer',
        entry: addDevServerEntry(base.entry),
        output: {
            path: path.resolve(PATHS.DIST, lang)
        },
        plugins: [
            new webpack.DefinePlugin({
                __I18N_LANG__: JSON.stringify(lang),
                __MOMENT_LOCALE__: JSON.stringify(lang),
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    });
});


export const webpackDevServerConf = {
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    contentBase: PATHS.DIST,
    stats: {
        colors: true
    }
};

export default webpackDevConf;
