<template>
 <el-dialog :visible="addComment" width="1024px"  @close="close" :close-on-click-modal="false">
<div v-loading="loading" id="applycomment">
    <div class="commentinput">
        <!-- <el-input type="textarea" :rows="2" v-model="textarea" placeholder="请输入点评内容">
        </el-input> -->
        <div class="clearfix" style="margin-bottom: 10px;">
          <el-select v-model="dianpinform" multiple placeholder="请选择点评的指标" style="width:240px" class="fl" @change="changeZhibiao">
            <el-option
              v-for="item in zhibiaolost"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        <el-button class="fl" type="primary" size="middle" @click="showZhiliao" style="padding: 8px 20px">新增</el-button>
        </div>
        <el-form ref="form" :model="form">
               <el-form-item label="" v-if="showWhat1">
                <h1 class="title_h">企业融资渠道分析</h1>
                 <!-- <span class="notice" >{{msg.higher}}</span> -->
                 <el-select  v-model="form.channelAnalysis" placeholder="请选择" @change="selectChange($event,'channelAnalysis')">
                    <el-option v-for="opt in getsubList('channel_analysis')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" maxlength=200 v-model="form2.channelAnalysisNote" placeholder="请输入企业的银行合作与授信、上市公司资源、集团以及关联公司资源、优质可转让资产等提升融资能力的优势分析(最多输入200字)">

                 </el-input>
              </el-form-item>
              <el-form-item label="" v-if="showWhat2">
                <h1 class="title_h">企业产品/市场竞争力分析</h1>
                 <!-- <span class="notice" >{{msg.higher}}</span> -->
                 <el-select  v-model="form.marketCompetitivenessAnalysis" placeholder="请选择" @change="selectChange($event,'marketCompetitivenessAnalysis')">
                    <el-option v-for="opt in getsubList('market_competitiveness_analysis')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" maxlength=200 v-model="form2.marketCompetitivenessAnalysisNote" placeholder="请输入企业产品再同类产品中的品质/品牌优势、生产设备的优势、研发能力及渠道销售能力的优劣势分析(最多输入200字)">

                 </el-input>
              </el-form-item>
              <el-form-item label="" v-if="showWhat3">
                <h1 class="title_h">企业产品管理水平分析</h1>
                 <!-- <span class="notice" >{{msg.higher}}</span> -->
                 <el-select  v-model="form.levelAnalysis" placeholder="请选择" @change="selectChange($event,'levelAnalysis')">
                    <el-option v-for="opt in getsubList('level_analysis')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" maxlength=200 :rows="2" v-model="form2.levelAnalysisNote" placeholder="请输入企业现代管理制度建立的情况、有无生产事故、近三年管理层变动请款分析,公开数据(包括财务数据)的透明度(最多输入200字)">

                 </el-input>
              </el-form-item>
              <el-form-item label="" v-if="showWhat4">
                <h1 class="title_h">企业战略投资合理性分析</h1>
                 <!-- <span class="notice" >{{msg.higher}}</span> -->
                 <el-select  v-model="form.rationalityAnalysis" placeholder="请选择" @change="selectChange($event,'rationalityAnalysis')">
                    <el-option v-for="opt in getsubList('rationality_analysis')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" maxlength=200 :rows="2" v-model="form2.rationalityAnalysisNote" placeholder="请输入企业的近期及远期战略、投资的合理性与不合理性分析(最多输入200字)">

                 </el-input>
              </el-form-item>
              <el-form-item label="" v-if="showWhat5">
                <h1 class="title_h">其他重要事项</h1>
                 <!-- <span class="notice" >{{msg.higher}}</span> -->
                 <el-select  v-model="form.otherImportantMatters" placeholder="请选择" @change="selectChange($event,'otherImportantMatters')">
                    <el-option v-for="opt in getsubList('other_important_matters')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" maxlength=200 :rows="2" v-model="form2.otherImportantMattersNote" placeholder="请输入企业存在的其他可能导致经营风险的问题,包括但不限于下游客户集中度高,大股东股票质押比列过高,可能影响企业经营的重大负面新闻、法律纠纷等(最多输入200字)">

                 </el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">总结</h1>
                 <!-- <span class="notice" >{{msg.higher}}</span> -->
                 <el-select  v-model="form.summary" placeholder="请选择" @change="selectChange($event,'summary')">
                    <el-option v-for="opt in getsubList('summary')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" style="width:100%;height:160px" maxlength=8000 :rows="2" v-model="form2.summaryNote" placeholder="请输入企业存在的其他可能导致经营风险的问题,包括但不限于下游客户集中度高,大股东股票质押比列过高,可能影响企业经营的重大负面新闻、法律纠纷等(最多输入8000字)">

                 </el-input>
              </el-form-item>
        </el-form>
    </div>
    <div class="formWrap">
        <div class="uploadWraper">
            <el-upload ref="uploadBinary" :file-list="filelist" :on-change="onChange" :before-upload = "beforeUpload" :before-remove="onChange" accept='".doc",".xls",".ppt",".docx",".xlsx",".pptx",".pdf",".html",".txt",".java"' :on-error="handleError" class="avatar-uploader" width="50px" height="50px" action="/file/upload" :headers="headers" :show-file-list="true" :on-success="handleSuccess" :auto-upload="false" :multiple="true">
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="setlevel">
            <!-- <div>
              <el-button class="commitBtn" type="primary" @click="testChange" :disabled="istest" style="margin-bottom: 25px;">{{testmsg}}</el-button>
            </div> -->
            <!-- <div>模型评级结果：
                <el-input v-model="moduleLevel" :disabled="true"  style="margin-bottom: 20px;">
                </el-input>
            </div>
            <div>上次评级调整结果：
                <el-input v-model="moduleLevel" :disabled="true">
                </el-input>
            </div> -->
            <div style="margin-top:20px;">准入白名单：
              <el-select  v-model="rosterId" placeholder="请选择" style="width: 200px;">
                <el-option v-for="opt in rosterlist" :key="opt.id" :label="opt.key" :value="opt.id">
                </el-option>
              </el-select>
            </div>
            <div class="choose">信评人员调整评级结果：
                <el-select v-model="inputLevel" placeholder="请选择">
                    <el-option v-for="opt in searchOptions.level" :key="opt.value" :label="opt.label" :value="opt.value">
                    </el-option>
                </el-select>
                <!-- <el-input v-model="inputLevel"  style="margin-bottom: 20px;">
                </el-input> -->
            </div>
        </div>
    </div>
    <el-button class="commitBtn" type="primary" plain @click="submit">提交</el-button>
