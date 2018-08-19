module.exports = {
  chainWebpack: config => {
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader/loader')
        .loader('worker-loader/loader')
        .end()
  },
  configureWebpack: {
    output: {
      globalObject: 'this',
    },
  },
  pluginOptions:{
    env: {
      BUILD_DATE: new Date,
    }
  }
};