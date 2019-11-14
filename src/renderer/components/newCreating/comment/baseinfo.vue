<template>
  <div id="commentbase">
  <!-- tese -->
  <div class="baseInfo">
      <table class="mainTable" align="center" >
          <tr class="tr0">
              <td>公司全称</td>
              <td>{{tabledata.compName|emptyValue}}</td>
              <td>MARS评级</td>
              <td>{{tabledata.gradeLevel|emptyValue}}</td>
              <!-- <td v-if="showName==0">德邦评级</td>
              <td v-if="showName==0">{{rowData.companyLevel|emptyValue}}</td> -->
          </tr>
           <tr class="tr1">
              <td>外部评级机构</td>
              <td>{{tabledata.companyDataDto.rate_agencyissuer |emptyValue}}</td>
              <td>外部评级</td>
              <td>{{tabledata.companyDataDto.latestissurercreditrating2|emptyValue}}</td>
          </tr>
          <tr class="tr1">
              <td>实际控制人属性</td>
              <td>{{tabledata.companyDataDto.holder_controllerattr|emptyValue}}</td>
              <td>是否上市</td>
              <td>{{tabledata.companyDataDto.listingornot|emptyValue}}</td>
          </tr>
          <tr class="tr2">
              <td>注册资本(万元)</td>
              <td>{{tabledata.companyDataDto.regcapital|reserve2Decimal|thousandSeparate|emptyValue}}</td>
              <td>实际控制人</td>
              <td>{{tabledata.companyDataDto.holder_controller|emptyValue}}</td>
          </tr>
          <tr class="tr3">
              <td>注册地址</td>
              <td colspan="3">{{tabledata.companyDataDto.address|emptyValue}}</td>
          </tr>
          <tr class="tr4">
              <td>公司简介</td>
              <td colspan="3" style="line-height:20px;">{{tabledata.companyDataDto.briefing|emptyValue}}</td>
          </tr>
      </table>
        <div class="chartWrap" style="width:100%;text-align:center">
        <Vchart ref="vchart2" :options="chartOptiondio"   v-if="showChart"></Vchart>
      </div>
      <table class="childTable" align="center" style="margin-top: 10px;">
          <tr class="ctr0">
              <td colspan="2">主要股东</td>
          </tr>
          <tr class="ctr1">
              <th>股东名称</th>
              <th>持股比例(%)</th>
          </tr>
          <tr :class="'ctr'+index+2" v-for="(item,index) in tabledata.companyDataDto.shareholders" :key="index">
              <td>{{item.name|emptyValue}}</td>
              <td>{{item.value|reserve2Decimal|emptyValue}}</td>
          </tr>
      </table>
  </div>

  </div>
