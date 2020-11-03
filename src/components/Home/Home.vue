<template>
  <div id="home">
    <div class="header">
      <div class="title">钛财富</div>
      <div class="message">
        <div class="left" @touchstart="goTo('/user')">
          <div class="user"></div>
          <div class="num">
            <div class="top">
              <span class="name">{{userInfo.name}}</span>
              <div class="vip"></div>
            </div>
            <div class="bottom" v-if="!power">
              <span>员工</span>
            </div>
          </div>
        </div>
        <div class="right" v-if="power">￥ {{userInfo.balance}}</div>
      </div>
      <div class="money">
        <div class="money-l">
          <div class="radius-l"></div>
          <div class="radius-r"></div>
        </div>
        <div class="money-c">
          <div class="month" v-if="homeData.data">
            <div class="month-t">{{homeData.data.sale}}</div>
            <div class="month-b">本日销售</div>
          </div>
          <div class="months" v-if="homeData.data">
            <div class="months-t">{{homeData.data.addvalue}}</div>
            <div class="months-b">本日充值</div>
          </div>
          <div class="month" v-if="homeData.data">
            <div class="month-t">{{homeData.data.receipts}}</div>
            <div class="month-b">本日实收</div>
          </div>
        </div>
        <div class="money-r">
          <div class="gold-l"></div>
          <div class="gold-r"></div>
        </div>
      </div>
    </div>
    <div class="logo">
      <div class="hpt"></div>
    </div>
    <div class="footer">
      <div class="footer-t">
        <div class="item">
          <div @touchstart="goTo('/pay')">
            <div class="homePngOne"></div>
            <span>充值</span>
          </div>
        </div>
        <div class="item">
          <div @touchstart="goTo('/water')">
            <div class="homePngTwo"></div>
            <span>售水机</span>
          </div>
        </div>
        <div class="item">
          <div @touchstart="goTo('/control')">
            <div class="homePngTre"></div>
            <span>水控机</span>
          </div>
        </div>
      </div>
      <div class="footer-b">
        <div class="item">
          <div @touchstart="goTo('/member')">
            <div class="homePngFur"></div>
            <span>会员管理</span>
          </div>
        </div>
        <div class="item">
          <div @touchstart="goTo('/pay_rank')">
            <div class="homePngFiv"></div>
            <span>充值记录</span>
          </div>
        </div>
        <div class="item">
          <div @touchstart="goTo('/cue_rank')">
            <div class="homePngSix"></div>
            <span>消费记录</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { JIACHI } from "@/api/BASE_URL";
