<template>
  <div id="Control">
    <div class="box"></div>
    <div class="header">
      <div class="header-content">
        <div class="backBtn" @touchstart="goTo('/home')">
          <div class="icon"></div>
          <div class="back">返回</div>
        </div>
        <div class="title">水控机</div>
        <div class="add" @touchstart="goTo('/add_water')">
        <div v-if="power" class="add-b">+添加</div>
        </div>
      </div>
    </div>
    <div class="content" ref="waterScroll">
      <div class="content-box">
        <div class="search">
          <div class="icon"></div>
          <input placeholder="输入设备地址或设备ID搜索" v-model="controlSearch" />
        </div>
        <template v-if="controlSearch?false:true">
          <div
            class="message"            
            v-for="(item,index) in controlList"
            :key="index"
          >
            <div class="message-t">
              <span class="site">{{item.location}}</span>
              <span class="T">{{item.temp}}&#8451;</span>
            </div>
            <div class="message-b">
              <span class="ID">ID:{{item.device_id}}</span>
              <span class="date">{{item.create_time}}</span>
              <div class="many"></div>
            </div>
            <div class="cube" :style="{ background: item.status === '正常'?'#2573FB':'#FF4246' }">{{item.status}}</div>
            <div class="rightTop" @touchstart="goTo('/Control_detail',item.index,item.device_id)"></div>
          </div>
        </template>
        <!-- ctrl v -->
        <template v-if="controlSearch?true:false">
          <div
            class="message"
            v-for="(item,index) in controlOne"
            :key="index"
          >
            <div class="message-t">
              <span class="site">{{item.location}}</span>
              <span class="T">{{item.temp}}&#8451;</span>
            </div>
            <div class="message-b">
              <span class="ID">ID:{{item.device_id}}</span>
              <span class="date">{{item.create_time}}</span>
              <div class="many"></div>
            </div>
            <div class="cube" :style="{ background: item.status === '正常'?'#2573FB':'#FF4246' }">{{item.status}}</div>
            <div class="rightTop" @touchstart="goTo('/Control_detail',item.index,item.device_id)"></div>
          </div>
        </template>
        <!-- 结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { YONGQIANG } from "@/api/BASE_URL";
import { Toast } from "vant";
import {mapState} from 'vuex'

let count = 1;
export default {
  name: "Control",
  data() {
    return {
      flag: false,
      controlList: {},
      controlOne: {},
      controlSearch: "",
    };
  },
  watch: {
    controlSearch: function (val) {
      this.getOne();
    },
  },
  computed:{
    ...mapState(["userInfo"]),
    power() {
      if (this.userInfo.accounttype === 'main') {
        return true
      }else if(this.userInfo.accounttype === 'staff'){
        if(this.userInfo.is_distruibutor === '1'){
          return false
        }else if(this.userInfo.add_device === '1'){
          return true
        }
      }
    },
  },
  methods: {
    //滑屏方法
    sellScroll() {
      this.waterScroll = new BScroll(this.$refs.waterScroll, {
        touchstart: true,
        pullUpLoad: {
          threshold: -50, // 当上拉距离超过50px时触发 pullingUp 事件
        },
      });
      this.waterScroll.on("pullingUp", () => {
        this.getControlCard();
        this.waterScroll.finishPullUp();
      });
    },
    goTo(path, index, id) {
      this.$router.replace({
        path: path,
        query: {
          index: index,
          id: id,
        },
      });
    },
    async getControlCard() {
      count++;
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/watercontroller/index",
          keyword: "",
          page: `${count}`,
        },
      });

      if (result.code === 0) {
        this.controlList.push(...result.data);
      }
    },
    async getOne() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/watercontroller/index",
          keyword: `${this.controlSearch}`,
        },
      });

      if (result.code === 0) {
        this.controlOne = result.data;
      }
    },
    async getControlList() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/watercontroller/index",
          keyword: "",
          page: 1,
        },
      });

      if (result.code === 0) {
        this.controlList = result.data;
      }
    },
  },
  mounted() {
    this.getControlList(),
      this.$nextTick(() => {
        //推入宏任务
        setTimeout(() => {
          this.sellScroll(); //调用滑屏的方法
        }, 0);
      });
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#Control {
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

    .header-content {
      width: 100%;
      height: 34px;
      display: flex;
      justify-content: space-between;

      .backBtn {
        height: 34px;
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
        }
      }

      .title {
        font-size: 36px;
        font-weight: 700;
        color: #333;
      }

      .add {
        width: 85px;
        font-size: 32px;
        font-weight: 700;
        color: #2674FA;
        margin-top: 2px;

        .add-b {
          font-size: 32px;
          font-weight: 700;
          color: #2674FA;
        }
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
        margin-bottom: 20px;

        .message-t {
          margin-bottom: 29px;

          .site {
            font-size: 32px;
            color: #333333;
            margin-right: 20px;
          }

          .T {
            font-size: 28px;
            font-weight: 700;
            color: #FA3B3F;
            margin-bottom: 10px;
          }
        }

        .message-b {
          display: flex;
          justify-content: space-between;

          .ID {
            font-size: 28px;
            color: #656565;
          }

          .date {
            font-size: 24px;
            color: #656565;
            margin-top: 4px;
          }

          .many {
            width: 38px;
            height: 35px;
            bg-image('./img/enter');
            background-size: 38px 35px;
          }
        }
        .rightTop {
          width 69px
          height 140px
          position absolute
          right 0
          top 0
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
    }
  }
}
</style>