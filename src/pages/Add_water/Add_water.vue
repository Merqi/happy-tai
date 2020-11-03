<template>
  <div id="add_water">
    <div class="box"></div>
    <div class="header">
      <div class="top">
        <div class="icon"></div>
        <div class="back" @touchstart="back('/control')">返回</div>
        <div class="title">添加设备</div>
      </div>
    </div>
    <div class="QR">
      <input placeholder="请输入设备或点击扫一扫" type="text" v-model.trim="addCard" />
      <div class="sacn" @touchstart="startRecognize"></div>
    </div>
    <div class="money">
      <div class="money-t">
        <span>设备地址</span>
        <input placeholder="给它起个名字吧" v-model="addName" />
      </div>
    </div>
    <div class="footer">
      <div class="btn" @touchstart="addPDA">确认添加</div>
    </div>
    <div class="scanner">
      <div id="bcid"></div>
      <div class="bottom" v-show="show">
        <div :class="flag?'ON':'OFF'" @touchstart="light"></div>
        <div class="close" @touchstart="closeScan"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { JIACHI } from "@/api/BASE_URL";
import { Toast } from "vant";

let scan = null;
export default {
  name: "Add_water",
  data() {
    return {
      // codeUrl: '',
      flag: false,
      show: false,
      addCard: "",
      addName: "",
    };
  },
  methods: {
    //创建扫描控件
    startRecognize() {
      // this.flag = !this.flag
      this.show = true;
      let that = this;
      if (!window.plus || scan !== null) return; //如果没有打开窗口 或者不等于null 都不能创建扫描实例
      // 节点 支持扫描的类型 扫描框、扫描条的样式
      scan = new plus.barcode.Barcode(
        "bcid",
        [plus.barcode.QR, plus.barcode.CODE128],
        {
          frameColor: "#44b549",
          scanbarColor: "#44b549",
        }
      );
      scan.start(); //开始扫描
      scan.onmarked = onmarked;
      //扫描成功的事件监听  type 类型 / result 结果 / file 保存的路径
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.CODE128:
            type = "CODE128";
            break;
          // default:
          //   type = '其它' + type;
          //   break;
        }
        result = result.replace(/\n/g, "");
        // that.codeUrl = result;

        that.result = result;
        that.closeScan(); //关闭控件
      }
    },
    async addPDA() {
      const result = await this.axios({
        url: `${JIACHI}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/device/adddevice",
          type: "water",
          deviceid: `${this.addCard}`,
          location: `${this.addName}`,
        },
      });

      Toast(`${result.msg}`);
    },
    closeScan() {
      if (!window.plus) return;
      scan.close();
      scan = null;
      this.show = false;
    },
    light() {
      this.flag = !this.flag;
      scan.setFlash(this.flag);
    },
    back(path) {
      this.$router.replace(path);
    },
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#add_water {
  width: 100%;
  height: 100%;
  background: #f5f5f5;

  .box {
    width: 100%;
    height: 40px;
    background: white;
  }

  .header {
    width: 100%;
    height: 88px;
    padding: 27px 30px;
    box-sizing: border-box;
    background: #ffffff;
    margin-bottom: 22px;

    .top {
      width: 100%;
      height: 34px;
      line-height: 34px;
      display: flex;

      .icon {
        width: 19px;
        height: 34px;
        bg-image('./img/back');
        background-size: 19px 34px;
        margin-right: 7px;
      }

      .back {
        font-size: 32px;
        font-weight: 700;
        color: #212121;
        line-height: 34px;
        margin-top: 4px;
        margin-right: 188px;
      }

      .title {
        font-size: 36px;
        font-weight: 700;
        line-height: 34px;
      }
    }
  }

  .QR {
    width: 100%;
    height: 100px;
    background: white;
    padding: 0 31px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #f5f5f5;

    input {
      outline: none;
      width: 70%;
      height: 60px;
      border-radius: 5px;
      font-size: 30px;
      margin-top: 20px;
    }

    .sacn {
      width: 40px;
      height: 39px;
      bg-image('./img/scan');
      background-size: 40px 39px;
      margin-top: 30px;
    }
  }

  .money {
    width: 100%;
    height: 100px;
    background: white;
    background: pink;
    margin-top: 22px;
    margin-bottom: 60px;

    .money-t {
      width: 100%;
      height: 100px;
      background: white;
      padding: 31px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #f5f5f5;

      span {
        font-size: 34px;
        font-weight: 700;
      }

      input {
        outline: none;
        width: 30%;
        height: 38px;
        border-radius: 5px;
        font-size: 30px;
      }
    }
  }

  .footer {
    width: 100%;
    height: 92px;

    .btn {
      width: 690px;
      height: 92px;
      line-height: 92px;
      background: white;
      margin: 0 auto;
      border-radius: 12px;
      font-size: 32px;
      color: #0E85FF;
      text-align: center;
      font-weight: 700;
    }
  }

  .scanner {
    height: 100%;

    #bcid {
      width: 100%;
      height: 90%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      text-align: center;
      background: transparent;
      z-index: -1;
    }

    .bottom {
      width: 100%;
      height: 10%;
      background: rgb(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .close {
        width: 60px;
        height: 60px;
        bg-image('./img/close');
        background-size: 60px 60px;
      }

      .OFF {
        width: 60px;
        height: 60px;
        background-image: url('./img/OFF.png');
        background-size: 60px 60px;
      }

      .ON {
        width: 60px;
        height: 60px;
        background-image: url('./img/ON.png');
        background-size: 60px 60px;
      }
    }
  }
}
</style>