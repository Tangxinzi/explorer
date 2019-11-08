const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    // ...You can now register proxies as you wish!
    app.use(proxy('/api', {
        target: 'http://47.94.150.170:8080',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api": "http://47.94.150.170:8080"
        },
    }));
    app.use(proxy('/oss', {
        target: 'https://jiankanglian.oss-cn-beijing.aliyuncs.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/oss": "https://jiankanglian.oss-cn-beijing.aliyuncs.com"
        },
    }));
};
