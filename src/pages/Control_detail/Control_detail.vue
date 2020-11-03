<template>
  <div id="detail">
    <div class="box"></div>
    <div class="header">
      <div class="top">
        <div class="backBtn" @touchstart="goTo('/control')">
          <div class="icon"></div>
          <div class="back">返回</div>
        </div>
        <div class="title">水控机详情</div>
      </div>
    </div>
    <div class="Bscroll" ref="detailScroll">
      <div class="content">
        <div :class="background[0] " class="hah">
          <div class="message">
            <div class="message-t" v-if="controlDetail.device">
              <span class="text">{{controlDetail.device.location}}</span>
              <div class="code">{{controlDetail.device.status}}</div>
            </div>
            <div class="message-b" v-if="controlDetail.device">
              <span class="unit">设备ID {{controlDetail.device.device_id}}</span>
              <div class="info">
                <div class="icon-version"></div>
                <div class="version">版本 {{controlDetail.device.version}}</div>
              </div>
            </div>
          </div>
          <div class="money">
            <div class="white">
              <div class="money-t" v-if="controlDetail.device">
                <span class="date-l">上一次连接时间</span>
                <span class="date-r">{{controlDetail.device.lastconnect}}</span>
              </div>
              <div class="money-c" v-if="controlDetail.device">
                <span class="numT">{{controlDetail.device.temp}}&#8451;</span>
                <span class="textT">设备温度</span>
              </div>
              <div class="money-b">
                <div class="today">
                  <div class="today-t">
                    <div class="money-pic"></div>
                    <span class="today-text">今日销售</span>
                  </div>
                  <div class="today-b">{{controlDetail.day}}</div>
                </div>
                <div class="month">
                  <div class="month-text">当月销售</div>
                  <span class="month-num">{{controlDetail.mon}}</span>
                </div>
                <div class="sign" v-if="controlDetail.device">
                  <div class="sign-text">{{controlDetail.device.signal}}</div>
                  <div class="sign-pic"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="function">
            <div class="params" @touchstart="goParameter">
              <div class="params-pic"></div>
              <span class="params-text">参数修改</span>
            </div>
            <div class="price" @touchstart="good = true">
              <div class="price-pic"></div>
              <span class="price-text">校准价格</span>
            </div>
            <van-overlay :show="good">
              <div class="wrapper" @touchstart="go()">
                <div class="block" @touchstart.stop>
                  <div class="block-t">校准价格</div>
                  <div class="block-c">
                    <template v-if="param === '1' || param === '2'">
                      <div class="RMB">
                        <span class="RMB-text">输入价格(元)</span>
                        <input type="text" dir="rtl" v-model="littlePrice" />
                      </div>
                      <div class="RMB">
                        <span class="RMB-text">输入水量(升)</span>
                        <input type="text" dir="rtl" v-model="littleCf" />
                      </div>
                    </template>
                    <template v-if="param === '3'">
                      <div class="RMB">
                        <span class="RMB-text">输入价格(元)</span>
                        <input type="text" dir="rtl" v-model="littlePrice" />
                      </div>
                      <div class="RMB">
                        <span class="RMB-text">输入水量(升)</span>
                        <input type="text" dir="rtl" v-model="littleCf" />
                      </div>
                      <div class="RMB">
                        <span class="RMB-text">流量计参数(脉冲/升)</span>
                        <input type="text" dir="rtl" v-model="longParam" />
                      </div>
                      <div class="RMB">
                        <span class="RMB-text">输入价格(元-第二出水口)</span>
                        <input type="text" dir="rtl" v-model="longPrice2" />
                      </div>
                      <div class="RMB">
                        <span class="RMB-text">输入水量(升-第二出水口)</span>
                        <input type="text" dir="rtl" v-model="longCf2" />
                      </div>
                      <div class="RMB">
                        <span class="RMB-text">流量计参数(升-第二出水口)</span>
                        <input type="text" dir="rtl" v-model="longParam2" />
                      </div>
                    </template>
                    <div class="type">
                      <span class="type-text">模式</span>
                      <div class="radioBtn">
                        <div>
                          <input type="radio" value="1" v-model="param" name="radios" />计时
                        </div>
                        <div v-if="versionFlag">
                          <input type="radio" value="2" v-model="param" name="radios" />流量计
                        </div>
                        <div>
                          <input type="radio" value="3" v-model="param" name="radios" />流量计参数
                        </div>
                      </div>
                    </div>
                    <div class="checkBtn" @touchstart="correctMethod">{{textFlag?'取消校准':'校准'}}</div>
                  </div>
                </div>
              </div>
            </van-overlay>
            <div class="SIM" @touchstart="simMethod">
              <div class="SIM-pic"></div>
              <span class="SIM-text">SIM卡信息</span>
            </div>
            <van-dialog v-model="SIM" title="SIM卡信息" class="simDialog">
              <div class="SIM-item" v-if="SIMDetail">
                <span class="SIM-text-l">SIM卡号</span>
                <span class="SIM-text-r">{{SIMDetail.iccid}}</span>
              </div>
              <div class="SIM-item" v-if="SIMDetail">
                <span class="SIM-text-l">SIM状态</span>
                <span class="SIM-text-r" v-if="SIMDetail.data">{{SIMDetail.data.status}}</span>
              </div>
              <div class="SIM-item" v-if="SIMDetail">
                <span class="SIM-text-l">SIM类型</span>
                <span class="SIM-text-r" v-if="SIMDetail.data">{{SIMDetail.data.carrier}}</span>
              </div>
              <div class="SIM-item" v-if="SIMDetail">
                <span class="SIM-text-l">SIM卡本月用量</span>
                <span class="SIM-text-r" v-if="SIMDetail.data">{{SIMDetail.data.sim_used}}</span>
              </div>
              <div class="SIM-item" v-if="SIMDetail">
                <span class="SIM-text-l">SIM卡到期时间</span>
                <span class="SIM-text-r" v-if="SIMDetail.data">{{SIMDetail.data.expiredate}}</span>
              </div>
            </van-dialog>
            <div class="QR" @touchstart="show = !show">
              <div class="QR-pic"></div>
              <span class="QR-text">查看二维码</span>
            </div>
            <van-dialog v-model="show" title="常按保存图片" class="qrDialog">
              <div v-if="this.controlDetail.device">
              <img :src="getQR()"/>
              </div>
            </van-dialog>
          </div>
        </div>
        <div class="bottom">
          <div class="note">
            <div class="note-t">
              <div class="border"></div>
              <span class="note-text">详细信息</span>
            </div>
            <div class="show">
              <div class="check" v-if="controlDetail.device">
                <span>商家</span>
                <span>{{controlDetail.device.owner}}</span>
              </div>
              <div class="check" v-if="controlDetail.device">
                <span>水质</span>
                <span>{{controlDetail.device.tds}}</span>
              </div>
              <div class="check" v-if="controlDetail.device">
                <span>当前温度</span>
                <span>{{controlDetail.device.temp}}</span>
              </div>
              <div class="check" v-if="controlDetail.device">
                <span>单日消费限额</span>
                <span>{{controlDetail.device.limit_day}}</span>
              </div>
              <div class="check" v-if="controlDetail.device">
                <span>单次消费限额</span>
                <span>{{controlDetail.device.limit}}</span>
              </div>
              <div class="check">
                <span>模式</span>
                <span>计时模式</span>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="delete" @touchstart="deleteMethod" v-if="power">删除设备</div>
        </div>
      </div>
    </div>
    <div id="parameter" v-if="bar">
      <div class="box"></div>
      <div class="header">
        <div class="top">
          <div class="backBtn" @touchstart="goParameter">
            <div class="icon"></div>
            <div class="back">返回</div>
          </div>
          <div class="title">参数修改</div>
        </div>
      </div>
      <div class="wrapper" ref="parameterScroll">
        <div class="wrapper-content">
          <div class="center">
            <div class="below"></div>
            <div class="center-item" v-if="controlDetail.device">
              <span class="text-l">设备地址</span>
              <input v-model.trim="location" dir="rtl" />
            </div>

            <div class="center-item" v-if="controlDetail.device">
              <span class="text-l">单次消费限额(元)</span>
              <input v-model.trim="limit" dir="rtl" />
            </div>
            <div class="center-item" v-if="controlDetail.device.limit_2">
              <span class="text-l">第二路单次消费限额(元)</span>
              <input v-model.trim="twoLimit" dir="rtl" />
            </div>
            <div class="center-item" v-if="controlDetail.device">
              <span class="text-l">单日消费限额(元)</span>
              <input v-model.trim="dayLimit" dir="rtl" />
            </div>
          </div>
          <div class="footer">
            <div class="btn" @touchstart="goSave">保存</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Dialog, Overlay, Radio, RadioGroup, Toast } from "vant";
