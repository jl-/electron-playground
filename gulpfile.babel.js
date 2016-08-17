import gulp from 'gulp';
import run from 'run-sequence';
import del from 'del';
import webpack from 'webpack';
import childProcess from 'child_process';
import electron from 'electron-prebuilt';
import WebpackDevServer from 'webpack-dev-server';

import webpackDevConf, {
    WEBPACK_HOST,
    WEBPACK_PORT,
    webpackDevServerConf
} from './webpack/dev.conf';
import {
    webpackProdMainConf,
    webpackProdRendererConf
} from './webpack/prod.conf';

// pathes config
const CONF = {
    DIST: 'dist'
};

gulp.task('clean', done => del(CONF.DIST + '*', done));
gulp.task('statics', () => {
    return gulp.src('statics/**/*')
        .pipe(gulp.dest(CONF.DIST + '/statics'));
});
gulp.task('statics:watch', () => {
    gulp.watch('statics/**/*', ['statics']);
});

gulp.task('wp:dev', (done) => {
    const compiler = webpack(webpackDevConf);
    const devServer = new WebpackDevServer(compiler, webpackDevServerConf);
    compiler.plugin('done', () => {
        done && (done(), done = null);
    });
    devServer.listen(WEBPACK_PORT, WEBPACK_HOST, () => {
      /* eslint no-console: 0 */
      // console.log(err || 'Listening at %s:%s', WEBPACK_HOST, WEBPACK_PORT);
    });
});
gulp.task('wp:build-main', (done) => {
    webpack(webpackProdMainConf, function(err, stats) {
        done();
    });
});
gulp.task('wp:build-renderer', (done) => {
    webpack(webpackProdRendererConf, function(err, stats) {
        done();
    });
});

gulp.task('runelectron', (done) => {
    childProcess.spawn(electron, ['./dev-entry.js'], {
        stdio: 'inherit'
    }).on('close', function () {
        process.exit();
    });
    done();
})

gulp.task('dev', () => {
    run('clean', 'statics', 'statics:watch', 'wp:dev', 'runelectron');
});

gulp.task('prod', () => {
    run('clean', 'statics', 'wp:build-renderer', 'wp:build-main');
});