</template>
<script>
import Echarts from 'vue-echarts';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import newHmlyVue from '../../../pages/newHmly.vue';
function convertLevel(level) {
  console.log(level);
  level = level || 'E';
  return Math.abs(level.charCodeAt(0) - 70);
}
export default {
  components: {
    Vchart: Echarts,
  },
  data() {
    return {
      activeName: 'first',
      tabledata: {
        compName: '',
        gradeLevel: '',
        holder_controllerattr: '',
        companyDataDto: {
          address: '',
          briefing: '',
          holder_controller: '',
          regcapital: '',
          listingornot: '',
        },
      },
      showChart: true,
      chartOptiondio: {
        title: {
          text: '',
          textStyle: {
            color: '#666',
          },
        },
        // tooltip: {
        //     trigger: 'item',
        //     // formatter: function (params, ticket, callback) {
        //     //     console.log('##params:', params);
        //     //     return '每个维度的评价是根据评级模型中多个指标的分数加总后再分级，用来衡量企业相应维度在行业中的排名；</br>部分定性指标不在这六个维度内，例如股东性质、融资渠道多样性等；</p></br>\
        //     //     <p>行业地位——主要包括地产企业排名、净资产、销售商品提供劳务收到的现金、是否上市等；</p>\
        //     //     <p>资产负债能力——主要指标包括有息资本负债率、对外担保比率等；</p>\
        //     //     <p>盈利能力——主要包括毛利率、净利率、ROA、ROE、销售商品提供劳务收到的现金增长等；</p>\
        //     //     <p>短期偿债能力——主要包括流比、速比、现金比、投资性地产占比、长短期有息债务比、EBITDA利息保障倍数等；</p>\
        //     //     <p>营运能力——主要包括销售回款率、总资产周转速度等；</p>\
        //     //     <p>土储布局优势——包括土储在各地区的分布、各地房价收入比、一般预算收入增长、城市等级等。</p>'
        //     // },
        //     position:['-8%','50%'],
        //     textStyle:{
        //         lineHeight:10
        //     }
        // },
        radar: [{
          indicator: [

          ],
          center: ['50%', '50%'],
          radius: 120,
          startAngle: 90,
          splitNumber: 5,
          shape: 'rect',
          name: {
            formatter: '{value}',
            textStyle: {
              color: '#72ACD1',
            },
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(114, 172, 209, 0.2)',
                'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)',
              ],
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10,
            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
        }],
        series: [{
          name: '',
          type: 'radar',
          itemStyle: {
            emphasis: {
              // color: 各异,
              lineStyle: {
                width: 4,
              },
            },
          },
          data: [{
            value: this.levelData,
            name: '图一',
            symbolSize: 5,
            areaStyle: {
              normal: {
                color: 'rgba(255, 255, 255, 0.5)',
              },
            },
          }],
        }],
      },
      levelDatadio: [],
    };
  },
  computed: {
    ...mapGetters(['getNewoutputContent']),
    outputVisible() {
      this.tabledata = this.getNewoutputContent.baseInfo;
      const show = this.getNewoutputContent.outputVisible;
      if (show) {
        // debugger
        // this.tabledata = this.getNewoutputContent.baseInfo
        console.log(' this.getNewoutputContent,', this.getNewoutputContent);

        let arr = [];
        if (this.getNewoutputContent.moduleId == 5035 || this.getNewoutputContent.moduleId == 5035 || this.getNewoutputContent.moduleId == 5036 || this.getNewoutputContent.moduleId == 6001 || this.getNewoutputContent.moduleId == 6002 || this.getNewoutputContent.moduleId == 6003 || this.getNewoutputContent.moduleId == 6004) {
          const {
            s_scale_level,
            s_industry_status,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_industry_layout,
          } = this.getNewoutputContent.rowdata;
          arr = [s_scale_level,
            s_industry_status,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_industry_layout,
          ];
          this.chartOptiondio.radar[0].indicator = [
            {
              text: '规模水平',
              max: 5,
            },
            {
              text: '资产负债能力',
              max: 5,
            },
            {
              text: '盈利能力',
              max: 5,
            },
            {
              text: '偿债能力',
              max: 5,
            },
            {
              text: '营运能力',
              max: 5,
            },
            {
              text: '产业布局',
              max: 5,
            }];
        } else if (this.getNewoutputContent.moduleId == 5053) {
          const {
            s_industry_status,
            s_asset_liability_capability,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_soil_storage_layout,
          } = this.getNewoutputContent.rowdata;
          arr = [
            s_industry_status,
            s_asset_liability_capability,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_soil_storage_layout,
          ];
          this.chartOptiondio.radar[0].indicator = [
            {
              text: '行业地位',
              max: 5,
            },
            {
              text: '资产负债能力',
              max: 5,
            },
            {
              text: '盈利能力',
              max: 5,
            },
            {
              text: '短期偿债能力',
              max: 5,
            },
            {
              text: '营运能力',
              max: 5,
            },
            {
              text: '土储布局优势',
              max: 5,
            }];
        }
        const show = arr.every(item => item == 'undefined' || item == undefined);
        if (!show) {
          this.showChart = true;
          this.$nextTick(() => {
            this.innitChart();
          });
        } else {
          this.showChart = false;
        }
      } else {
        this.tabledata = {
          companyDataDto: {},
        };
      }
    },

  },
  watch: {
    outputVisible(val) {
      debugger;
      console.log('rowDatarowDatarowDatarowData+++++++', val);

      if (val) {
        this.tabledata = this.getNewoutputContent.baseInfo;
        console.log(' this.getNewoutputContent,', this.getNewoutputContent);
        this.chartOptiondio = { ...this.chartOption };
        let arr = [];
        if (this.getNewoutputContent.moduleId == 5035 || this.getNewoutputContent.moduleId == 5035 || this.getNewoutputContent.moduleId == 5036 || this.getNewoutputContent.moduleId == 6001 || this.getNewoutputContent.moduleId == 6002 || this.getNewoutputContent.moduleId == 6003 || this.getNewoutputContent.moduleId == 6004) {
          const {
            s_scale_level,
            s_industry_status,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_industry_layout,
          } = this.getNewoutputContent.rowdata;
          arr = [s_scale_level,
            s_industry_status,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_industry_layout,
          ];
        } else if (this.getNewoutputContent.moduleId == 5053) {
          const {
            s_industry_status,
            s_asset_liability_capability,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_soil_storage_layout,
          } = this.getNewoutputContent.rowdata;
          arr = [
            s_industry_status,
            s_asset_liability_capability,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_soil_storage_layout,
          ];
        }
        const show = arr.every(item => item == 'undefined' || item == undefined);
        if (!show) {
          this.showChart = true;
          this.$nextTick(() => {
            this.innitChart();
          });
        } else {
          this.showChart = false;
        }
      } else {
        this.tabledata = {
          companyDataDto: {},
        };
        this.formdata = {};
      }
    },
  },
  created() {

  },
  methods: {
    handleClick() {
    },
    innitChart() {
      //  console.log('scope++++++',scope)
      if (this.getNewoutputContent.moduleId == 5035 || this.getNewoutputContent.moduleId == 5035 || this.getNewoutputContent.moduleId == 5036 || this.getNewoutputContent.moduleId == 6001 || this.getNewoutputContent.moduleId == 6002 || this.getNewoutputContent.moduleId == 6003 || this.getNewoutputContent.moduleId == 6004) {
        const {
          s_scale_level,
          s_industry_status,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_industry_layout,
        } = this.getNewoutputContent.rowdata;
        this.levelDatadio = [convertLevel(s_scale_level), convertLevel(s_industry_status), convertLevel(s_profitability), convertLevel(s_short_term_solvency), convertLevel(s_management_ability), convertLevel(s_industry_layout)];
      } else if (this.getNewoutputContent.moduleId == 5053) {
        const {
          s_industry_status,
          s_asset_liability_capability,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_soil_storage_layout,
        } = this.getNewoutputContent.rowdata;
        this.levelDatadio = [convertLevel(s_industry_status), convertLevel(s_asset_liability_capability), convertLevel(s_profitability), convertLevel(s_short_term_solvency), convertLevel(s_management_ability), convertLevel(s_soil_storage_layout)];
      }

      console.log('thisLevel', this.levelDatadio);
      this.chartOptiondio.series[0].data[0].value = this.levelDatadio;
    },
    sendHide() {
      this.$emit('sendHide', false);
      this.activeName = 'first';
      this.clearNewChartImgs();
    },
  },
};
</script>

