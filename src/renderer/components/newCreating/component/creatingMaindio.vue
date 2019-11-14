<template>
<el-dialog
  :visible.sync="dialogVisible"
  :show-close="false"
  :close-on-click-modal="false"
  class="baseInfo"
  width="60%">
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
           <table class="mainTable" align="center" >
              <tr class="tr0">
                  <td>公司全称</td>
                  <td>{{tabledata.compName|emptyValue}}</td>
                  <td v-if="showName==-1">MARS评级</td>
                  <td v-if="showName==-1">{{tabledata.gradeLevel|emptyValue}}</td>
                  <td v-if="showName==0">德邦评级</td>
                  <td v-if="showName==0">{{rowData.companyLevel|emptyValue}}</td>
              </tr>
               <tr class="tr1">
                  <td>外部评级机构</td>
                  <td>{{tabledata.companyDataDto.rate_agencyissuer|emptyValue}}</td>
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
            <Vchart ref="vchart2" :options="chartOptiondio" @finished="finished"  v-if="showChart"></Vchart>
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
      </el-tab-pane>
      <el-tab-pane label="点评" name="second" v-if="formdata.id!==''">
         <!-- <el-tab-pane label="点评" name="second"> -->
         <div class="dianping commentinput">
            <el-form ref="form" :model="formdata">
                   <!-- <el-form-item label=""  v-show="formdata.channelAnalysis && (formdata.channelAnalysis!=='正常'|| formdata.channelAnalysisNote!=='')">
                        <h1 class="title_h">企业融资渠道分析</h1>
                          <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="formdata.channelAnalysis"></el-input>
                          <el-input readonly="readonly" type="textarea" :rows="4" v-model="formdata.channelAnalysisNote" style="height:80px"></el-input>
                  </el-form-item>
                      <el-form-item label="" v-show="formdata.marketCompetitivenessAnalysis &&  (formdata.marketCompetitivenessAnalysis!=='正常'|| formdata.marketCompetitivenessAnalysisNote!=='')">
                        <h1 class="title_h">企业产品/市场竞争力分析</h1>
                          <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="formdata.marketCompetitivenessAnalysis"></el-input>
                        <el-input readonly="readonly" type="textarea" :rows="4" v-model="formdata.marketCompetitivenessAnalysisNote" style="height:80px"></el-input>
                  </el-form-item>
                      <el-form-item label="" v-show="formdata.levelAnalysis && (formdata.levelAnalysis!=='正常'|| formdata.levelAnalysisNote!=='')">
                        <h1 class="title_h">企业产品管理水平分析</h1>
                          <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="formdata.levelAnalysis"></el-input>
                        <textarea v-model="formdata.levelAnalysisNote" readonly="readonly" style="width:100%">
                        </textarea>
                  </el-form-item>
                      <el-form-item label="" v-show="formdata.rationalityAnalysis && (formdata.rationalityAnalysis!=='正常'|| formdata.rationalityAnalysisNote!=='')">
                        <h1 class="title_h">企业战略投资合理性分析</h1>
                        <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="formdata.rationalityAnalysis"></el-input>
                        <el-input readonly="readonly" type="textarea" :rows="4" v-model="formdata.rationalityAnalysisNote" style="height:80px"></el-input>
                  </el-form-item>
                      <el-form-item label="" v-show="formdata.otherImportantMatters && (formdata.otherImportantMatters!=='正常'|| formdata.otherImportantMattersNote!=='')">
                        <h1 class="title_h">其他重要事项</h1>
                          <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="formdata.otherImportantMatters"></el-input>
                        <el-input readonly="readonly" type="textarea" :rows="4" v-model="formdata.otherImportantMattersNote" style="height:80px"></el-input>
                  </el-form-item> -->
                    <el-form-item label="" v-show="formdata">
                        <h1 class="title_h">总结</h1>
                        <!-- <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="formdata.summary"></el-input> -->
                         <el-input readonly="readonly" type="textarea" :rows="4" v-model="formdata.summaryNote" style="height:160px"></el-input>
                    </el-form-item>
              </el-form>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div slot="footer" class="dialog-footer" style="text-align: center">
    <el-button @click="sendHide " size="small">取 消</el-button>
    <el-button type="primary" @click="downloadOutput" size="small" v-if="showPdf">导出pdf</el-button>
  </div>
