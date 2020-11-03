import {Toast} from 'vant'
//解决 webapp手机上按 Home键直接退出程序
document.addEventListener('plusready', function () {
    var webview = plus.webview.currentWebview()
    plus.key.addEventListener('backbutton', function () {
      webview.canBack(function (e) {
        if (e.canBack) {
          webview.back()
        } else {
          // 首页返回键处理
          // 处理逻辑：1秒内，连续两次按返回键，则退出应用；
          var first = null
          plus.key.addEventListener(
            'backbutton',
            function () {
              // 首次按键，提示‘再按一次退出应用’
              if (!first) {
                first = new Date().getTime()
                Toast('再按一次退出应用')
                setTimeout(function () {
                  first = null
                }, 1000)
              } else {
                if (new Date().getTime() - first < 1500) {
                  plus.runtime.quit()
                }
              }
            },
            false
          )
        }
      })
    })
  })