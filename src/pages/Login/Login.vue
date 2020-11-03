<template>
  <div id="login">
    <div class="header">
      <div class="logo"></div>
    </div>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="手机号"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
          label-width="60px"
          style
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
          label-width="60px"
          style
        />
        <div class="text-t">
          <div class="left">
            <span class="left-white">*登录即代表您同意</span>
            <span class="left-blue" @touchstart="goTo('/deal')">《用户协议》</span>
          </div>
          <div class="right" @touchstart="goTo('/forget')">
            <span class="right-white">忘记密码？</span>
          </div>
        </div>
        <div style="margin: 0 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <div class="text-b" @touchstart="goTo('./enroll')">
        <span class="center-white">还没有账号？</span>
        <span class="center-blue">立即注册</span>
      </div>
    </div>
    <!--退出弹框  -->
    <van-dialog v-model="loginDialog" title="温馨提示" show-cancel-button class="lose">
      <div class="lose-code">请确认是否要退出登录？</div>
    </van-dialog>
  </div>
</template>

<script>
import { JIACHI } from "@/api/BASE_URL.js";
import { Form, Button, Field, Dialog, Toast } from "vant";
import { mapActions, mapState } from "vuex";
import { GETLOGIN } from "@/store/mutation_types";
export default {
  name: "Login",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      username: "", //手机号
      password: "", //密码
      pattern: /0?(13|14|15|17|18|19)[0-9]{9}/,
      loginDialog: false,
    };
  },
  computed: {
    // ...mapState(['LoginObj']) //对应vuex的state
  },
  methods: {
    // ...mapActions([GETLOGIN]), //对应vuex的actions
    async loginMethod(url, username, password) {
      const result = await this.axios({
        //登录的axios
        url: `${JIACHI}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/site/login",
          userid: `${this.username}`,
          passwd: `${this.password}`,
        },
      });

      Toast(`${result.msg}`);
      if (result.code === 0) {
        // console.log(loginObj)
        // console.log(JSON.stringify(loginObj))
        localStorage.setItem("token", result.data.token);
        this.$router.replace("/home");
        this.tokenTimer = setTimeout(()=>{
          localStorage.removeItem('token')
          this.$router.replace('./login')
          Toast('身份验证已过期,请重新登录')
          clearTimeout(this.tokenTimer)
        },7200000)
      }
    },
    onSubmit(values) {
      this.loginMethod(JIACHI, this.username, this.password);
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
  mounted() {},
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#login {
  width: 100%;
  height: 100%;

  .header {
    position: relative;
    width: 100%;
    height: 422px;
    bg-image('./img/background');
    background-size: 100% 422px;

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
        margin-top: 80px;
      }

      .text-t {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 100px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-bottom: 100px;

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

        .right {
          height: 50px;

          .right-white {
            font-size: 20px;
            color: #9a9a9a;
          }
        }
      }

      .van-button {
        height: 99px;
        font-size: 34px;
        background-image: -webkit-linear-gradient(left, #78D6F3 0%, #48C8EF 100%);
      }
    }

    .text-b {
      width: 100%;
      height: 30px;
      line-height: 30px;
      margin-top: 50px;
      text-align: center;

      .center-white {
        font-size: 20px;
        color: #9A9A9A;
      }

      .center-blue {
        position: relative;
        font-size: 20px;
        color: #5DA5FE;

        &::after {
          content: '';
          width: 100%;
          height: 1px;
          background: #5DA5FE;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
}
</style>