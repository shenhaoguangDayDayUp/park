var env = process.env
module.exports = {
    name: '测试',
    env: env,
    apiUrlPrefix: {
        development: '/api',
        production: "http://changyingyule.cn/gateway/mobile",
        testing: "",
        static: ""
    },
   
};