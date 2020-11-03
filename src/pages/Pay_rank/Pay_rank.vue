<template>
  <div id="pay_rank">
    <div class="pay_rank-t">
      <div class="box"></div>
      <div class="header">
        <div class="top">
          <div class="backBtn" @touchstart="goTo('/home')">
            <div class="icon"></div>
            <div class="back">返回</div>
          </div>
          <div class="title">充值记录</div>
        </div>
      </div>
      <div class="search">
        <div class="search-pic"></div>
        <input class="ipt" v-model="payCard" placeholder="请输入卡号搜索" />
      </div>
      <div class="time">
        <span class="time-num">{{time}}</span>
        <div class="time-btn" @click="show = !show"></div>
      </div>
      <div class="money">
        <span class="money-l">充值总额: ￥ {{payRank.value}}</span>
        <span class="money-r">实收总额: ￥ {{payRank.value_afterdiscount}}</span>
      </div>
    </div>
    <div class="pay_rank-c">
      <van-tabs @click="bar">
        <van-tab title="所有" name="0">
          <div class="message" v-for="(item) in payRank.data" :key="item.key_id">
            <div class="message-t">
              <div class="text-t">
                <span class="phone">卡号: {{item.card_num}}</span>
                <span class="type">({{status[item.type]}})</span>
              </div>
              <span class="addMoney">+{{item.value_afterdiscount}}</span>
            </div>
            <div class="message-c">
              <span class="name">{{item.operater}}</span>
              <div class="text-c">
                <span class="text-white">实收:</span>
                <span class="text-gold">{{item.value}}</span>
              </div>
            </div>
            <div class="message-b">
              <span class="date">{{item.time}}</span>
              <div class="text-b">
                <span class="text-white">余额:</span>
                <span class="text-gold">{{item.card_aftervalue}}</span>
              </div>
            </div>
          </div>
          <van-pagination
            v-if="payRank.data"
            v-model="currentPage"
            :page-count="payRank.page"
            mode="simple"
            @change="pageMethod"
          />
        </van-tab>

        <van-tab title="线上充值" name="1">
          <div class="message" v-for="(item) in payRankTwo.data" :key="item.key_id">
            <div class="message-t">
              <div class="text-t">
                <span class="phone">卡号: {{item.card_num}}</span>
                <span class="type">({{status[item.type]}})</span>
              </div>
              <span class="addMoney">+{{item.value_afterdiscount}}</span>
            </div>
            <div class="message-c">
              <span class="name">{{item.operater}}</span>
              <div class="text-c">
                <span class="text-white">实收:</span>
                <span class="text-gold">{{item.value}}</span>
              </div>
            </div>
            <div class="message-b">
              <span class="date">{{item.time}}</span>
              <div class="text-b">
                <span class="text-white">余额:</span>
                <span class="text-gold">{{item.card_aftervalue}}</span>
              </div>
            </div>
          </div>
          <van-pagination
            v-if="payRankTwo.data"
            v-model="currentPageTwo"
            :page-count="payRankTwo.page"
            mode="simple"
            @change="pageMethodTwo"
          />
        </van-tab>

        <van-tab title="扫码支付" name="2">
          <div class="message" v-for="(item) in payRankTre.data" :key="item.key_id">
            <div class="message-t">
              <div class="text-t">
                <span class="phone">卡号: {{item.card_num}}</span>
                <span class="type">({{status[item.type]}})</span>
              </div>
              <span class="addMoney">+{{item.value_afterdiscount}}</span>
            </div>
            <div class="message-c">
              <span class="name">{{item.operater}}</span>
              <div class="text-c">
                <span class="text-white">实收:</span>
                <span class="text-gold">{{item.value}}</span>
              </div>
            </div>
            <div class="message-b">
              <span class="date">{{item.time}}</span>
              <div class="text-b">
                <span class="text-white">余额:</span>
                <span class="text-gold">{{item.card_aftervalue}}</span>
              </div>
            </div>
          </div>
          <van-pagination
            v-if="payRankTre.data"
            v-model="currentPageTre"
            :page-count="payRankTre.page"
            mode="simple"
            @change="pageMethodTre"
          />
        </van-tab>
        <van-tab title="后台充值" name="3">
          <div class="message" v-for="(item) in payRankFou.data" :key="item.key_id">
            <div class="message-t">
              <div class="text-t">
                <span class="phone">卡号: {{item.card_num}}</span>
                <span class="type">({{status[item.type]}})</span>
              </div>
              <span class="addMoney">+{{item.value_afterdiscount}}</span>
            </div>
            <div class="message-c">
              <span class="name">{{item.operater}}</span>
              <div class="text-c">
                <span class="text-white">实收:</span>
                <span class="text-gold">{{item.value}}</span>
              </div>
            </div>
            <div class="message-b">
              <span class="date">{{item.time}}</span>
              <div class="text-b">
                <span class="text-white">余额:</span>
                <span class="text-gold">{{item.card_aftervalue}}</span>
              </div>
            </div>
          </div>
          <van-pagination
            v-if="payRankFou.data"
            v-model="currentPageFou"
            :page-count="payRankFou.page"
            mode="simple"
            @change="pageMethodFou"
          />
        </van-tab>
      </van-tabs>
    </div>
    <!-- <div class="pay_rank-b">

    </div>-->
    <div class="mask" v-show="show" @touchstart="show = !show"></div>
    <div class="block" v-show="show">
      <div
        class="block-t"
        @touchstart="changeTime(item)"
        v-for="(item,index) in payRank.table"
        :key="index"
      >{{item}}</div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, Pagination } from "vant";