</div>
</el-dialog>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';
import searchList from '../search-list.js';
const levelList = [{
  option: 'AAA',
  code: '1',
},
  // {
  // 	option:'AA+',
  // 	code:'2'
  // },
{
  option: 'AA',
  code: '3',
},
  // {
  // 	option:'AA-',
  // 	code:'4'
  // },
{
  option: 'A+',
  code: '5',
}, {
  option: 'A',
  code: '6',
}, {
  option: 'A-',
  code: '7',
}, {
  option: 'BBB+',
  code: '8',
},
{
  option: 'BBB',
  code: '9',
},
{
  option: 'BBB-',
  code: '10',
}, {
  option: 'BB+',
  code: '11',
}, {
  option: 'BB',
  code: '12',
}, {
  option: 'BB-',
  code: '13',
}, {
  option: 'B+',
  code: '14',
}, {
  option: 'B',
  code: '15',
}, {
  option: 'B-',
  code: '16',
}, {
  option: 'CCC',
  code: '17',
}, {
  option: 'CC',
  code: '18',
}, {
  option: 'C',
  code: '19',
},
];
export default {
  data() {
    return {
      rosterId: null,
      searchOptions: {
        level: searchList.level,
      },
      zhibiaolost: [
        {
          value: 1,
          label: '企业融资渠道分析',
        },
        {
          value: 2,
          label: '企业产品/市场竞争力分析',
        },
        {
          value: 3,
          label: '企业产品管理水平分析',
        },
        {
          value: 4,
          label: '企业战略投资合理性分析',
        },
        {
          value: 5,
          label: '其他重要事项',
        },
      ],
      showWhat1: false,
      showWhat2: false,
      showWhat3: false,
      showWhat4: false,
      showWhat5: false,
      form: {
        // debtGuaranteeRate: '资产负债率正常',//资产负债率
        // externalGuaranteeRate: '对外担保比率正常',//对外担保率
        // profitMargin: '利润率正常',//利润率
        // otherCopeWith: '其他应付正常',//其他应付
        // otherReceivable: '其他应收正常',//其他应收
        // capitalImmobilizationRatio: '资本固定化比率正常', //资本固定化比率
        // otherFinancialIndicators: '其他财务指标正常', //其他财务指标
        // actualControllerPrivate: '正常',//实际控制人分析(民企)
        // actualControllerCountry: '正常', //实际控制人分析(国企)
        // actualControllerCentral: '正常',//实际控制人分析(央企)
        channelAnalysis: '正常', // 企业融资渠道分析
        marketCompetitivenessAnalysis: '正常', // .企业产品/市场竞争力分析
        levelAnalysis: '正常', // ..企业管理水平分析
        rationalityAnalysis: '正常', // 企业战略投资合理性分析
        otherImportantMatters: '正常', // 其他重要事项
        summary: '正常',
      },
      form2: {
        // debtGuaranteeRateNote: '', //资产负债率比例备注
        // externalGuaranteeRateNote: '', //对外担保比例备注
        // profitMarginNote: '',//利润率备注
        // otherCopeWithNote: '',//其他应付备注
        // otherReceivableNote: '',// 其他应收备注
        // capitalImmobilizationRatioNote: '', //资本固定化比率备注
        // otherFinancialIndicatorsNote: '', //其他财务指标备注
        // actualControllerPrivateNote: '',//实际控制人分析(民企)备注
        // actualControllerCountryNote: '',// 实际控制人分析(国企)备注
        // actualControllerCentralNote: '',// 实际控制人分析(央企)备注
        channelAnalysisNote: '', // 企业融资渠道分析备注
        marketCompetitivenessAnalysisNote: '', // 企业产品/市场竞争力分析备注
        levelAnalysisNote: '', // 企业管理水平分析备注
        rationalityAnalysisNote: '', // 企业战略投资合理性分析备注
        otherImportantMattersNote: '', // 其他重要事项备注
        summaryNote: '',
      },
      formBase: {
        // debtGuaranteeRate: '保持不变',//资产负债率
        // externalGuaranteeRate: '保持不变',//对外担保率
        // profitMargin: '保持不变',//利润率
        // otherCopeWith: '保持不变',//其他应付
        // otherReceivable: '保持不变',//其他应收
        // capitalImmobilizationRatio: '保持不变', //资本固定化比率
        // otherFinancialIndicators: '保持不变', //其他财务指标
        // actualControllerPrivate: '保持不变',//实际控制人分析(民企)
        // actualControllerCountry: '保持不变', //实际控制人分析(国企)
        // actualControllerCentral: '保持不变',//实际控制人分析(央企)
        channelAnalysis: '正常', // 企业融资渠道分析
        marketCompetitivenessAnalysis: '正常', // .企业产品/市场竞争力分析
        levelAnalysis: '正常', // ..企业管理水平分析
        rationalityAnalysis: '正常', // 企业战略投资合理性分析
        otherImportantMatters: '正常', // 其他重要事项
        summary: '正常',
      },
      form2Base: {
        // debtGuaranteeRateNote: '', //资产负债率比例备注
        // externalGuaranteeRateNote: '', //对外担保比例备注
        // profitMarginNote: '',//利润率备注
        // otherCopeWithNote: '',//其他应付备注
        // otherReceivableNote: '',// 其他应收备注
        // capitalImmobilizationRatioNote: '', //资本固定化比率备注
        // otherFinancialIndicatorsNote: '', //其他财务指标备注
        // actualControllerPrivateNote: '',//实际控制人分析(民企)备注
        // actualControllerCountryNote: '',// 实际控制人分析(国企)备注
        // actualControllerCentralNote: '',// 实际控制人分析(央企)备注
        channelAnalysisNote: '', // 企业融资渠道分析备注
        marketCompetitivenessAnalysisNote: '', // 企业产品/市场竞争力分析备注
        levelAnalysisNote: '', // 企业管理水平分析备注
        rationalityAnalysisNote: '', // 企业战略投资合理性分析备注
        otherImportantMattersNote: '', // 其他重要事项备注
        summaryNote: '',
      },
      changeForm: {},
      istest: false,
      testmsg: '试算',
      testLoading: '试算中...',
      msg: {
        higher: '高于优值',
        lower: '低于优值',
        normal: '标准值',
      },
      levelOption: levelList,
      inputLevel: '',
      textarea: '',
      loading: false,
      filelist: [],
      headers: {},
      params: {},
      dianpinform: [],
      getArr: [1, 2, 3, 4, 5],
    };
  },
  props: ['rosterlist', 'rowData', 'addComment'],
  created() {
    // console.log('get new comment:', this.tabData.rowData.s_majority_shareholder);
    this.curIndex = 0;
  },
  mounted() {
    this.headers = { Authorization: localStorage.getItem('token') };
  },
  computed: {
    zhibiaolist() {
      const arr = JSON.parse(localStorage.getItem('SubjectLevelList'));
      return arr;
    },
  },
  methods: {
    ...mapActions(['addNewCreatingComment', 'uploadBase64', 'modCreditSubjectLevel']),
    ...mapMutations(['setNewoutputContent']),
    changeZhibiao(val) {
      this.showZhiliao();
    },
    close() {
      this.$emit('sendHide', false);
      this.clearForm();
      // console.log(data)
    },
    showZhiliao() {
      console.log('dianpinform', this.dianpinform);
      this.showWhat1 = this.dianpinform.some(item => item == 1);
      this.form.channelAnalysis = this.showWhat1 == false ? '正常' : this.form.channelAnalysis;
      this.showWhat2 = this.dianpinform.some(item => item == 2);
      this.form.marketCompetitivenessAnalysis = this.showWhat2 == false ? '正常' : this.form.marketCompetitivenessAnalysis;
      this.showWhat3 = this.dianpinform.some(item => item == 3);
      this.form.levelAnalysis = this.showWhat3 == false ? '正常' : this.form.levelAnalysis;
      this.showWhat4 = this.dianpinform.some(item => item == 4);
      this.form.rationalityAnalysis = this.showWhat4 == false ? '正常' : this.form.rationalityAnalysis;
      this.showWhat5 = this.dianpinform.some(item => item == 5);
      this.form.otherImportantMatters = this.showWhat5 == false ? '正常' : this.form.otherImportantMatters;
    },
    selectChange(event, val) {
      // console.log(event,val)
      // console.log(this.form2[val])
      if (event !== '保持不变') {
        this.changeForm[val] = event;
      } else {
        this.changeForm[val] = '';
      }
      console.log(this.changeForm);
    },
    showLoading(show) {
      this.loading = show;
    },
    getsubList(val) {
      console.log('arr', this.zhibiaolist);
      let obj = {};

      this.zhibiaolist.forEach((item) => {
        if (item.index == val) {
          obj = { ...item };
        }

        // console.log('obj',obj)
      });

      return obj.indexValueList;
    },

    addNewComment(param) {
      this.cancelToken = this.axios.CancelToken;
      this.cancelSource = this.cancelToken.source();
      param.config = {
        cancelToken: this.cancelSource.token,
      };
      this.addNewCreatingComment(param).then((response) => {
        console.log('get response of add comment:', response);
        this.showLoading(false);
        this.$refs.uploadBinary.clearFiles();
        this.clearForm();
        // debugger
        if (response.status === '0000') {
          const data = this.rowdata;
          // data.outputVisible = false
          this.$emit('sendHide', false);
          this.setNewoutputContent(data);
          this.$message({
            message: '提交成功',
            type: 'success',
          });
        } else {
          this.$message.error('提交失败');
        }
      }).catch((error) => {
        this.showLoading(false);
        this.$message.error('提交失败');
      });
    },
    handleSuccess(result) {
      debugger;
      console.log('success:', result);
      if (result.status === '9998') {
        this.$router.push('/login');
        return;
      }
      this.curIndex++;
      if (result.length > 0) {
        const payload = this.reqParam.payload;
        const fileArray = payload.attachmentFile || [];
        const arr = payload.fileName || [];
        this.reqParam.payload.attachmentFile = [...fileArray, ...result];
        this.reqParam.payload.fileName = [...arr, result[0].split('?')[1]];
      }
      if (this.fileLength !== this.curIndex) {
        console.log('current fileLength:', this.fileLength);
        return;
      }
      this.curIndex = 0;
      this.fileLength = 0;
      console.log('this.reqParam.payload.fileName', this.reqParam.payload.fileName);
      this.reqParam.payload.attachmentFile = this.reqParam.payload.attachmentFile.join(',');
      this.reqParam.payload.fileName = this.reqParam.payload.fileName.join(',');
      // debugger
      this.addNewComment(this.reqParam);
    },
    handleError(err) {
      this.$message.error('文件格式不匹配');
      this.loading = false;
    },
    beforeUpload(file) {
      console.log('before upload file:', file);
      this.uploadFile = file;
    },
    submit() {
      // console.log('submit,filelist:', this.filelist);
      const compName = this.rowdata.compName;
      const level = this.inputLevel;
      const moduleName = this.rowdata.compName;
      const rosterId = this.rosterId;
      // let remark = this.textarea;
      // if (remark == '') {
      //     this.$message('请输入点评内容');
      //     return;
      // }
      // if (level == '') {
      //     this.$message('请先试算');
      //     return;
      // }
      this.params = {
        ...this.form,
        ...this.form2,
      };
      console.log('this.reqParam@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', this.reqParam);
      this.reqParam = {
        payload: {
          ...this.params,
          level,
          compName,
          moduleName,
          rosterId,
        },
      };
      this.showLoading(true);
      if (this.fileLength > 0) {
        const ret = this.$refs.uploadBinary.submit();
        console.log('get ret of submit:', ret);
        return;
      }
      this.addNewComment(this.reqParam);
    },
    onChange(file, fileList) {
      if (file.status === 'ready') {
        this.fileLength = fileList.filter(file => file.status === 'ready').length;
      }
    },
    clearForm() {
      this.form = this.formBase;
      this.form2 = this.form2Base;
      this.inputLevel = '';
      this.dianpinform = [];
      this.changeZhibiao();
    },
  },
  watch: {
    getShow(val) {

    },
    isClose(val) {
      if (val !== true) {
        // 清除表单数据
        this.$refs.uploadBinary.clearFiles();
        this.form = this.formBase;
        this.form2 = this.form2Base;
        this.inputLevel = '';
        return;
      }
      console.log('cancel requests');
      this.loading = false;
      // 窗口关闭，终止未完成的请求
      if (this.uploadFile) {
        this.$refs.uploadBinary.abort(this.uploadFile);
      }
      if (this.cancelSource) {
        this.cancelSource.cancel();
      }
    },
  },
};
</script>