</el-dialog>

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
  props: ['dialogVisible', 'tableDatadio', 'chartOption', 'rowData', 'compnayName', 'showPdf'],
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
      formdata: {
        actualControllerCentral: '',
        actualControllerCentralNote: '',
        actualControllerCountry: '',
        actualControllerCountryNote: '',
        actualControllerPrivate: '',
        actualControllerPrivateNote: '',
        attachmentFile: '',
        auditorId: '',
        auditorName: '',
        capitalImmobilizationRatio: '',
        capitalImmobilizationRatioNote: '',
        channelAnalysis: '',
        channelAnalysisNote: '',
        compName: '',
        createDate: '',
        debtGuaranteeRate: '',
        debtGuaranteeRateNote: '',
        externalGuaranteeRate: '',
        externalGuaranteeRateNote: '',
        fileName: '',
        gradeLevel: '',
        id: '',
        isDelete: '',
        level: '',
        levelAnalysis: '',
        levelAnalysisNote: '',
        marketCompetitivenessAnalysis: '',
        marketCompetitivenessAnalysisNote: '',
        moduleId: '',
        otherCopeWith: '',
        otherCopeWithNote: '',
        otherFinancialIndicators: '',
        otherFinancialIndicatorsNote: '',
        otherImportantMatters: '',
        otherImportantMattersNote: '',
        otherReceivable: '',
        otherReceivableNote: '',
        profitMargin: '',
        profitMarginNote: '',
        rationalityAnalysis: '',
        rationalityAnalysisNote: '',
        remark: '',
        reportDate: '',
        rosterId: '',
        rosterName: '',
        status: '',
        subjectId: '',
        subjectName: '',
        summary: '',
        summaryNote: '',
        updateDate: '',
        userId: '',
        userName: '',
      },
      chartOptiondio: {

      },
      levelDatadio: [],
    };
  },
  computed: {
    ...mapGetters(['getNewChartImg']),
    showName() {
      //  debugger
      let value = null;
      if (this.compnayName == '0') {
        value = 0;
      } else {
        value = -1;
      }
      return value;
    },
  },
  watch: {
    dialogVisible(val) {
      // debugger
      console.log('dialogVisible+++++++', this.tabledata.formData);
      if (val) {
        this.tabledata = this.tableDatadio.baseInfo;
        for (const item in this.tableDatadio.formData) {
          if (item.summary == '') {
            item.summary = '正常';
          }
        }
        this.formdata = this.tableDatadio.formData;
        console.log('formdata+++++++', this.formdata);
        console.log('this.rowData,', this.rowData);
        this.chartOptiondio = { ...this.chartOption };
        let arr = [];
        if (this.rowData.moduleId == 5035 || this.rowData.moduleId == 5035 || this.rowData.moduleId == 5036 || this.rowData.moduleId == 6001 || this.rowData.moduleId == 6002 || this.rowData.moduleId == 6003 || this.rowData.moduleId == 6004) {
          const {
            s_scale_level,
            s_industry_status,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_industry_layout,
          } = this.rowData;
          arr = [s_scale_level,
            s_industry_status,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_industry_layout,
          ];
        } else if (this.rowData.moduleId == 5053) {
          const {
            s_industry_status,
            s_asset_liability_capability,
            s_profitability,
            s_short_term_solvency,
            s_management_ability,
            s_soil_storage_layout,
          } = this.rowData;
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
    ...mapActions(['uploadBase64', 'downloadPdf']),
    ...mapMutations(['fillInNewImgs', 'clearNewChartImgs']),
    downloadOutput() {
      //  debugger
      if (this.rowData.moduleId == '') {
        this.$message({
          showClose: true,
          message: '目前仅支持有色模块的pdf下载',
          type: 'warning',
        });
        return;
      }
      let othertparams = {};
      if (this.showName == 0) {
        othertparams = {
          level: this.rowData.companyLevel,
          levelName: '德邦评级',
        };
      } else {
        othertparams = {
          level: this.tableDatadio.baseInfo.gradeLevel,
          levelName: 'MARS评级',
        };
      }
      const chartImgs = this.getNewChartImg;
      // chartImgs.sort((a, b) => {
      //     return a.tabIndex - b.tabIndex;
      // });
      console.log('after sorted:', chartImgs);
      const baseFile = [];
      const fileName = [];
      const listTemplate = '';
      const reportName = chartImgs.name;
      const downloadUrl = '/dsmssec/pdf/export' || '';
      if (Object.keys(chartImgs).length == 0) {
        const val = this.rowData.moduleId;
        let Industryname = '';
        if (val == 5035) {
          Industryname = '钢铁行业';
        }
        if (val == 5036) {
          Industryname = '有色行业';
        }
        if (val == 5053) {
          Industryname = '地产行业';
        }
        if (val == 6001) {
          Industryname = '化工行业';
        }
        if (val == 6002) {
          Industryname = '煤炭行业';
        }
        if (val == 6003) {
          Industryname = '电力行业';
        }
        if (val == 6004) {
          Industryname = '轻工行业';
        }
        if (val == 6005) {
          Industryname = '建工行业';
        }
        if (val == 6006) {
          Industryname = '多元金融行业';
        }
        const pdfParam = {
          method: 'get',
          url: downloadUrl,
          responseType: 'arraybuffer',
          params: {
            moduleId: this.rowData.moduleId,
            // reportDate:5054,
            compName: this.tabledata.compName,
            ...othertparams,
            tradeType: 1,
            imgUrls: '',
            fileName: `${Industryname}.pdf`,
            proportionRating: listTemplate,
          },
        };
        this.downloadPdf(pdfParam).then((response) => {
          if (response.byteLength === 0) {
            this.$message({
              message: '获取文件失败',
              type: 'warning',
            });
            return;
          }
          const blob = new Blob([response], {
            type: 'application/pdf',
          });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${Industryname}.pdf`;
          link.click();
        });
      } else {
        const reqParams = {
          path: '//sms//subject//comment',
          baseFile: [chartImgs.dataUrl.split(',')[1]],
          fileName: [chartImgs.name],
        };
        // const filter = this.getCreditFilter;
        const moduleId = this.rowData.moduleId;
        // let reportDate = filter.dateValue;

        this.uploadBase64(reqParams).then((result) => {
          console.log('get result of upload images:', result);
          const pdfParam = {
            method: 'get',
            url: downloadUrl,
            responseType: 'arraybuffer',
            params: {
              moduleId,
              // reportDate:5054,
              compName: this.tabledata.compName,
              ...othertparams,
              tradeType: 1,
              imgUrls: result.join(','),
              fileName: `${reportName}.pdf`,
              proportionRating: listTemplate,
            },
          };
          this.downloadPdf(pdfParam).then((response) => {
            if (response.byteLength === 0) {
              this.$message({
                message: '获取文件失败',
                type: 'warning',
              });
              return;
            }
            const blob = new Blob([response], {
              type: 'application/pdf',
            });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${chartImgs.name}.pdf`;
            link.click();
          });
          // let href = [downloadUrl, '?moduleId=', moduleId, '&reportDate=', reportDate, "&ids=", this.rowData.id, '&tradeType=1&imgUrls=', result, "&fileName='", reportName, ".pdf'&proportionRating=", listTemplate].join('');
          // document.location.href = href;
        });
      }
    },
    setDataUrl() {
      // debugger
      const dataUrl = this.$refs.vchart2.getDataURL();
      console.log('baseinfo city dataurl:', dataUrl);
      let name = null;
      const val = this.rowData.moduleId;
      switch (val) {
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
    finished() {
      console.log('animation finished: get image url');
      this.setDataUrl();
    },
    handleClick() {

    },
    innitChart() {
      //  console.log('scope++++++',scope)
      if (this.rowData.moduleId == 5035 || this.rowData.moduleId == 5035 || this.rowData.moduleId == 5036 || this.rowData.moduleId == 6001 || this.rowData.moduleId == 6002 || this.rowData.moduleId == 6003 || this.rowData.moduleId == 6004) {
        const {
          s_scale_level,
          s_industry_status,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_industry_layout,
        } = this.rowData;
        this.levelDatadio = [convertLevel(s_scale_level), convertLevel(s_industry_status), convertLevel(s_profitability), convertLevel(s_short_term_solvency), convertLevel(s_management_ability), convertLevel(s_industry_layout)];
      } else if (this.rowData.moduleId == 5053) {
        const {
          s_industry_status,
          s_asset_liability_capability,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_soil_storage_layout,
        } = this.rowData;
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
</style>

