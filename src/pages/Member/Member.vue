<template>
  <div id="member">
    <div class="box"></div>
    <div class="header">
      <div class="top">
        <div class="backBtn" @touchstart="goTo('/home')">
          <div class="icon"></div>
          <div class="back">返回</div>
        </div>
        <div class="title">会员管理</div>
      </div>
    </div>
    <div class="content" ref="waterScroll">
      <div class="content-box">
        <div class="search">
          <div class="icon"></div>
          <input placeholder="输入用户搜索" v-model="memberCard" @change="goSearch()" />
        </div>
        <template v-if="memberCard?false:true">
          <div class="bigBox" v-for="(item,index) in cards" :key="index">
            <div class="message" @touchstart="AAA(index,item.number)">
              <div class="message-l">
                <div class="above">
                  <div class="above-pic"></div>
                  <div class="above-num">{{item.number}}</div>
                </div>
                <div class="below">
                  <div class="below-pic"></div>
                  <div class="below-text">{{item.note}}</div>
                  <div class="below-num">{{item.saler}}</div>
                </div>
              </div>
              <div class="message-r">
                <span class="num">{{totalMoner(item.cash,item.value)}}</span>
              </div>
              <div :class="show === index?'many-OFF':'many-ON'"></div>
              <div
                class="cube"
                :style="{ background:['#2674FB','#FF4248','#AFAEAE'][status[item.status]]}"
              >{{['正常','挂失','注销'][status[item.status]]}}</div>
            </div>
            <div class="btn" v-show="show === index">
              <div class="btn-l">
                <div class="blue">
                  <div class="dot-blue"></div>
                  <span class="blue-text">实收:</span>
                  <span class="blue-num">{{item.cash}}</span>
                </div>
                <div class="yellow">
                  <div class="dot-yellow"></div>
                  <span class="yellow-text">赠送:</span>
                  <span class="yellow-num">{{item.value}}</span>
                </div>
              </div>
              <div class="btn-r">
                <div
                  class="btn-blue"
                  @touchstart="blueBtnStatus(index)"
                >{{blue[status[item.status]]}}</div>
                <div class="btn-red" @touchstart="redBtnStatus(index)">{{red[status[item.status]]}}</div>
              </div>
            </div>
          </div>
        </template>
        <!-- ctrl v -->
        <template v-if="memberCard?true:false">
          <div class="bigBox" v-for="(item,index) in card" :key="index">
            <div class="message" @touchstart="AAA(index,item.number)">
              <div class="message-l">
                <div class="above">
                  <div class="above-pic"></div>
                  <div class="above-num">{{item.number}}</div>
                </div>
                <div class="below">
                  <div class="below-pic"></div>
                  <div class="below-text">{{item.note}}</div>
                  <div class="below-num">{{item.saler}}</div>
                </div>
              </div>
              <div class="message-r">
                <span class="num">{{totalMoner(item.cash,item.value)}}</span>
              </div>
              <div :class="show === index?'many-OFF':'many-ON'"></div>
              <div
                class="cube"
                :style="{ background:['#2674FB','#FF4248','#AFAEAE'][status[item.status]]}"
              >{{['正常','挂失','注销'][status[item.status]]}}</div>
            </div>
            <div class="btn" v-show="show === index">
              <div class="btn-l">
                <div class="blue">
                  <div class="dot-blue"></div>
                  <span class="blue-text">实收:</span>
                  <span class="blue-num">{{item.cash}}</span>
                </div>
                <div class="yellow">
                  <div class="dot-yellow"></div>
                  <span class="yellow-text">赠送:</span>
                  <span class="yellow-num">{{item.value}}</span>
                </div>
              </div>
              <div class="btn-r">
                <div
                  class="btn-blue"
                  @touchstart="blueBtnStatus(index)"
                >{{blue[status[item.status]]}}</div>
                <div class="btn-red" @touchstart="redBtnStatus(index)">{{red[status[item.status]]}}</div>
              </div>
            </div>
          </div>
        </template>

        <!-- 结束 -->
      </div>
    </div>
    <!-- bluestatus 补卡 -->
    <van-dialog v-model="blueTwo" title="补卡信息" show-cancel-button class="card" @confirm="addReport">
      <div class="card-code">请输入正确的卡号</div>
      <input type="text" v-model="addCardNumber" />
    </van-dialog>
    <!-- redstatus 挂失 -->
    <van-dialog v-model="redOne" title="温馨提示" show-cancel-button class="lose" @confirm="report">
      <div class="lose-code">请确认是否要挂失该卡？</div>
    </van-dialog>
    <!-- redstatus 解挂 -->
    <van-dialog
      v-model="redTwo"
      title="温馨提示"
      show-cancel-button
      class="lose"
      @confirm="removeReport"
    >
      <div class="lose-code">请确认是否要解除挂失？</div>
    </van-dialog>
    <!-- redstatus 电子卡迁移 -->
    <van-dialog
      v-model="redThree"
      title="电子卡迁移"
      show-cancel-button
      class="card"
      @confirm="debitMethod"
    >
      <div class="card-code">请输入正确的卡号</div>
      <input type="text" v-model="debitCardNumber" />
    </van-dialog>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Dialog, Toast } from "vant";
