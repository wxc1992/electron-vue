<template>

  <div id="comment_fin" class="caiwu_wrap">
    <table class="caiwu">
          <tr>
              <th class="moduelName" colspan="4">评分指标</th>
          </tr>
          <tr>
              <td>地区GDP(亿元)</td>
              <td>{{tabledata.cals.s_region_gdp_fake|reserve2Decimal|emptyValue}}</td>
              <td>一般预算收入(亿元)</td>
              <td>{{tabledata.cals.s_general_budget_revenue|reserve2Decimal|emptyValue}}</td>
          </tr>
          <tr>
              <td>担保比率(%)</td>
              <td>{{tabledata.cals.s_guarantee|reserve2Decimal|emptyValue}}</td>
              <td>资产总额(亿元)</td>
              <td>{{tabledata.cals.s_total_assets|reserve2Decimal|emptyValue}}</td>
          </tr>
          <tr>
              <td>营业收入(亿元)</td>
              <td>{{tabledata.cals.s_operation_revenue|reserve2Decimal|emptyValue}}</td>
              <td>资产负债率 (%)</td>
              <td>{{tabledata.cals.s_debttoassets|reserve2Decimal|emptyValue}}</td>
          </tr>
          <tr>
              <td>已获利息倍数</td>
              <td>{{tabledata.cals.s_interest_coverage|reserve2Decimal|emptyValue}}</td>
              <td>带息债务率(%)</td>
              <td>{{tabledata.cals.s_interestdebt|reserve2Decimal|emptyValue}}</td>
          </tr>
          <tr>
              <td>城市及区位优势</td>
              <td colspan="3">{{tabledata.cals.s_zone_superiority|emptyValue}}</td>
          </tr>
          <tr>
              <td>政策支持</td>
              <td colspan="3">{{tabledata.cals.s_policy_support|emptyValue}}</td>
          </tr>
          <tr>
              <td>项目补助制度</td>
              <td colspan="3">{{tabledata.cals.s_project_subsidy_system|emptyValue}}</td>
          </tr>
          <tr>
              <td>所运营项目质量</td>
              <td colspan="3">{{tabledata.cals.s_projects_quality|emptyValue}}</td>
          </tr>
          <tr>
              <td>资产流动性</td>
              <td colspan="3">{{tabledata.cals.s_liquidity_of_assets|emptyValue}}</td>
          </tr>
      </table>

  </div>

</template>

