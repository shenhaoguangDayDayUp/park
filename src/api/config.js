var env = process.env
module.exports = {
    name: '测试',
    env: env,
    apiUrlPrefix: {
        development: '/api',
        production: "http://changyingyule.cn",
        testing: "",
        static: ""
    },
    imgUrl:{
        // development: 'http://192.168.1.198',
        development: '/api',
        production: "http://changyingyule.cn",
        testing: "",
        static: ""
    },
};