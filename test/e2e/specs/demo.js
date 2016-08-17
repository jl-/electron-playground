module.exports = {
    ['baidu.com'] (browser) {
        browser
            .url('http://baidu.com')
            .waitForElementVisible('#lg', 5000)
            .assert.elementPresent('#lg')
            .assert.containsText('.bri', '更多')
            .end();
    }
}
