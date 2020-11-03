<template>
  <div id="pay">
    <div class="box"></div>
    <div class="header">
      <div class="top">
        <div class="backBtn" @touchstart="goTo()">
          <div class="icon"></div>
          <div class="back">返回</div>
        </div>
        <div class="title">充值</div>
      </div>
    </div>
    <div class="QR">
      <input v-model.trim="payText" placeholder="请输入卡号或点击扫一扫" />
      <div class="sacn" @touchstart="startRecognize"></div>
    </div>
    <div class="message" v-if="cardData.data">
      <span>{{cardData.data.name}}</span>
      <span>{{cardData.data.phone}}</span>
    </div>
    <div class="money">
      <div class="money-t">
        <span>充值(元)</span>
        <input v-model.trim="payMoney" placeholder="请输入充值金额" />
      </div>
      <div class="money-b">
        <span>实收(元)</span>
        <input v-model.trim="giveMoney" placeholder="请输入赠送金额" />
      </div>
    </div>
    <div class="note">
      <div class="note-t">
        <div class="border"></div>
        <span>备注</span>
      </div>
      <textarea class="tra" v-model="remark" placeholder="请输入需要备注的信息！"></textarea>
    </div>
    <div class="footer">
      <div class="btn" @touchstart="payMethod">充值</div>
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
import { YONGQIANG } from "@/api/BASE_URL.js";
import { Toast } from "vant";

let reg = /0?(13|14|15|17|18|19)[0-9]{9}/; //匹配国内手机号
let re = new RegExp(reg);
let scan = null;
export default {
  name: "Pay",
  data() {
    return {
      payText: "", //卡号
      payMoney: "", //充值
      giveMoney: "", //赠送
      remark: "", //备注
      messageFlag: false, //扫描后的信息是否显示
      show: false, // 扫描的底部是否显示
      flag: false, //闪光灯是否打开
      cardData: {}, //卡号的数据
    };
  },
  methods: {
    async getNameAndPhone(url) {
      const result = await this.axios({
        //获取充值卡号信息
        method: "get",
        url: `${YONGQIANG}`,
        params: {
          r: "api/simpleapp/v1/cards/getcardinfo",
          number: `${payText}`,
        },
      });
      if (result.code === 0) {
        this.cardData = result;
        // console.log(JSON.stringify(result));
      }
    },
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

        that.payText = result;
        // alert(result);
        that.getNameAndPhone(); // 请求的方法
        that.closeScan(); //关闭控件
      }
    },
    //关闭扫描识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
      scan = null;
      this.show = false;
    },
    //闪光灯
    light() {
      this.flag = !this.flag;
      scan.setFlash(this.flag);
    },
    //充值的请求
    async payMethod() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "post",
        // headers: {'Content-Type':'application/x-www-form-urlencoded'},
        params: {
          r: "api/simpleapp/v1/cards/addvalue",
        },
        data: {
          card: `${this.payText}`,
          value: `${this.payMoney}`,
          value_income: `${this.giveMoney}`,
          remark: `${this.remark}`,
        },
      });

      Toast(`${result.msg}`);
    },
    goTo() {
      this.$router.go(-1);
    },
  },
  mounted() {
    // console.log(this.payText)
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#pay {
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

      .backBtn {
        height: 34px;
        line-height: 34px;
        display: flex;
        margin-right: 223px;

        .icon {
          width: 19px;
          height: 34px;
          bg-image('./img/back');
          background-size: 19px 34px;
          margin-right: 10px;
        }

        .back {
          font-size: 32px;
          font-weight: 700;
          color: #212121;
        }
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

  .message {
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: white;
    padding: 0 31px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #f5f5f5;

    span {
      color: #333333;
      font-size: 30px;
      font-weight: 700;
    }
  }

  .money {
    width: 100%;
    height: 181px;
    background: white;
    background: pink;
    margin-top: 22px;

    .money-t {
      width: 100%;
      height: 100px;
      line-height: 100px;
      background: white;
      padding: 0 31px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #f5f5f5;

      span {
        font-size: 30px;
        font-weight: 700;
      }

      input {
        outline: none;
        width: 30%;
        height: 60px;
        border-radius: 5px;
        font-size: 30px;
        margin-top: 20px;
      }
    }

    .money-b {
      width: 100%;
      height: 100px;
      line-height: 100px;
      background: white;
      padding: 0 31px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #f5f5f5;

      span {
        font-size: 30px;
        font-weight: 700;
      }

      input {
        outline: none;
        width: 30%;
        height: 60px;
        line-height: 60px;
        border-radius: 5px;
        font-size: 30px;
        margin-top: 20px;
      }
    }
  }

  .note {
    width: 100%;
    height: 180px;
    background: white;
    margin-top: 40px;
    margin-bottom: 60px;
    padding-top: 24px;
    box-sizing: border-box;

    .note-t {
      width: 100%;
      height: 30px;
      display: flex;

      .border {
        width: 6px;
        height: 22px;
        background: #038FFF;
        margin-left: 31px;
        margin-top: 2px;
        margin-right: 5px;
      }

      span {
        font-size: 32px;
        font-weight: bold;
        color: #333;
      }
    }

    .tra {
      display: block;
      width: 80%;
      height: 60%;
      margin: 0 auto;
      margin-left 104px
      outline: none;
      border: none;
      resize: none;
      font-size: 30px;
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