import { mapState, mapActions } from "vuex";
import { GETCARDS } from "@/store/mutation_types";
import { YONGQIANG } from "@/api/BASE_URL";

let count = 1;
export default {
  name: "Member",
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      blue: ["充值", "补卡", "充值"],
      red: ["挂失", "解挂", "电子卡迁移"],
      num: 0, //正常 挂失 注销 状态
      show: "", //按钮显示隐藏
      blueTwo: false, //充值按钮
      redOne: false, //挂失
      redTwo: false, //解挂
      redThree: false, //电子卡迁移
      normal: 0,
      lost: 1,
      cancel: 2,
      status: {
        normal: 0,
        lost: 1,
        cancel: 2,
      },
      cardAll: {},
      memberCard: "",
      card: "",
      cardNumber: "",
      addCardNumber: "",
      debitCardNumber: "",
    };
  },
  watch: {
    memberCard: function (val) {
      this.goSearch();
    },
  },
  computed: {
    ...mapState(["cards"]),
  },
  methods: {
    ...mapActions([GETCARDS]),
    async report() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "post",
        params: {
          r: "api/simpleapp/v1/cards/lost",
          number: `${this.cardNumber}`,
          status: "lost",
        },
      });

      Toast(`${result.msg}`);
      if (result.code === 0) {
        this[GETCARDS]();
      }
    },
    async removeReport() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "post",
        params: {
          r: "api/simpleapp/v1/cards/lost",
          number: `${this.cardNumber}`,
          status: "normal",
        },
      });

      Toast(`${result.msg}`);
      if (result.code === 0) {
        this[GETCARDS]();
      }
    },
    async debitMethod() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "post",
        // headers: {'Content-Type':'application/x-www-form-urlencoded'},
        params: {
          r: "api/simpleapp/v1/cards/cardreplace",
        },
        data: {
          number_one: `${this.cardNumber}`,
          number_two: `${this.debitCardNumber}`,
        },
      });

      Toast(`${result.msg}`);
      if (result.code === 0) {
        this[GETCARDS]();
      }
    },
    async addReport() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "post",
        // headers: {'Content-Type':'application/x-www-form-urlencoded'},
        params: {
          r: "api/simpleapp/v1/cards/cardreplace",
        },
        data: {
          number_one: `${this.cardNumber}`,
          number_two: `${this.addCardNumber}`,
        },
      });

      Toast(`${result.msg}`);
      if (result.code === 0) {
        this[GETCARDS]();
      }
    },
    async countCard() {
      count++;
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/cards/index",
          keyword: "",
          page: `${count}`,
        },
      });

      if (result.code === 0) {
        this.cards.push(...result.data);
        this.waterScroll.finishPullUp();
        this.waterScroll.refresh();
      }
    },
    async goSearch() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/cards/index",
          keyword: `${this.memberCard}`,
        },
      });
      if (result.code === 0) {
        this.card = result.data;
      }
    },
    totalMoner(A, B) {
      return parseInt(`${A}`) + parseInt(`${B}`);
    },
    AAA(index, number, status) {
      this.cardNumber = number;
      if (this.show === index) {
        this.show = "";
      } else {
        this.show = index;
      }
    },
    blueBtnStatus(index) {
      //展示弹框的方法
      if (
        this.cards[index].status === "normal" ||
        this.cards[index].status === "cancel"
      ) {
        this.$router.push("/pay");
      } else if (this.cards[index].status === "lost") {
        this.blueTwo = !this.blueTwo;
      }
    },
    redBtnStatus(index) {
      if (this.cards[index].status === "normal") {
        this.redOne = !this.redOne;
      } else if (this.cards[index].status === "lost") {
        this.redTwo = !this.redTwo;
      } else {
        this.redThree = !this.redThree;
      }
    },
    sellScroll() {
      //滑屏方法
      this.waterScroll = new BScroll(this.$refs.waterScroll, {
        touchstart: true,
        pullUpLoad: {
          threshold: -50, // 当上拉距离超过50px时触发 pullingUp 事件
        },
      });

      this.waterScroll.on("pullingUp", () => {
        this.countCard();
      });
    },
    goTo(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    this[GETCARDS](),
      this.$nextTick(() => {
        setTimeout(() => {
          //推入宏任务
          this.sellScroll(); //调用滑屏的方法
        }, 0);
      });
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#member {
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

    .top {
      width: 100%;
      height: 34px;
      line-height: 34px;
      display: flex;

      .backBtn {
        height: 34px;
        display: flex;
        margin-right: 188px;

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
        }
      }

      .title {
        font-size: 36px;
        font-weight: 700;
        line-height: 34px;
      }
    }
  }

  .content {
    width: 100%;
    height: calc(100vh - 128px);
    background: #f5f5f5;
    padding: 0 30px;
    box-sizing: border-box;
    overflow: hidden;

    .content-box {
      width: 100%;
      overflow: hidden;

      .search {
        width: 690px;
        height: 60px;
        background: white;
        margin: 14px 0;
        border-radius: 6px;
        padding: 0 16px;
        box-sizing: border-box;
        display: flex;

        .icon {
          width: 28px;
          height: 28px;
          bg-image('./img/search');
          background-size: 28px 28px;
          margin-right: 21px;
          margin-top: 15px;
        }

        input {
          width: 600px;
          height: 60px;
          line-height: 50px;
          font-size: 30px;
        }
      }

      .bigBox {
        width: 690px;
        margin-bottom: 20px;

        .message {
          position: relative;
          width: 690px;
          height: 140px;
          background: white;
          border-radius: 6px;
          padding-top: 30px;
          padding-bottom: 30px;
          padding-left: 30px;
          padding-right: 20px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;

          .message-l {
            width: 60%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .above {
              width: 100%;
              height: 28px;
              line-height: 28px;
              display: flex;

              .above-pic {
                width: 31px;
                height: 26px;
                bg-image('./img/card number');
                background-size: 31px 26px;
                margin-right: 20px;
              }

              .above-num {
                font-size: 34px;
                color: #343434;
              }
            }

            .below {
              width: 100%;
              height: 30px;
              line-height: 30px;
              display: flex;

              .below-pic {
                width: 30px;
                height: 30px;
                bg-image('./img/user name');
                background-size: 30px 30px;
                margin-right: 18px;
              }

              .below-text {
                font-size: 30px;
                color: #343434;
                margin-right: 16px;
              }

              .below-num {
                font-size: 28px;
                color: #5289FE;
              }
            }
          }

          .message-r {
            height: 80px;
            line-height: 80px;

            .num {
              font-size: 36px;
              color: #FFB400;
            }
          }

          .many-ON {
            width: 36px;
            height: 38px;
            bg-image('./img/open');
            background-size: 36px 38px;
            margin-top: 40px;
          }

          .many-OFF {
            width: 36px;
            height: 38px;
            bg-image('./img/close');
            background-size: 36px 38px;
            margin-top: 40px;
          }

          .cube {
            width: 69px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            background: #2573FB;
            color: white;
            font-size: 24px;
            font-weight: 700;
            border-radius: 0 6px 0 6px;
            position: absolute;
            right: 0;
            top: 0;
          }
        }

        .btn {
          width: 690px;
          height: 140px;
          display: flex;
          background: white;
          border-radius: 6px;
          border-top: 1px solid #DEDEDE;

          .btn-l {
            width: 345px;
            height: 140px;
            padding: 30px 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .blue {
              width: 345px;
              height: 28px;
              line-height: 28px;
              display: flex;

              .dot-blue {
                width: 10px;
                height: 10px;
                background: #387AFF;
                margin-top: 6px;
                margin-left: 29px;
              }

              .blue-text {
                font-size: 30px;
                color: #343434;
                margin-left: 29px;
                margin-right: 14px;
              }

              .blue-num {
                font-size: 30px;
                color: #5289FE;
              }
            }

            .yellow {
              width: 345px;
              height: 28px;
              display: flex;

              .dot-yellow {
                width: 10px;
                height: 10px;
                background: #FFB400;
                margin-top: 6px;
                margin-left: 29px;
              }

              .yellow-text {
                font-size: 30px;
                color: #343434;
                margin-left: 29px;
                margin-right: 14px;
              }

              .yellow-num {
                font-size: 30px;
                color: #FFB400;
              }
            }
          }

          .btn-r {
            width: 345px;
            height: 140px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .btn-blue {
              width: 120px;
              height: 60px;
              line-height: 60px;
              text-align: center;
              background-image: -webkit-linear-gradient(0deg, #92B4FF, #387AFF);
              border-radius: 30px;
              color: white;
            }

            .btn-red {
              height: 60px;
              line-height: 60px;
              text-align: center;
              background-image: -webkit-linear-gradient(0deg, #FDC3C5, #FE595E);
              border-radius: 30px;
              color: white;
              padding: 0 36px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="stylus">
.card {
  width: 540px;
  height: 330px;
  text-align: center;

  .van-dialog__header {
    font-size: 30px;
    color: #343434;
    margin-top: 21.5px;
    margin-bottom: 27px;
  }

  .card-code {
    font-size: 26px;
    color: #262626;
  }

  input {
    width: 476px;
    height: 60px;
    font-size: 30px;
    margin-top: 39px;
    margin-bottom: 19px;
    border: 1px solid #BCBCBC;
    -webkit-appearance: none;
  }

  .van-dialog__footer {
    height: 70px;

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
</style>