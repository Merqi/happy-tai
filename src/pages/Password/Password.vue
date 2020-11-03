<template>
  <div id="password">
    <div class="box"></div>
    <div class="header">
      <div class="top">
        <div class="icon"></div>
        <div class="back" @touchstart="back('/user')">返回</div>
        <div class="title">修改密码</div>
      </div>
    </div>
    <div class="password-box">
      <div class="password-item">
        <div class="password-text">原密码</div>
        <input v-model.trim="oldpwd" placeholder="请输入原密码" type="text" />
      </div>
      <div class="password-item">
        <div class="password-text">新密码</div>
        <input v-model.trim="newpwd" placeholder="6-16位数字或密码组合" type="text" />
      </div>
      <div class="password-item">
        <div class="password-text">确认密码</div>
        <input v-model.trim="confirmpwd" placeholder="6-16位数字或密码组合" type="text" />
      </div>
    </div>
    <div class="footer" @touchstart="changePwd">
      <div class="btn">确定</div>
    </div>
  </div>
</template>

<script>
import { JIACHI } from "@/api/BASE_URL.js";
import { Toast } from "vant";
let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
let re = new RegExp(reg);
export default {
  name: "Password",
  data() {
    return {
      oldpwd: "",
      newpwd: "",
      confirmpwd: "",
      // pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,//6-16的数字或密码
    };
  },
  methods: {
    async changePwd() {
      // if(re.test(this.oldpwd) && re.test(this.newpwd) && re.test(this.confirmpwd)){//6-16的数字或密码
      if (
        this.oldpwd.length >= 6 &&
        this.newpwd.length >= 6 &&
        this.confirmpwd.length >= 6
      ) {
        //必须大于六位
        const result = await this.axios({
          url: `${JIACHI}`,
          method: "get",
          params: {
            r: "api/simpleapp/v1/user/updatepwd",
            oldpwd: `${this.oldpwd}`,
            newpwd: `${this.newpwd}`,
            confirmpwd: `${this.confirmpwd}`,
          },
        });

        Toast(`${result.msg}`);
      } else {
        Toast("输入的密码不符合条件");
      }
    },
    back(path) {
      this.$router.replace(path);
    },
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#password {
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

  .password-box {
    width: 100%;
    height: 272px;
    padding: 0 30px;
    box-sizing: border-box;
    background: white;

    .password-item {
      width: 100%;
      height: 90px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;

      .password-text {
        width: 180px;
        height: 36px;
        line-height: 36px;
        font-size: 30px;
        border-right: 1px solid #DEDEDE;
        margin-top: 27px;
        margin-right: 30px;
      }

      input {
        width: 60%;
        height: 60px;
        font-size: 30px;
        margin-top: 15px;
      }
    }
  }

  .footer {
    width: 100%;
    height: 92px;
    margin-top: 60px;

    .btn {
      width: 690px;
      height: 92px;
      line-height: 92px;
      background: white;
      margin: 0 auto;
      border-radius: 12px;
      font-size: 32px;
      color: #2EA8FE;
      text-align: center;
      font-weight: 700;
    }
  }
}
</style>