<style lang="less" scoped>
#commentbase{
  /*基础信息*/
    .baseInfo {
        width: 100%;
        margin: 0 auto;
    }

    .baseInfo .chartWrap .echarts {
        margin: 0 auto;
        margin-top: 10px;
        height: 320px;
    }

    .baseInfo .moduelName {
        background: url(/images/icon_base.png) no-repeat left center;
        text-indent: 20px;
        background-size: 20px;
        font-size: 15px;
        width: 95%;
        margin: 0 auto;
    }

    #caiwuModule .moduelName {
        background: url(/images/icon_caiwu.png) no-repeat left center;
        text-indent: 20px;
        width: 95%;
        margin: 0 auto;
        background-size: 20px;
        font-size: 15px;
        text-indent: 25px;
    }

    .caiwu_wrap .moduelName {
        background: url(/images/icon_xinping.png) no-repeat left center;
        text-indent: 20px;
        width: 95%;
        margin: 0 auto;
        background-size: 20px;
        font-size: 15px;
        text-indent: 25px;
    }

    .baseInfo td {
        font-size: 12px;
        padding: 0;
    }

    .baseInfo .tr0 td,
    .tr1 td,
    .baseInfo .tr2 td,
    .tr3 td {
        height: 20px;
    }

    .baseInfo .tr4 {
        height: auto;
        td[colspan='3']{
            text-indent: 24px;
        }
    }

    .baseInfo .tr4 td {
        height: 120px;
    }

    .baseInfo .tr5 {
        height: 190px;
    }

    .baseInfo .mainTable {
        border-collapse: collapse;
        width: 95%;
        text-align: center;
        font-size: 16px;
        margin: 0 auto;
        height: 300px;
    }

    .baseInfo tr:nth-child(odd) td:nth-child(odd) {
        background: #DFEEFC;
        width: 70px;
        color: #666;
    }

    .childTable tr:nth-child(odd) td:nth-child(odd) {
        background: #DFEEFC;
        width: 120px;
        color: #666;
    }

    .baseInfo tr td:nth-child(odd) {
        color: #666;
    }

    .baseInfo tr td:nth-child(even) {
        color: #898989;
        width: 200px;
    }

    .baseInfo tr:nth-child(odd) td:nth-child(even) {
        background: #F3F9FF;
        font-size: 12px;
        color: #898989;

    }

    // .baseInfo tr.tr3 {
    //     border: 1px solid #979797;
    // }

    .baseInfo tr.tr4 {
        color: #898989;
    }

    .baseInfo .tr4 td {
        text-align: center;
    }

    .baseInfo .tr4 td:last-child {
        padding: 10px;
        box-sizing: border-box;
        text-align: left;
    }

    .baseInfo tr.tr5 {
        border: 1px solid #979797;
        height: 3.3%;
        margin-top: 10px;
    }

    .baseInfo .mainTable tbody>tr:last-child>td {
        background: transparent;
    }

    .baseInfo .mainTable tbody>tr.ctr6>td:last-child {
        background: #F3F9FF;
    }

    .baseInfo .childTable {
        width:95%;
        height: 100%;
        border-collapse: collapse;
        border: 1px solid #979797;
        background: #DFEEFC;
        text-align: center;
        margin: 0 auto;
    }

    .baseInfo .childTable tr {
        border-top: 1px solid #979797;
        height: 20px;
        line-height: 20px;
    }

    .baseInfo .childTable .ctr0 {
        border-top: none;
    }

    .baseInfo .childTable td {
        width: 50%;
    }
    .dianping {
      padding-bottom: 50px;
      background: #fff;
      height: 300px;
      overflow: auto

    }

    .dianping_in {
      width: 100%;
      padding: 60px 10px;
      box-sizing: border-box;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #ccc;
      text-align: left;
      position: relative;
      text-indent: 32px;
    }
    .dianping_in {
      span {
        color: #666;
        font-size: 16px;
        left: 50%;
        top: 50%;
        width: 90%;
      }
    }
    .commentinput .el-textarea {
        height: 80px;
        margin-top: 15px;
    }
    .commentinput  .title_h{
      font-size: 14px;
      color: #303234;
      display: inline-block;
      margin-right: 30px;
    }
    .commentinput span.notice{
      color: #2F6DCF;
      background: #EAF1FF;
      font-size: 12px;
      display: inline-block;
      padding: 6px 8px;
      height: 14px;
      line-height: 14px;
      margin-right:20px;
      margin-left: 20px;
    }
    a {
        text-decoration: none;
        color: #409EFF;
    }

    .commentInfo {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .comment p {
        background: #409EFF;
        /* border-top-left-radius: 5px;
        border-top-right-radius: 5px; */
    }

    .comment textarea {
        box-sizing: border-box;
        max-width: 100%;
        min-height: 80px;
        padding: 5px 10px;
        border-color: #ccc;
        border-radius: 3px;
        outline: none;
    }

    .line1 {
        flex: 1 1 198px;
        padding: 20px;
    }

    .links {
        padding: 0 20px;
    }

    .operate {
        display: flex;
        justify-content: center;
    }

    .commentItem {
        position: relative;
        color: #303234;

    }
    .commentItem p{
      height: 26px;
      line-height: 26px;
    }
    .cover {
        position: absolute;
        font-size: 20px;
        top: 50%;
        transform: rotateZ(-45deg);
        font-size: 50px;
        margin-top: -33px;
        left: 50%;
        margin-left: -76px;
        color: #fff;
        text-shadow: 0 0 3px #409EFF;
    }

    .edit {
        text-align: center;
    }
}

</style>
