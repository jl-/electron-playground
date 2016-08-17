import merge from 'webpack-merge';
import base from './base.conf';
import webpack from 'webpack';

const conf = merge(base, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
});

delete conf.entry;

export default conf;
