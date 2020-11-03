<template>
  <div id="user">
    <div class="user-top">
      <!-- <Header/> -->
      <div class="box"></div>
      <div class="header">
        <div class="top">
          <div class="icon"></div>
          <div class="back" @touchstart="goTo('/home')">返回</div>
          <div class="title">个人中心</div>
        </div>
      </div>
      <div class="userinfo">
        <div class="headerPic"></div>
        <div class="text">
          <span class="text-t">{{userInfo.name}}</span>
          <span class="text-b">{{userInfo.phone}}</span>
        </div>
        <div class="userinfo-r">
          <span>￥ {{userInfo.balance}}</span>
        </div>
      </div>
    </div>
    <div class="user-bottom">
      <div class="item" v-if="userInfo">
        <span>姓名</span>
        <span>{{userInfo.name}}</span>
      </div>
      <div class="item">
        <span>性别</span>
        <span>{{userInfo.sex}}</span>
      </div>
      <div class="item" @touchstart="goTo('/password')" v-if="power">
        <span>登录密码</span>
        <div class="item-double">
          <span class="item-text">*********</span>
          <div class="item-icon"></div>
        </div>
      </div>
    </div>
    <div class="footer" @touchstart="userDialog = !userDialog">
      <div class="btn" >退出登录</div>
    </div>
    <!--退出弹框  -->
    <van-dialog
      v-model="userDialog"
      @confirm="confirmMethod"
      title="温馨提示"
      show-cancel-button
      class="lose"
    >
      <div class="lose-code">请确认是否要退出登录？</div>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { JIACHI } from "@/api/BASE_URL";
import { mapState, mapActions } from "vuex";
import { GETUSERINFO } from "@/store/mutation_types";
export default {
  name: "User",
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      userDialog: false, //弹框
    };
  },
  methods: {
    // ...mapActions([GETUSERINFO]),
    async confirmMethod() {
      const a = await this.axios({
        //退出登录
        url: `${JIACHI}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/site/logout",
        },
      });
      localStorage.removeItem("token");
      this.$router.replace("./login");
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    power(){
      if(this.userInfo.accounttype === 'main'){
        return true
      }else if(this.userInfo.accounttype === 'staff'){
        return false
      }
    }
  },
  mounted() {
    // this[GETUSERINFO]();
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#user {
  width: 100%;
  height: 100%;
  background: #f5f5f5;

  .user-top {
    width: 100%;
    height: 371px;
    bg-image('./img/background');
    background-size: 100% 371px;

    .box {
      width: 100%;
      height: 40px;
    }

    .header {
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
          bg-image('./img/return');
          background-size: 19px 34px;
          margin-right: 7px;
        }

        .back {
          font-size: 32px;
          font-weight: 700;
          color: white;
          line-height: 34px;
          margin-top: 4px;
          margin-right: 188px;
        }

        .title {
          font-size: 36px;
          font-weight: 700;
          line-height: 34px;
          color: #ffffff;
        }
      }
    }

    .userinfo {
      width: 100%;
      height: 80px;
      padding-left: 60px;
      padding-right: 29px;
      display: flex;
      margin-top: 66px;

      .headerPic {
        width: 80px;
        height: 80px;
        bg-image('./img/head');
        background-size: 80px 80px;
        margin-right: 38px;
        border-radius: 50%;
      }

      .text {
        width: 141px;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 225px;

        .text-t {
          font-size: 32px;
          color: white;
        }

        .text-b {
          font-size: 24px;
          color: white;
        }
      }

      .userinfo-r {
        height: 80px;
        line-height: 80px;

        span {
          font-size: 40px;
          color: white;
        }
      }
    }
  }

  .user-bottom {
    background: #f5f5f5;
    border-top: 1px solid #f5f5f5;
    padding: 20px 30px 0 30px;

    .item {
      width: 100%;
      height: 90px;
      background: white;
      padding: 31px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      font-size: 32px;
      border-radius: 15px;
      margin-bottom: 20px;

      span {
        color: #666666;
        font-weight: 700;
      }

      .item-double {
        width: 30%;
        height: 32px;
        display: flex;
        justify-content: space-between;

        .item-text {
          font-size: 32px;
          color: #666666;
          margin-top: 4px;
        }

        .item-icon {
          width: 16px;
          height: 32px;
          bg-image('./img/enter');
          background-size: 16px 32px;
        }
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
      color: #343434;
      text-align: center;
      font-weight: 700;
    }
  }

  .lose {
    width: 491px;
    height: 271px;
    text-align: center;

    .van-dialog__header {
      font-size: 30px;
      color: #343434;
      margin-top: 20.5px;
      margin-bottom: 50px;
    }

    .lose-code {
      font-size: 24px;
      color: #262626;
    }

    .van-dialog__footer {
      height: 70px;
      margin-top: 47px;

      .van-button {
        height: 70px;

        .van-button__content {
          font-size: 32px;
          height: 70px;
          line-height: 70px;

          .van-button__text {
            height: 70px;
          }
        }
      }
    }
  }
}
</style>