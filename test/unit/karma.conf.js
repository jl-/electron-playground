import path from 'path';
import webpackTestConf from '../../webpack/test.conf';

const TEST_CONTEXT_FILE = path.resolve(__dirname, 'context.js');
const COVERAGE_DIR = path.resolve(__dirname, 'coverage');

module.exports = function(config){
    config.set({
        browsers: ['PhantomJS', 'ChromeWithoutSandbox'],
        customLaunchers: {
            ChromeWithoutSandbox: {
                base: 'Chrome',
                flags: ['--no-sandbox'] // with sandbox it fails under Docker
            }
        },
        frameworks: ['mocha'],
        reporters: ['mocha', 'coverage'],
        preprocessors: {
            [TEST_CONTEXT_FILE]: ['webpack']
        },
        plugins: [
            'karma-webpack',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-coverage',
            'karma-mocha-reporter',
            'karma-sourcemap-loader'
        ],
        singleRun: !!process.env.CI,
        autoWatch: !process.env.CI,
        files: [
            path.resolve(__dirname, '../../node_modules/babel-polyfill/dist/polyfill.js'),
            TEST_CONTEXT_FILE
        ],
        webpack: webpackTestConf,
        webpackMiddleware: {
            noInfo: true
        },
        coverageReporter: {
            dir: COVERAGE_DIR,
            reporters: [{
                type: 'json',
                subdir: '.',
                file: 'coverage.json'
            }, {
                type: 'lcov',
                subdir: '.'
            }, {
                type: 'text-summary'
            }]
        }
    });
};