import BScroll from "better-scroll";
import { mapState, mapActions } from "vuex";
import { GETPAYRANK } from "@/store/mutation_types";
import { YONGQIANG } from "@/api/BASE_URL.js";
let date = new Date();

export default {
  name: "Pay_rank",
  data() {
    return {
      show: false,
      status: {
        weixin: "线上充值",
        qrcode: "扫码支付",
        server: "后台充值",
        xiaochengxu: "小程序充值",
        app: "app充值",
      },
      payCard: "",
      currentPage: 1,
      currentPageTwo: 1,
      currentPageTre: 1,
      currentPageFou: 1,
      time: `${date.getFullYear()}`, //2020时间
      type: "",
      payRank: {},
      payRankTwo: {},
      payRankTre: {},
      payRankFou: {},
      timeName: 0,
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Pagination.name]: Pagination,
  },
  watch: {
    payCard: function (val) {
      if (this.timeName === 0) {
        this.getPayRank();
      } else if (this.timeName === 1) {
        this.getPayRankTwo();
      } else if (this.timeName === 2) {
        this.getPayRankTre();
      } else if (this.timeName === 3) {
        this.getPayRankFou();
      }
    },
  },
  methods: {
    async bar(name) {
      if (name === "0") {
        this.type = "";
        this.timeName = 0;
      } else if (name === "1") {
        this.type = "weixin";
        this.timeName = 1;
        this.getPayRankTwo();
      } else if (name === "2") {
        this.type = "qrcode";
        this.timeName = 2;
        this.getPayRankTre();
      } else if (name === "3") {
        this.type = "server";
        this.timeName = 3;
        this.getPayRankFou();
      }
    },
    async pageMethod() {
      this.getPayRank();
    },
    async pageMethodTwo() {
      this.getPayRankTwo();
    },
    async pageMethodTre() {
      this.getPayRankTre();
    },
    async pageMethodFou() {
      this.getPayRankFou();
    },
    async getPayRankFou() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/addvalue/index",
          keyword: `${this.payCard}`,
          page: `${this.currentPageFou}`,
          year: `${this.time}`,
          type: `${this.type}`,
        },
      });
      if (result.code === 0) {
        this.payRankFou = result.data;
      }
    },
    async getPayRankTre() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/addvalue/index",
          keyword: `${this.payCard}`,
          page: `${this.currentPageTre}`,
          year: `${this.time}`,
          type: `${this.type}`,
        },
      });
      if (result.code === 0) {
        this.payRankTre = result.data;
      }
    },
    async getPayRankTwo() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/addvalue/index",
          keyword: `${this.payCard}`,
          page: `${this.currentPageTwo}`,
          year: `${this.time}`,
          type: `${this.type}`,
        },
      });
      if (result.code === 0) {
        this.payRankTwo = result.data;
      }
    },
    async getPayRank() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/addvalue/index",
          keyword: `${this.payCard}`,
          page: `${this.currentPage}`,
          year: `${this.time}`,
          type: `${this.type}`,
        },
      });
      if (result.code === 0) {
        this.payRank = result.data;
      }
    },
    // ...mapActions([GETPAYRANK]),
    changeTime(item) {
      this.time = item;
      this.show = !this.show;
      if (this.timeName === 0) {
        this.getPayRank();
      } else if (this.timeName === 1) {
        this.getPayRankTwo();
      } else if (this.timeName === 2) {
        this.getPayRankTre();
      } else if (this.timeName === 3) {
        this.getPayRankFou();
      }
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
  computed: {
    // ...mapState(["payRank"])
  },
  mounted() {
    this.getPayRank(),
      // this[GETPAYRANK](),
      this.$nextTick(() => {
        setTimeout(() => {}, 0);
      })
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#pay_rank {
  width: 100%;
  height: 100%;

  .pay_rank-t {
    position: relative;
    width: 100%;
    height: 319px;
    background-image: -webkit-linear-gradient(top, #FDC30B 0%, #FCCA27 100%);

    .box {
      width: 100%;
      height: 40px;
    }

    .header {
      width: 100%;
      height: 88px;
      padding: 27px 30px;
      box-sizing: border-box;

      .top {
        width: 100%;
        height: 34px;
        line-height: 34px;
        display: flex;

        .backBtn {
          height: 34px;
          display: flex;
          margin-right: 188px;
        }

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
          color: white;
          line-height: 34px;
        }

        .title {
          font-size: 36px;
          font-weight: 700;
          line-height: 34px;
          color: #ffffff;
        }
      }
    }

    .search {
      width: 690px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      margin: 0 30px;
      border-radius: 30px;
      margin-bottom: 29px;
      display: flex;

      .search-pic {
        width: 28px;
        height: 28px;
        bg-image('./img/search');
        background-size: 28px 28px;
        margin-top: 16px;
        margin-left: 30px;
        margin-right: 30px;
      }

      .ipt {
        width: 80%;
        height: 60px;
        background: transparent;
        font-size: 30px;
        color: #ffffff;

        &::-webkit-input-placeholder {
          color: #ffffff;
        }
      }
    }

    .time {
      width: 690px;
      height: 30px;
      margin: 0 30px;
      display: flex;
      margin-bottom: 18px;

      .time-num {
        font-size: 32px;
        color: white;
      }

      .time-btn {
        width: 24px;
        height: 12px;
        bg-image('./img/develop');
        background-size: 24px 12px;
        margin-left: 18px;
        margin-top: 9px;
      }
    }

    .money {
      width: 690px;
      height: 30px;
      line-height: 30px;
      margin: 0 30px;
      color: white;

      .money-l {
        font-size: 24px;
        font-weight: 700;
        margin-right: 41px;
      }

      .money-r {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }

  .pay_rank-c {
    width: 100%;
    height: 92px;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 2;
  }

  .block {
    width: 122px;
    background: rgba(23, 23, 23, 0.9);
    position: absolute;
    left: 140px;
    top: 244px;
    border-radius: 6px;
    z-index: 3;
    text-align: center;

    .block-t {
      width: 100%;
      height: 63px;
      line-height: 63px;
      border-bottom: 1px solid rgba(111, 111, 111, 1);
      font-size: 26px;
      color: white;
    }
  }
}
</style>

<style lang="stylus">.van-tabs--line {
  .van-tabs__wrap {
    width: 100%;
    height: 92px;
    background: pink;

    .van-pagination {
      width: 100%;
      height: 80px;

      .van-pagination__prev {
        width: 100%;
        height: 40px;
      }
    }

    .van-tabs__line {
      background: #feb255;
      height: 4px !important;
    }
  }

  .van-tabs__content {
    width: 100%;
    height: calc(100vh - 319px - 92px);
    overflow: auto;
  }

  .van-tab--active {
    color: #feb255;
  }

  .van-tab__text, .van-tab__text--ellipsis {
    display: block;
    height: 30px;
    line-height: 30px;
    font-size: 28px;
  }

  .message {
    width: 100%;
    height: 179px;
    padding-top: 37px;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #dddddd;

    .message-t {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .text-t {
        .phone {
          font-size: 30px;
          color: #333333;
          margin-right: 8px;
        }

        .type {
          font-size: 24px;
          color: #048FFF;
        }
      }

      .addMoney {
        font-size: 32px;
        color: #FFB051;
      }
    }

    .message-c {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .name {
        font-size: 26px;
        color: #999999;
      }

      .text-c {
        .text-white {
          font-size: 26px;
          color: #999999;
          margin-right: 6px;
        }

        .text-gold {
          font-size: 26px;
          color: #FFA436;
        }
      }
    }

    .message-b {
      display: flex;
      justify-content: space-between;

      .date {
        font-size: 26px;
        color: #999999;
      }

      .text-b {
        .text-white {
          font-size: 26px;
          color: #999999;
          margin-right: 6px;
        }

        .text-gold {
          font-size: 26px;
          color: #FFA436;
        }
      }
    }
  }
}
</style>

<style lang="stylus">
.van-pagination {
  width: 100%;
  height: 80px;
  font-size: 30px;
}

.van-pagination__item {
  width: 100%;
  height: 80px;
}

.van-pagination__page-desc {
  width: 100%;
  height: 80px;
}
</style>