import { mapState, mapActions } from "vuex";
import { GETUSERINFO } from "@/store/mutation_types";
export default {
  name: "Home",
  data() {
    return {
      homeData: {},
    };
  },
  methods: {
    ...mapActions([GETUSERINFO]),
    async getHomeData() {
      const data = await this.axios({
        //数据统计
        url: `${JIACHI}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/site/index",
        },
      });
      if (data.code === 0) {
        this.homeData = data;
      }
    },
    goTo(path) {
      // console.log(this)
      this.$router.push(path);
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    power(){
      if(this.userInfo.accounttype = "main"){
        return true
      }else if(this.userInfo.accounttype = "staff"){
        return false
      }
    }
  },
  mounted() {
    this[GETUSERINFO](), this.getHomeData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#home {
  width: 750px;
  height: 100%;

  .header {
    width: 100%;
    height: 493px;
    bg-image('./img/layer9');
    background-size: 750px 493px;
    overflow: hidden;

    .title {
      width: 100%;
      height: 34px;
      font-size: 36px;
      color: white;
      font-weight: 700;
      margin-top: 67px;
      margin-bottom: 75px;
      text-align: center;
    }

    .message {
      width: 688px;
      height: 68px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      margin-bottom: 38px;

      .left {
        width: 201px;
        height: 68px;
        display: flex;
        justify-content: space-between;

        .user {
          width: 68px;
          height: 68px;
          bg-image('./img/userPic');
          background-size: 68px 68px;
        }

        .num {
          width: 103px;
          height: 100%;

          .top {
            width: 103px;
            height: 29px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 16px;

            .name {
              font-size: 32px;
              font-weight: 700;
              color: white;
            }

            .vip {
              // display inline-block
              width: 23px;
              height: 23px;
              margin: 2.5px 0;
              bg-image('./img/member');
              background-size: 23px 23px;
            }
          }

          .bottom {
            span {
              font-size: 20px;
              color: white;
            }
          }
        }
      }

      .right {
        font-size: 40px;
        color: white;
        height: 68px;
        line-height: 68px;
      }
    }

    .money {
      width: 690px;
      height: 180px;
      background: white;
      padding: 10px;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 10px;

      .money-l {
        display: flex;
        justify-content: space-between;

        .radius-l {
          width: 25px;
          height: 23px;
          bg-image('./img/radius-l');
          background-size: 25px 23px;
        }

        .radius-r {
          width: 24px;
          height: 31px;
          bg-image('./img/radius-r');
          background-size: 24px 31px;
        }
      }

      .money-c {
        height: 99px;
        display: flex;

        .month {
          width: 229px;
          height: 100%;
          text-align: center;

          .month-t {
            font-size: 46px;
            margin-bottom: 29px;
            color: #FF9B00;
          }

          .month-b {
            font-size: 24px;
            color: #999999;
          }
        }

        .months {
          width: 229px;
          height: 100%;
          text-align: center;
          left-border-1px(#DDDDDD);
          right-border-1px(#DDDDDD);

          .months-t {
            font-size: 46px;
            margin-bottom: 29px;
            color: #FF9B00;
          }

          .months-b {
            font-size: 24px;
            color: #999999;
          }
        }
      }

      .money-r {
        display: flex;
        justify-content: space-between;

        .gold-l {
          width: 54px;
          height: 34px;
          bg-image('./img/gold-l');
          background-size: 54px 34px;
        }

        .gold-r {
          width: 36px;
          height: 29px;
          bg-image('./img/gold-r');
          background-size: 36px 29px;
        }
      }
    }
  }

  .logo {
    width: 690px;
    height: 264px;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 30px;

    .hpt {
      width: 690px;
      height: 264px;
      bg-image('./img/happy-tai');
      background-size: 690px 264px;
    }
  }

  .footer {
    width: 100%;
    height: 576px;
    padding: 30px;
    box-sizing: border-box;
    background: #f5f5f5;

    .footer-t {
      width: 690px;
      height: 240px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;

      .item {
        width: 210px;
        height: 240px;
        padding-top: 50px;
        padding-left: 47px;
        padding-right: 47px;
        padding-bottom: 40px;
        box-sizing: border-box;
        text-align: center;
        border-radius: 10px;
        background: white;

        .homePngOne {
          width: 116px;
          height: 110px;
          bg-image('./img/back');
          background-size: 116px 110px;
          margin-bottom: 20px;
        }

        .homePngTwo {
          width: 116px;
          height: 110px;
          bg-image('./img/hnx');
          background-size: 116px 110px;
          margin-bottom: 20px;
        }

        .homePngTre {
          width: 116px;
          height: 110px;
          bg-image('./img/water');
          background-size: 116px 110px;
          margin-bottom: 20px;
        }

        span {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
        }
      }
    }

    .footer-b {
      width: 690px;
      height: 240px;
      display: flex;
      justify-content: space-between;

      .item {
        width: 210px;
        height: 240px;
        padding-top: 50px;
        padding-left: 47px;
        padding-right: 47px;
        padding-bottom: 40px;
        box-sizing: border-box;
        text-align: center;
        border-radius: 10px;
        background: white;

        .homePngFur {
          width: 116px;
          height: 110px;
          bg-image('./img/hy');
          background-size: 116px 110px;
          margin-bottom: 20px;
        }

        .homePngFiv {
          width: 116px;
          height: 110px;
          bg-image('./img/pay');
          background-size: 116px 110px;
          margin-bottom: 20px;
        }

        .homePngSix {
          width: 116px;
          height: 110px;
          bg-image('./img/shop');
          background-size: 116px 110px;
          margin-bottom: 20px;
        }

        span {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }
}
</style>
