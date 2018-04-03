var env = process.env
module.exports = {
    name: '测试',
    env: env,
    apiUrlPrefix: {
        development: '/api',
        production: "http://192.168.1.192/gateway/mobile",
        testing: "",
        static: ""
    },
   
};