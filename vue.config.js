module.exports = {
  devServer: {
    // 设置默认端口
    // port: 8081,
    //部署到容器
    port: 8081,
    // host: "localhost",
    //设置代理，部署环境不用本地代理。使用nginx
    proxy: {
      "/api": {
        // websocket协议代理
        ws: false,
        // 目标 API 地址
        target: "http://localhost:8080",
        // 将主机标头的原点更改为目标URL
        changeOrigin: true
      }
    }
  },
  //相对路径引用资源
  publicPath: "./",
  productionSourceMap: false
};