<script>
import Echarts from 'vue-echarts';
import { mapGetters, mapActions, mapMutations } from 'vuex';
function convertLevel(level) {
  level = level || 'E';
  return Math.abs(level.charCodeAt(0) - 70);
}
const scoreMap = {
  AAA: 90,
  AA: 80,
  A: 70,
  BBB: 60,
  BB: 50,
  B: 40,
  CCC: 30,
  CC: 20,
};
export default {
  props: ['dialogVisible', 'tableDatadio', 'chartOption', 'rowdata', 'compnayName', 'showPdf'],
  components: {
    Vchart: Echarts,
  },
  data() {
    return {
      activeName: 'first',
      tabledata: {
        compName: '',
        gradeLevel: '',
        majorityShareholder: '',
        companyDataDto: {
          address: '',
          briefing: '',
          holder_controller: '',
          regcapital: '',
          listingornot: '',
        },
        cals: {
          s_name_of_major_shareholder_one: '',
        },
      },
      showChart: false,
      chartOptiondio: {
        title: {
          text: 'MARS评分图',
          textStyle: {
            color: '#666',
          },
        },
        // tooltip: {
        //     trigger: 'item',
        //     formatter: function (params, ticket, callback) {
        //         console.log('##params:', params);
        //         return '每个维度的评价是根据评级模型中多个指标的分数加总后再分级，用来衡量企业相应维度在行业中的排名；</br>部分定性指标不在这六个维度内，例如股东性质、融资渠道多样性等；</p></br>\
        //         <p>行业地位——主要包括地产企业排名、净资产、销售商品提供劳务收到的现金、是否上市等；</p>\
        //         <p>资产负债能力——主要指标包括有息资本负债率、对外担保比率等；</p>\
        //         <p>盈利能力——主要包括毛利率、净利率、ROA、ROE、销售商品提供劳务收到的现金增长等；</p>\
        //         <p>短期偿债能力——主要包括流比、速比、现金比、投资性地产占比、长短期有息债务比、EBITDA利息保障倍数等；</p>\
        //         <p>营运能力——主要包括销售回款率、总资产周转速度等；</p>\
        //         <p>土储布局优势——包括土储在各地区的分布、各地房价收入比、一般预算收入增长、城市等级等。</p>'
        //     },
        //     position:['-8%','50%'],
        //     textStyle:{
        //         lineHeight:10
        //     }
        // },
        radar: [{
          indicator: [
            {
              text: '地区GDP',
              max: 90,
            },
            {
              text: '城市及区位优势',
              max: 90,
            },
            {
              text: '政府债务率',
              max: 90,
            },
            {
              text: '政策支持',
              max: 90,
            },
            {
              text: '项目补助制度',
              max: 90,
            },
            {
              text: '资产流动性',
              max: 90,
            },
            {
              text: '资产负债率',
              max: 90,
            },
            {
              text: '资产总额',
              max: 90,
            },
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
          name: 'MARS评分图',
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
      // this.tabledata = this.getNewoutputContent.baseInfo
      const show = this.getNewoutputContent.outputVisible;
      if (show) {
        this.tabledata = this.getNewoutputContent.baseInfo;
        console.log('this.rowdata,', this.getNewoutputContent.rowdata);
        // this.chartOptiondio = {...this.chartOption}
        let arr = [];
        const {
          s_region_gdp,
          s_zone_superiority_level,
          s_policy_support_level,
          s_project_subsidy_system_level,
          s_debttoassets,
          s_liquidity_of_assets_level,
          s_government_debt_ratio,
          s_total_assets,
        } = this.getNewoutputContent.rowdata;
        arr = [
          s_region_gdp,
          s_zone_superiority_level,
          s_policy_support_level,
          s_project_subsidy_system_level,
          s_debttoassets,
          s_liquidity_of_assets_level,
          s_government_debt_ratio,
          s_total_assets,
        ];
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
          cals: {},
        };
      }
    },
  },
  watch: {
    outputVisible(val) {
      // console.log('dialogVisible+++++++',this.tabledata.formData)
      console.log('.=this.chartOption', this.chartOption);
      if (val) {
        console.log('this.rowdata,', this.getNewoutputContent.rowdata);
        // this.chartOptiondio = {...this.chartOption}
        let arr = [];
        const {
          s_region_gdp,
          s_zone_superiority_level,
          s_policy_support_level,
          s_project_subsidy_system_level,
          s_debttoassets,
          s_liquidity_of_assets_level,
          s_government_debt_ratio,
          s_total_assets,
        } = this.getNewoutputContent.rowdata;
        arr = [
          s_region_gdp,
          s_zone_superiority_level,
          s_policy_support_level,
          s_project_subsidy_system_level,
          s_debttoassets,
          s_liquidity_of_assets_level,
          s_government_debt_ratio,
          s_total_assets,
        ];
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
          cals: {},
        };
      }
    },
  },
  created() {

  },
  methods: {
    //  downloadOutput() {
    //   //  debugger
    //         if(this.rowdata.moduleId == ''){
    //           this.$message({
    //                 showClose: true,
    //                 message: '目前仅支持有色模块的pdf下载',
    //                 type: 'warning'
    //             })
    //           return
    //         }
    //         let othertparams = {}
    //         if(this.showName == 0){
    //           othertparams= {
    //             level: this.rowdata.companyLevel,
    //             levelName: '德邦评级'
    //           }
    //         } else {
    //           othertparams= {
    //             level:  this.tableDatadio.baseInfo.gradeLevel,
    //             levelName: 'MARS评级'
    //           }
    //         }
    //         let chartImgs = this.getNewChartImg;
    //         // chartImgs.sort((a, b) => {
    //         //     return a.tabIndex - b.tabIndex;
    //         // });
    //         console.log('after sorted:', chartImgs);
    //         let baseFile = [];
    //         let fileName =[];
    //         let listTemplate = '';
    //         let reportName = chartImgs.name;
    //         var downloadUrl ='/dsmssec/pdf/export' || '';
    //         if(Object.keys(chartImgs).length == 0){
    //           let val = this.rowdata.moduleId
    //           let Industryname = ''
    //             switch(val){
    //               case 5034:
    //               Industryname = '城投行业';
    //               case 5035:
    //               Industryname = '钢铁行业';
    //                 break;
    //               case  5036:
    //               Industryname = '有色行业';
    //                 break;
    //               case  5053:
    //               Industryname = '地产行业';
    //                 break;
    //               case  6001:
    //               Industryname = '化工行业';
    //                 break;
    //               case  6002:
    //               Industryname = '煤炭行业';
    //                 break;
    //               case  6003:
    //               Industryname = '电力行业';
    //                 break;
    //               case  6004:
    //               Industryname = '轻工行业';
    //                 break;
    //                 case  6005:
    //               Industryname = '建工行业';
    //                 break;
    //                 case  6006:
    //               Industryname = '多元金融行业';
    //                 break;
    //             break;
    //             }
    //           let pdfParam = {
    //                 method: 'get',
    //                 url: downloadUrl,
    //                 responseType: 'arraybuffer',
    //                 params: {
    //                      moduleId : this.rowdata.moduleId,
    //                     // reportDate:5054,
    //                     compName: this.tabledata.compName,
    //                     ...othertparams,
    //                     tradeType: 1,
    //                     imgUrls: '',
    //                     fileName: Industryname + '.pdf',
    //                     proportionRating: listTemplate
    //                 }
    //             }
    //             this.downloadPdf(pdfParam).then(response => {
    //                 if (response.byteLength === 0) {
    //                     this.$message({
    //                         message: "获取文件失败",
    //                         type: 'warning'
    //                     });
    //                     return;
    //                 }
    //                 let blob = new Blob([response], {
    //                     type: 'application/pdf'
    //                 });
    //                 let link = document.createElement('a')
    //                 link.href = window.URL.createObjectURL(blob)
    //                 link.download = Industryname + '.pdf'
    //                 link.click()
    //             })
    //         } else {
    //             let reqParams = {
    //                 path: "//sms//subject//comment",
    //                 baseFile:[chartImgs.dataUrl.split(',')[1]],
    //                 fileName: [chartImgs.name]
    //             }
    //             // const filter = this.getCreditFilter;
    //             let moduleId = this.rowdata.moduleId;
    //             // let reportDate = filter.dateValue;

    //             this.uploadBase64(reqParams).then(result => {
    //                   console.log('get result of upload images:', result);
    //                   let pdfParam = {
    //                       method: 'get',
    //                       url: downloadUrl,
    //                       responseType: 'arraybuffer',
    //                       params: {
    //                           moduleId,
    //                           // reportDate:5054,
    //                           compName: this.tabledata.compName,
    //                           ...othertparams,
    //                           tradeType: 1,
    //                           imgUrls: result.join(','),
    //                           fileName: reportName + '.pdf',
    //                           proportionRating: listTemplate
    //                       }
    //                   }
    //                   this.downloadPdf(pdfParam).then(response => {
    //                       if (response.byteLength === 0) {
    //                           this.$message({
    //                               message: "获取文件失败",
    //                               type: 'warning'
    //                           });
    //                           return;
    //                       }
    //                       let blob = new Blob([response], {
    //                           type: 'application/pdf'
    //                       });
    //                       let link = document.createElement('a')
    //                       link.href = window.URL.createObjectURL(blob)
    //                       link.download = chartImgs.name + '.pdf'
    //                       link.click()
    //                   })
    //               // let href = [downloadUrl, '?moduleId=', moduleId, '&reportDate=', reportDate, "&ids=", this.rowdata.id, '&tradeType=1&imgUrls=', result, "&fileName='", reportName, ".pdf'&proportionRating=", listTemplate].join('');
    //               // document.location.href = href;
    //           })
    //         }
    //         // let reqParams = {
    //         //     path: "//sms//subject//comment",
    //         //     baseFile:[chartImgs.dataUrl.split(',')[1]],
    //         //     fileName: [chartImgs.name]
    //         // }
    //         // // const filter = this.getCreditFilter;
    //         // let moduleId = this.rowdata.moduleId;
    //         // // let reportDate = filter.dateValue;
    //         // this.uploadBase64(reqParams).then(result => {
    //         //     console.log('get result of upload images:', result);
    //         //     let pdfParam = {
    //         //         method: 'get',
    //         //         url: downloadUrl,
    //         //         responseType: 'arraybuffer',
    //         //         params: {
    //         //             moduleId,
    //         //             // reportDate:5054,
    //         //             ids: this.rowdata.id,
    //         //             tradeType: 1,
    //         //             imgUrls: result.join(','),
    //         //             fileName: reportName + '.pdf',
    //         //             proportionRating: listTemplate
    //         //         }
    //         //     }
    //         //     this.downloadPdf(pdfParam).then(response => {
    //         //         if (response.byteLength === 0) {
    //         //             this.$message({
    //         //                 message: "获取文件失败",
    //         //                 type: 'warning'
    //         //             });
    //         //             return;
    //         //         }
    //         //         let blob = new Blob([response], {
    //         //             type: 'application/pdf'
    //         //         });
    //         //         let link = document.createElement('a')
    //         //         link.href = window.URL.createObjectURL(blob)
    //         //         link.download = chartImgs.name + '.pdf'
    //         //         link.click()
    //         //     })
    //         //     // let href = [downloadUrl, '?moduleId=', moduleId, '&reportDate=', reportDate, "&ids=", this.rowdata.id, '&tradeType=1&imgUrls=', result, "&fileName='", reportName, ".pdf'&proportionRating=", listTemplate].join('');
    //         //     // document.location.href = href;
    //         // })
    //     },
    setDataUrl() {
      // debugger
      const dataUrl = this.$refs.vchart2.getDataURL();
      console.log('baseinfo city dataurl:', dataUrl);
      let name = null;
      const val = this.rowdata.moduleId;
      switch (val) {
        case 5034:
          name = '城投行业';
          break;
        case 5035:
          name = '钢铁行业';
          break;
        case 5036:
          name = '有色行业';
          break;
        case 5053:
          name = '地产行业';
          break;
        case 6001:
          name = '化工行业';
          break;
        case 6002:
          name = '煤炭行业';
          break;
        case 6003:
          name = '电力行业';
          break;
          break;
        case 6004:
          name = '轻工行业';
          break;
        case 6005:
          name = '建工行业';
          break;
        case 6006:
          name = '多元金融行业';
          break;
          break;
      }
      console.log('name', name);
      console.log('val', val);
      this.fillInNewImgs({
        dataUrl,
        name,
      });
    },
    // finished(){
    //     console.log('animation finished: get image url')
    //     this.setDataUrl();
    // },
    handleClick() {

    },
    innitChart() {
      //  console.log('scope++++++',scope)
      //  if(this.rowdata.moduleId == 5035 || this.rowdata.moduleId==5035||this.rowdata.moduleId==5036 || this.rowdata.moduleId==6001 || this.rowdata.moduleId==6002 || this.rowdata.moduleId==6003 || this.rowdata.moduleId==6004){
      //    let {
      //           s_scale_level,
      //           s_industry_status,
      //           s_profitability,
      //           s_short_term_solvency,
      //           s_management_ability,
      //           s_industry_layout
      //     } =  this.rowdata
      //     this.levelDatadio = [convertLevel(s_scale_level), convertLevel(s_industry_status), convertLevel(s_profitability), convertLevel(s_short_term_solvency), convertLevel(s_management_ability), convertLevel(s_industry_layout)]

      //  } else if(this.rowdata.moduleId == 5053){
      //    let {
      //       s_industry_status,
      //       s_asset_liability_capability,
      //       s_profitability,
      //       s_short_term_solvency,
      //       s_management_ability,
      //       s_soil_storage_layout
      //    } = this.rowdata;
      //   this.levelDatadio = [convertLevel(s_industry_status), convertLevel(s_asset_liability_capability), convertLevel(s_profitability), convertLevel(s_short_term_solvency), convertLevel(s_management_ability), convertLevel(s_soil_storage_layout)]
      //  }
      const {
        s_region_gdp,
        s_zone_superiority_level,
        s_policy_support_level,
        s_project_subsidy_system_level,
        s_debttoassets,
        s_liquidity_of_assets_level,
        s_government_debt_ratio,
        s_total_assets,
      } = this.getNewoutputContent.rowdata;
      this.levelDatadio = [
        scoreMap[s_region_gdp],
        scoreMap[s_zone_superiority_level],
        scoreMap[s_government_debt_ratio],
        scoreMap[s_policy_support_level],
        scoreMap[s_project_subsidy_system_level],
        scoreMap[s_liquidity_of_assets_level],
        scoreMap[s_debttoassets],
        scoreMap[s_total_assets],
      ];
      const arr = [];
      this.levelDatadio.forEach((item) => {
        item = item == 'undefined' || item == undefined ? 20 : item;
        arr.push(item);
      });
      console.log(arr);
      console.log('thisLevel', this.levelDatadio);
      this.chartOptiondio.series[0].data[0].value = arr;
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
#comment_fin{
      /*基础信息*/
    .baseInfo {
        width: 85%;
        margin: 0 auto;
    }

    .baseInfo .moduelName {
        background: url(/images/icon_base.png) no-repeat left center;
        text-indent: 20px;
        background-size: 20px;
        font-size: 15px;
        width: 85%;
        margin: 0 auto;
    }

    .moduelName {
        background: url(/images/icon_caiwu.png) no-repeat left center;
        text-indent: 20px;
        width: 85%;
        margin: 0 auto;
        background-size: 20px;
        font-size: 15px;
        text-indent: 25px;
    }

    .caiwu_wrap .moduelName {
        background: url(/images/icon_xinping.png) no-repeat left center;
        text-indent: 20px;
        width: 85%;
        margin: 0 auto;
        background-size: 20px;
        font-size: 15px;
        text-indent: 25px;
    }


    .history {
        padding:10px;
        .attachInfo {
            display: flex;

            li {
                a {
                    display: inline-block;
                    max-width: 300px;
                    text-decoration: none;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }

            span {
                margin-left: 20px;
            }
        }
    }
    .history {
        textarea {
            width: 100%;
            height: 80px;
            border: 1px solid #ddd;
            background: #fff;
            box-sizing: border-box;
        }
    }
    .histTitle{
        font-size: 16px;
        color: #303234;
    }

    /*财务*/
    .caiwu {
        width: 100%;
        margin: 0 auto;
        margin-top: -9px;
    }

    .caiwu tr {
        width: 100%;
    }

    .caiwu tr th {
        width: 180px;
        text-align: center;
        line-height: 35px;
        height: 35px;
        font-size: 15px;
        color: #666;
        // background: #9BC2EB;
    }

    .caiwu tr td {
        width: 23%;
        /* float: left; */
        height: 100%;
        text-align: center;
        line-height: 20px;
        height: 20px;
        padding:5px 0;
        font-size: 12px;
        color: #898989;
        &[colspan='3']{
            text-align:left;
            text-indent: 24px;
        }
    }

    .caiwu tr:nth-child(2n+1) {
        background: #F3F9FF;
    }

    .caiwu tr:nth-child(2n+1) td:nth-child(odd) {
        background: #DFEEFC;
    }

    .caiwu dtrl:nth-child(2n) {
        background: #fff;
    }
}
</style>

