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
    // apiUrlPrefix: {
    //     development: 'http://www.jumax-sh.dev.sudaotech.com/api/wechat',
    //     production: "http://changyingyule.cn/gateway/mobile",
    //     testing: "",
    //     static: ""
    // },
    
   
};