import { YONGQIANG, JIACHI } from "@/api/BASE_URL";
import {mapState} from 'vuex'
// import html2canvas from 'html2canvas' // 常按保存图片
export default {
  name: "Detail",
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [Overlay.name]: Overlay,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
  },
  data() {
    return {
      textFlag: false,
      flag: false,
      location: "",
      limit: "",
      twoLimit: "",
      dayLimit: "",
      background: ["blue", "yellow", "red"], //背景图
      show: false, //二维码,
      SIM: false, //SIM卡
      good: false, //校准价格的变量
      radio: "",
      controlDetail: {},
      bar: false,
      SIMDetail: null,
      param: "1",
      textFlag: false,
      status: "",
      flow_mode: "计时模式",
      littlePrice: "",
      littleCf: "",
      longParam: "",
      longParam2: "",
      longPrice2: "",
      longCf2: "",
      versionFlag: true,
      twoFlag: false,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    power() {
      if (this.userInfo.accounttype === 'main') {
        return true
      }else if(this.userInfo.accounttype === 'staff'){
        if(this.userInfo.is_distruibutor === '1'){
          return false
        }else if(this.userInfo.delete_device === '1'){
          return true
        }
      }
    },
  },
  methods: {
    simMethod() {
      this.SIM = !this.SIM;
      this.getSIM();
    },
    async correctMethod() {
      if (this.param === "1" || this.param === "2") {
        if (!this.textFlag) {
          if (this.param === "1") {
            this.status = "calibrate_timer";
            this.flow_mode = "计时模式";
            let A = {
              flow_mode: `${this.flow_mode}`,
              flow_para: `${this.longParam}`,
              cali_water: `${this.littleCf}`,
              cali_price: `${this.littlePrice}`,
              status: `${this.status}`,
              cali_price2: `${this.longPrice2}`,
              cali_water2: `${this.longCf2}`,
              flow_para2: `${this.longParam2}`,
            };
            const result = await this.axios({
              url: `${YONGQIANG}`,
              method: "post",
              params: {
                r: "api/simpleapp/v1/watercontroller/checkprice",
                id: `${this.$route.query.index}`,
              },
              data: A,

              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            });
            // if(result.code === 0){
            this.textFlag = true;
            // this.showPrice = true
            Toast(`请接满 ${this.littleCf} 升水后暂停完成价格校准`);
            // }
          } else if (this.param === "2") {
            this.status = "calibrate_flow";
            this.flow_mode = "流量计校准";
            let B = {
              flow_mode: `${this.flow_mode}`,
              flow_para: `${this.longParam}`,
              cali_water: `${this.littleCf}`,
              cali_price: `${this.littlePrice}`,
              status: `${this.status}`,
              cali_price2: `${this.longPrice2}`,
              cali_water2: `${this.longCf2}`,
              flow_para2: `${this.longParam2}`,
            };
            const result = await this.axios({
              url: `${YONGQIANG}`,
              method: "post",
              params: {
                r: "api/simpleapp/v1/watercontroller/checkprice",
                id: `${this.$route.query.index}`,
              },
              data: B,

              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            });
            this.textFlag = true;
            // this.showPrice = true
            Toast(`请接满 ${this.littleCf} 升水后暂停完成价格校准`);
          }
        } else {
          this.status = "normal";
          this.textFlag = false;
          let F = {
            flow_mode: `${this.flow_mode}`,
            flow_para: `${this.longParam}`,
            cali_water: `${this.littleCf}`,
            cali_price: `${this.littlePrice}`,
            status: `${this.status}`,
            cali_price2: `${this.longPrice2}`,
            cali_water2: `${this.longCf2}`,
            flow_para2: `${this.longParam2}`,
          };
          const result = await this.axios({
            url: `${YONGQIANG}`,
            method: "post",
            params: {
              r: "api/simpleapp/v1/watercontroller/checkprice",
              id: `${this.$route.query.index}`,
            },
            data: F,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          });
          Toast(`${result.msg}`);
          // this.getControlDetail()
        }
      } else {
        this.status = "calibrate";
        this.flow_mode = "流量计参数设置";
        let C = {
          flow_mode: `${this.flow_mode}`,
          flow_para: `${this.longParam}`,
          cali_water: `${this.littleCf}`,
          cali_price: `${this.littlePrice}`,
          status: `${this.status}`,
          cali_price2: `${this.longPrice2}`,
          cali_water2: `${this.longCf2}`,
          flow_para2: `${this.longParam2}`,
        };
        const result = await this.axios({
          url: `${YONGQIANG}`,
          method: "post",
          params: {
            r: "api/simpleapp/v1/watercontroller/checkprice",
            id: `${this.$route.query.index}`,
          },
          data: C,

          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        Toast(`${result.msg}`);
        // this.getControlDetail()
      }
    },
    async deleteMethod() {
      const result = await this.axios({
        url: `${JIACHI}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/device/deldevice",
          deviceid: `${this.$route.query.id}`,
        },
      });

      Toast(`${result.msg}`);
      if (result.code === 0) {
        this.$router.replace("/control");
      }
    },
    async goSave() {
      if (
        this.location !== "" &&
        this.limit !== "" &&
        this.twoLimit !== "" &&
        this.dayLimit !== ""
      ) {
        const result = await this.axios({
          url: `${YONGQIANG}`,
          method: "post",
          params: {
            r: "api/simpleapp/v1/watercontroller/update",
            id: `${this.$route.query.index}`,
          },
          data: {
            location: `${this.location}`,
            limit: `${this.limit}`,
            limit_2: `${this.twoLimit}`,
            limit_day: `${this.dayLimit}`,
          },
        });

        Toast(`${result.msg}`);
        if (result.code === 0) {
          this.getControlDetail();
        }
      } else {
        Toast("参数不能为空");
      }
    },
    goParameter() {
      this.bar = !this.bar;
    },
    go() {
      //校准的方法
      this.good = !this.good;
    },
    goTo(path) {
      this.$router.replace(path);
    },
    //实例better-scroll的方法
    initScroll() {
      this.detailScroll = new BScroll(this.$refs.detailScroll, {
        touchstart: true,
      });
    },
    getQR() {
      return 'http://server.happy-ti.com/index.php?r=api/simpleapp/v1/device/qrcode&token='+`${localStorage.getItem('token')}` + '&deviceid='+`${this.$route.query.index}`+ '&location=' + `${this.controlDetail.device.location}` + '&saler=' +  `${this.controlDetail.device.owner}`
    },
    async getSIM() {
      const result = await this.axios({
        url: `${JIACHI}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/device/simcard",
          deviceid: `${this.$route.query.id}`,
        },
      });

      Toast(`${result.msg}`);
      this.SIMDetail = result.data;
    },
    async getControlDetail() {
      const result = await this.axios({
        url: `${YONGQIANG}`,
        method: "get",
        params: {
          r: "api/simpleapp/v1/watercontroller/view",
          id: `${this.$route.query.index}`,
        },
      });
      if (result.code === 0) {
        this.controlDetail = result.data;
        this.littleCf = `${this.controlDetail.device.cali_water}` / 10;
        this.littlePrice = this.controlDetail.device.cali_price / 10;
        this.longParam = this.controlDetail.device.flow_para;
        this.longParam2 = this.controlDetail.device.waterflow_para2;
        this.longCf2 = this.controlDetail.device.cali_water2 / 10;
        this.longPrice2 = this.controlDetail.device.cali_price2 / 10;
        this.location = this.controlDetail.device.location;
        this.limit = this.controlDetail.device.limit;
        this.limit2 = this.controlDetail.device.limit2;
        this.limit_day = this.controlDetail.device.day_limit;
        if (this.controlDetail.extra) {
          this.make_water_delay = this.controlDetail.extra.make_water_delay;
        }
        if (this.controlDetail.device.version < 6.93) {
          this.versionFlag = false;
        }
        if (
          this.controlDetail.extra &&
          this.controlDetail.extra.support_dual_port === "1"
        ) {
          this.twoFlag = true;
        }
        if ((this.controlDetail.device.status === "calibrate_flow")) {
          this.param = "2";
          this.flow_mode = "流量计校准";
        } else if ((this.controlDetail.device.price_time === 0)) {
          this.param = "3";
          this.flow_mode = "流量计参数设置";
        } else {
          this.param = "1";
          this.flow_mode = "计时模式";
        }
      }
    },
  },
  mounted() {
    // html2canvas(this.$refs.captureRef),//常按保存图片
    this.getControlDetail(),
      this.$nextTick(() => {
        setTimeout(() => {
          this.initScroll(); //滑屏方法
        }, 0);
      });
  },
};
</script>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#detail {
  width: 100%;
  height: 100%;

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
    background: white;

    .top {
      width: 100%;
      height: 34px;
      line-height: 34px;
      display: flex;

      .backBtn {
        height: 34px;
        display: flex;
        margin-right: 168px;

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

  .Bscroll {
    width: 100%;
    height: calc(100vh - 128px);
    overflow: hidden;

    .content {
      width: 100%;

      .hah {
        .message {
          width: 100%;
          height: 183px;
          padding: 59px 30px 37px 31px;
          box-sizing: border-box;

          .message-t {
            width: 100%;
            height: 40px;
            display: flex;
            margin-bottom: 29px;

            .text {
              font-size: 34px;
              color: #ffffff;
              margin-right: 29px;
              margin-top: 2px;
              font-weight: 700;
            }

            .code {
              height: 38px;
              line-height: 38px;
              background: white;
              border-radius: 19px;
              font-size: 26px;
              color: #4688F3;
              text-align: center;
              font-weight: bold;
              padding: 0 10px;
            }
          }

          .message-b {
            width: 100%;
            height: 32px;
            overflow: hidden;

            .unit {
              font-size: 26px;
              color: #BDD6FE;
              float: left;
            }

            .info {
              float: right;
              display: flex;

              .icon-version {
                width: 34px;
                height: 32px;
                bg-image('./img/edition');
                background-size: 34px 32px;
                margin-right: 14px;
              }

              .version {
                font-size: 30px;
                color: white;
                margin-top: 4px;
              }
            }
          }
        }

        .money {
          width: 100%;
          height: 250px;
          padding: 0 30px;
          box-sizing: border-box;

          .white {
            width: 690px;
            height: 250px;
            padding: 30px 30px;
            box-sizing: border-box;
            background: white;
            border-radius: 6px;
            box-shadow: 5px 5px 10px #C1BEBE;

            .money-t {
              width: 100%;
              height: 24px;
              display: flex;
              justify-content: space-between;
              margin-bottom: 27px;

              .date-l {
                font-size: 26px;
                font-weight: 700;
                color: #333333;
              }

              .date-r {
                font-size: 26px;
                color: #656565;
              }
            }

            .money-c {
              width: 100%;
              height: 27px;
              line-height: 27px;
              margin-bottom: 40px;

              .numT {
                font-size: 36px;
                color: #FA3B3F;
                margin-right: 17px;
              }

              .textT {
                font-size: 26px;
                color: #999999;
              }
            }

            .money-b {
              width: 100%;
              height: 72px;
              display: flex;

              .today {
                width: 220px;
                height: 72px;

                .today-t {
                  width: 100%;
                  height: 29px;
                  display: flex;
                  align-items: center;
                  margin-bottom: 6px;

                  .money-pic {
                    width: 36px;
                    height: 29px;
                    bg-image('./img/gold');
                    background-size: 36px 29px;
                    margin-right: 14px;
                  }

                  .today-text {
                    font-size: 24px;
                    font-weight: 700;
                    color: #333333;
                  }
                }

                .today-b {
                  text-align: center;
                  font-size: 34px;
                  color: #FFA335;
                }
              }

              .month {
                width: 220px;
                height: 72px;
                text-align: center;
                A-border-1px(#dddddd);

                .month-text {
                  width: 100%;
                  height: 29px;
                  font-size: 24px;
                  font-weight: 700;
                  color: #333333;
                  margin-bottom: 6px;
                }

                .month-num {
                  font-size: 34px;
                  color: #FFA335;
                }
              }

              .sign {
                width: 41px;
                height: 72px;
                text-align: center;
                margin-left: 169px;

                .sign-text {
                  font-size: 30px;
                  color: #333333;
                  margin-bottom: 8px;
                }

                .sign-pic {
                  width: 41px;
                  height: 24px;
                  bg-image('./img/sognal');
                  background-size: 41px 24px;
                }
              }
            }
          }
        }

        .function {
          width: 100%;
          height: 197px;
          padding: 0 30px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-around;
          align-items: center;

          .params {
            height: 118px;
            text-align: center;

            .params-pic {
              width: 80px;
              height: 80px;
              bg-image('./img/parameter modification');
              background-size: 80px 80px;
              margin: 0 auto;
              margin-bottom: 15px;
            }

            .params-text {
              font-size: 24px;
              color: #333333;
            }
          }

          .price {
            height: 118px;
            text-align: center;

            .price-pic {
              width: 80px;
              height: 80px;
              bg-image('./img/calibration price');
              background-size: 80px 80px;
              margin: 0 auto;
              margin-bottom: 15px;
            }

            .price-text {
              font-size: 24px;
              color: #333333;
            }
          }

          .wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;

            .block {
              width: 690px;
              background: white;
              border-radius: 10px;

              .block-t {
                text-align: center;
                font-size: 36px;
                color: #343434;
                margin-top: 59px;
                margin-bottom: 50px;
              }

              .block-c {
                margin: 0 auto;
                width: 610px;

                .RMB {
                  width: 610px;
                  height: 88px;
                  border: 1px solid #C6C6C6;
                  padding: 0 30px;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 30px;

                  .RMB-text {
                    font-size: 32px;
                    color: #666666;
                  }

                  input {
                    width: 30%;
                    height: 98%;
                    line-height: 98%;
                    font-size: 32px;
                  }
                }

                .type {
                  width: 610px;
                  height: 88px;
                  line-height: 88px;
                  border: 1px solid #C6C6C6;
                  padding: 0 30px;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: space-between;

                  .type-text {
                    font-size: 32px;
                    color: #666666;
                  }

                  .radioBtn {
                    display: flex;

                    div {
                      margin-right: 6px;
                    }
                  }
                }

                .checkBtn {
                  width: 200px;
                  height: 70px;
                  line-height: 70px;
                  text-align: center;
                  background-image: -webkit-linear-gradient(top, #56CCF2 0%, #3080ED 100%);
                  color: white;
                  font-size: 32px;
                  border-radius: 32px;
                  margin: 0 auto;
                  margin-top: 40px;
                  margin-bottom: 40px;
                }
              }
            }
          }

          .SIM {
            height: 118px;
            text-align: center;

            .SIM-pic {
              width: 80px;
              height: 80px;
              bg-image('./img/SIM card information');
              background-size: 80px 80px;
              margin: 0 auto;
              margin-bottom: 15px;
            }

            .SIM-text {
              font-size: 24px;
              color: #333333;
            }
          }

          .QR {
            height: 118px;
            text-align: center;

            .QR-pic {
              width: 80px;
              height: 80px;
              bg-image('./img/view QR code');
              background-size: 80px 80px;
              margin: 0 auto;
              margin-bottom: 15px;
            }

            .QR-text {
              font-size: 24px;
              color: #333333;
            }
          }
        }
      }

      .bottom {
        width: 100%;
        padding-top: 30px;
        padding-left: 30px;
        padding-right: 30px;
        box-sizing: border-box;
        background: #f5f5f5;

        .note {
          width: 100%;
          background: white;
          padding-top: 24px;
          box-sizing: border-box;
          border-radius: 20px;
          overflow: hidden;

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

            .note-text {
              font-size: 32px;
              font-weight: bold;
              color: #333;
            }
          }

          .show {
            border-radius: 20px;

            .check {
              width: 100%;
              height: 88px;
              background: white;
              padding: 31px;
              box-sizing: border-box;
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid #f5f5f5;
              font-size: 30px;

              span {
                color: #333333;
                font-weight: 700;
              }
            }
          }
        }
      }

      .footer {
        width: 100%;
        height: 212px;
        background: #f5f5f5;
        padding: 60px 0;
        box-sizing: border-box;

        .delete {
          width: 690px;
          height: 92px;
          line-height: 92px;
          background: white;
          margin: 0 auto;
          border-radius: 12px;
          font-size: 32px;
          color: #FF575D;
          text-align: center;
          font-weight: 700;
        }
      }

      .blue {
        width: 100%;
        height: 630px;
        bg-image('./img/background');
        background-size: 100%;
        background-repeat: no-repeat;
      }

      .yellow {
        width: 100%;
        height: 630px;
        bg-image('./img/yellow');
        background-size: 100%;
        background-repeat: no-repeat;
      }

      .red {
        width: 100%;
        height: 630px;
        bg-image('./img/red');
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>

<style lang="stylus">
.qrDialog {
  width: 522px;
  height: 416px;
  text-align: center;

  .van-dialog__header {
    font-size: 30px;
    color: #343434;
    margin-top: 36px;
    margin-bottom: 36px;
  }

  .van-dialog__content {
    margin-bottom: 38px;
  }

  .van-button__content {
    font-size: 30px;
  }

  img {
    width: 191px;
    height: 191px;
    margin: 0 auto;
  }
}

.simDialog {
  width: 690px;
  height: 813px;
  text-align: center;

  .van-dialog__header {
    font-size: 36px;
    color: #343434;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .van-dialog__content {
    .SIM-item {
      width: 610px;
      height: 88px;
      line-height: 88px;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      margin-bottom: 30px;
      padding: 0 30px;
      box-sizing: border-box;
      border: 1px solid #C6C6C6;

      .SIM-text-l {
        font-size: 32px;
        color: #666666;
      }

      .SIM-text-r {
        font-size: 32px;
        color: #343434;
      }
    }
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

.van-radio {
  font-size: 32px;

  .van-icon {
    width: 28px;
    height: 28px;
  }

  .van-radio__label {
    margin-top: 6px;
  }
}
</style>

<style scoped lang="stylus">
@import '../../common/stylus/mixins.styl';

#parameter {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

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

  .wrapper {
    width: 100%;
    height: calc(100vh - 128px);
    overflow: hidden;

    .wrapper-content {
      padding-top: 22px;
      width: 100%;

      .center {
        width: 100%;
        padding: 0 31px;
        box-sizing: border-box;
        background: #ffffff;
        position: relative;

        .center-item {
          width: 100%;
          height: 90px;
          background: white;
          padding: 31px 0;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #f5f5f5;
          font-size: 32px;

          .text-l {
            color: #999999;
            font-weight: 700;
          }

          input {
            width: 30%;
            height: 120%;
          }
        }

        .below {
          position: absolute;
          z-index: -2;
        }
      }

      .saving {
        width: 100%;
        height: 80px;
        line-height: 80px;
        padding: 0 30px;
        box-sizing: border-box;
        background: #f5f5f5;
        color: #656565;

        .saving-text {
          font-size: 30px;
        }
      }

      .last {
        width: 100%;
        height: 90px;
        background: white;
        padding: 31px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid #f5f5f5;
        font-size: 32px;

        .last-l {
          color: #999999;
          font-weight: 700;
        }

        .last-r {
          color: #333333;
          font-weight: 700;
        }
      }

      .footer {
        width: 100%;
        height: 212px;
        padding: 60px 0;
        box-sizing: border-box;
        background: #f5f5f5;

        .btn {
          width: 690px;
          height: 92px;
          line-height: 92px;
          background: white;
          margin: 0 auto;
          border-radius: 12px;
          font-size: 32px;
          color: #048FFF;
          text-align: center;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
