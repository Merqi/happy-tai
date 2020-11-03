//配置路径
const path = require('path')
function resolve(dir){
    return path.join(__dirname,dir)
}
// 做适配
const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 75   //基准大小 baseSize，需要和rem.js中相同
  
})

module.exports = {
    publicPath:'./',
    lintOnSave:false,
    // devServer:{
    //   port:8080,
    //   open:true,
      // proxy:'http://localhost:3001'
      // proxy:{
          // '/': {
          //     target: 'http://yongqiang.happy-ti.com/index.php',
          //     changeOrigin: true,//允许跨域
              // pathRewrite: {//重写path端口后面的叫path
              //     '^/': '' // remove base path
              //   }
            // },
            // '/m.you.163.com': {
            //   target: 'https://m.you.163.com',
            //   changeOrigin: true,//允许跨域
            //   pathRewrite: {//重写path端口后面的叫path
            //       '^/m.you.163.com': '' // remove base path
            //     }
            // },
      // },
  // },
    //路径
    configureWebpack:{
        resolve: {
            alias: {
                'components': resolve('src/components'),
                'pages': resolve('src/pages'),
                'store': resolve('src/store'),
            }
        }
    },
    //适配
    css: {
        loaderOptions: {
          postcss: {
            plugins: [
              postcss
            ]
          }
        }
      }

}