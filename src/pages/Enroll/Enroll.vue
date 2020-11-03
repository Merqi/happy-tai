<template>
  <div id="enroll">
    <div class="header">
      <div class="box"></div>
      <div class="head">
        <div class="top">
          <div class="icon" @touchstart="goTo('/login')"></div>
          <div class="title">注册</div>
        </div>
      </div>
      <div class="logo"></div>
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model.trim="username"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{pattern, required: true, message: '请输入手机号' }]"
          label-width="60px"
          style
          show-error:false
        />
        <van-field
          v-model.trim="sms"
          name="验证码"
          clearable
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
          label-width="60px"
        >
          <template #button>
            <van-button
              class="code"
              :disabled="flag"
              @touchstart="getSms"
              size="small"
              type="primary"
            >{{flag?count:'获取验证码'}}</van-button>
          </template>
        </van-field>

        <van-field
          v-model.trim="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="6~16位字母和数字组成"
          :rules="[{ required: true, message: '16位字母和数字组成' }]"
          label-width="60px"
          style
          show-error:false
        />
        <van-field
          v-model.trim="name"
          name="姓名"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
          label-width="60px"
          style
          show-error:false
        />
        <div style="margin: 0 16px;">
          <van-button class="enter" round block type="info" native-type="submit">注册,并立即登录</van-button>
        </div>
      </van-form>

      <div class="text-t">
        <div class="left">
          <span class="left-white">*登录即代表您同意</span>
          <span class="left-blue">《用户协议》</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Button, Field, Toast } from "vant";
import { JIACHI } from "@/api/BASE_URL.js";
export default {
  name: "Enroll",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      username: "",
      password: "",
      sms: "",
      name: "",
      pattern: /0?(13|14|15|17|18|19)[0-9]{9}/, //手机号
      flag: false,
      count: 120,
    };
  },
  methods: {
    getSms() {
      if (!this.flag && this.username !== "") {
        this.axios({
          url: `${JIACHI}`,
          method: "get",
          params: {
            r: "api/server/v1/sms/send",
            phone: `${this.username}`,
            action: "register",
          },
        });
        // let num = ''
        // for(let i=0; i<6; i++){
        // num += Math.floor(Math.random()*10)
        // }
        // console.log(num)
        // this.sms = num
        this.flag = true;

        this.timer = setInterval(() => {
          //倒计时
          this.count--;
          if (this.count === 0) {
            this.flag = false;
            this.count = 120;
            clearInterval(this.timer);
          }
        }, 1000);
      }
    },
    async onSubmit(values) {
      if (
        this.username !== "" &&
        this.password !== "" &&
        this.sms.length === 6 &&
        this.name !== ""
      ) {
        const result = await this.axios({
          //注册的axios
          url: `${JIACHI}`,
          method: "get",
          params: {
            r: "api/simpleapp/v1/user/register",
            tel: `${this.username}`,
            name: `${this.name}`,
            pwd: `${this.password}`,
            code: `${this.sms}`,
          },
        });

        Toast(`${result.msg}`);
        if (result.code === 0) {
          this.username = "";
          this.password = "";
          this.name = "";
          this.sms = "";
        }
      } else {
        Toast("输入的信息不完整");
      }
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#enroll {
  width: 100%;
  height: 100%;

  .header {
    position: relative;
    width: 100%;
    height: 422px;
    bg-image('./img/background');
    background-size: 100% 422px;

    .box {
      width: 100%;
      height: 40px;
    }

    .head {
      width: 100%;
      height: 88px;
      padding: 27px 30px;
      box-sizing: border-box;
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
          margin-right: 292px;
        }

        .title {
          font-size: 36px;
          font-weight: 700;
          line-height: 34px;
          color: #ffffff;
        }
      }
    }

    .logo {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto auto;
      width: 265px;
      height: 71px;
      bg-image('./img/logo');
      background-size: 265px 71px;
    }
  }

  .content {
    width: 100%;
    height: 912px;
    background: white;

    .van-form {
      width: 100%;

      .van-field {
        width: 100%;
        height: 80px;
        line-height: 60px;
        font-size: 34px;
        color: #9A9A9A;
        margin-top: 60px;
      }

      .code {
        width: 150px;
        height: 66px;
        background-image: -webkit-linear-gradient(left, #78D6F3 0%, #48C8EF 100%);
        border: none;
        font-size: 24px;
      }

      .enter {
        width: 618px;
        height: 99px;
        font-size: 34px;
        background-image: -webkit-linear-gradient(left, #78D6F3 0%, #48C8EF 100%);
        margin-left: auto;
        margin-right: auto;
        margin-top: 120px;
      }
    }

    .text-t {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 100px;
      box-sizing: border-box;
      text-align: center;
      margin-top: 50px;

      .left {
        .left-white {
          font-size: 20px;
          color: #9A9A9A;
        }

        .left-blue {
          font-size: 20px;
          color: #5DA5FE;
        }
      }
    }
  }
}
</style>