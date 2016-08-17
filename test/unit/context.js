// 测试文件集
var testContext = require.context('../../src', true, /\.spec\.js$/);
testContext.keys().forEach(testContext);

// 源代码文件集
var srcContext = require.context('../../src', true, /^\.\/.*(?!(app|\.spec))\.(js|vue)$/);
srcContext.keys().forEach(srcContext);

