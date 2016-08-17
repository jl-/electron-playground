var path = require('path');
module.exports = {
    src_folders: ['test/e2e/specs'],
    output_folder: 'test/e2e/reports',

    selenium: {
        start_process: true,
        server_path: '/usr/local/selenium/selenium-server-standalone.jar',
        log_path: path.resolve(__dirname, 'reports'),
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': require('chromedriver').path,
            'webdriver.safari.driver': '/usr/local/selenium/SafariDriver.safariextz',
            trustAllSSLCertificates: true
        }
    },

    test_settings: {
        default : {
            selenium_port: 4444,
            selenium_host: 'localhost',
            silent: true,
            desiredCapabilities: {
                browserName: 'firefox',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        },
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: ['--no-sandbox']
                }
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        },
        safari: {
            desiredCapabilities: {
                browserName: 'safari',
                unexpectedAlertBehaviour: 'dismiss',
                'safari.options': {
                    cleanSession: true,
                    ensureCleanSession: true
                },
                cleanSession: true,
                ensureCleanSession: true
            }
        }
    }
};