<style scoped>
#applycomment{
  width: 100%;
}
  .formWrap {
      overflow: hidden;
      margin-bottom: 20px;
  }

  .commitBtn {
      clear: both;
      display: block;
      margin: 0 auto;
  }
  .commentinput{
    border-bottom: 2px solid #CBCED4;
  }
  .commentinput .el-textarea {
      height: 80px;
      margin-top: 15px;
  }
  .commentinput  .title_h{
    font-size: 14px;
    color: #303234;
    display: inline-block;
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
  .commentinput .el-textarea .el-textarea__inner {
      height: 100%;
  }

  .setlevel {
      float: left;
      margin-top: 35px;
      margin-left: 25px;
      padding-left: 50px;
      border-left: 1px solid #d9d9d9;
  }

  .setlevel>div {
      overflow: hidden;
  }

  .setlevel .choose {
      margin-top: 25px;
  }

  .setlevel .el-input {
      width: 200px;
  }

  .setlevel .el-input,
  .setlevel .el-option,
  .setlevel .el-select
   {
      float: right;
  }

  .uploadWraper {
      margin-top: 80px;
      width: 50%;
      float: left;
      text-align: center

  }

  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
  }

  .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 78px;
      height: 78px;
      line-height: 78px;
      text-align: center;
      border: 1px dashed #dcdfe6;
  }

  .avatar {
      width: 78px;
      height: 78px;
      display: block;
  }

  .el-input {
      width: initial;
  }

  .el-textarea__inner {
      height: 80px;
  }
</style>
