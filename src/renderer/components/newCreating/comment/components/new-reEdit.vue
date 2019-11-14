<template>
<div v-loading="loading">
    <div class="commentinput">
        <!-- <el-input type="textarea" :rows="2" v-model="textarea" placeholder="请输入点评内容">
        </el-input> -->
       <el-form ref="form" :model="formData">
              <!-- <el-form-item label="">
                <h1 class="title_h">资产负债率</h1>
                 <el-select  v-model="formData.debtGuaranteeRate" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('debt_guarantee_rate')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.debtGuaranteeRateNote" placeholder="请输入资产负债率点评内容"></el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">对外担保率</h1>
                 <el-select  v-model="formData.externalGuaranteeRate" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('external_guarantee_rate')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.externalGuaranteeRateNote" placeholder="请输入对外担保率点评内容"></el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">利润率</h1>
                 <el-select  v-model="formData.profitMargin" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('profit_margin')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.profitMarginNote" placeholder="请输入利润率点评内容"></el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">其他应付</h1>
                 <el-select  v-model="formData.otherCopeWith" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('other_cope_with')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.otherCopeWithNote" placeholder="请输入其他应付点评内容"></el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">其他应收</h1>
                 <el-select  v-model="formData.otherReceivable" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('other_receivable')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.otherReceivableNote" placeholder="请输入其他应收点评内容"></el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">资本固定化比率</h1>
                 <el-select  v-model="formData.capitalImmobilizationRatio" placeholder="请选择" >
                   <el-option v-for="opt in getsubList('capital_immobilization_ratio')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.capitalImmobilizationRatioNote" placeholder="请输入资本固定化比率点评内容"></el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">其他财务指标</h1>
                 <el-select  v-model="formData.otherFinancialIndicators" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('other_financial_indicators')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.otherFinancialIndicatorsNote" placeholder="请输入其他财务指标点评内容"></el-input>
              </el-form-item>
              <div style="width: 100%;border-top:2px solid #CBCED4;margin:20px 0"></div>
              <el-form-item label="" v-if="majority ==='民企'">
                <h1 class="title_h">实际控制人分析(民企)</h1>
                 <el-select  v-model="formData.actualControllerPrivate" placeholder="请选择" >
                     <el-option v-for="opt in getsubList('actual_controller_private')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.actualControllerPrivateNote" placeholder="请输入重点分析实际控制人的背景、资源能力、企业的治理结构设计优势">

                 </el-input>
              </el-form-item>
              <el-form-item label="" v-if="majority ==='地方国企'">
                <h1 class="title_h">实际控制人分析(地方国企)</h1>
                 <el-select  v-model="formData.actualControllerCountry" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('actual_controller_country')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.actualControllerCountryNote" placeholder="请输入重点分析实际控制人的背景、获得区域支持、对区域经济的贡献程度">

                 </el-input>
              </el-form-item>
              <el-form-item label="" v-if="majority ==='央企'">
                <h1 class="title_h">实际控制人分析(央企)</h1>
                 <el-select  v-model="formData.actualControllerCentral" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('actual_controller_central')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.actualControllerCentralNote" placeholder="请输入重点分析实际控制人的背景、在实际控制人管理体系中所处的地位">

                 </el-input>
              </el-form-item> -->
               <el-form-item label="">
                <h1 class="title_h">企业融资渠道分析</h1>
                 <el-select  v-model="formData.channelAnalysis" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('channel_analysis')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.channelAnalysisNote" placeholder="请输入企业的银行合作与授信、上市公司资源、集团以及关联公司资源、优质可转让资产等提升融资能力的优势分析">

                 </el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">企业产品/市场竞争力分析</h1>
                 <el-select  v-model="formData.marketCompetitivenessAnalysis" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('market_competitiveness_analysis')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.marketCompetitivenessAnalysisNote" placeholder="请输入企业产品再同类产品中的品质/品牌优势、生产设备的优势、研发能力及渠道销售能力的优劣势分析">

                 </el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">企业产品管理水平分析</h1>
                 <el-select  v-model="formData.levelAnalysis" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('level_analysis')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.levelAnalysisNote" placeholder="请输入企业现代管理制度建立的情况、有无生产事故、近三年管理层变动请款分析,公开数据(包括财务数据)的透明度">

                 </el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">企业战略投资合理性分析</h1>
                 <el-select  v-model="formData.rationalityAnalysis" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('rationality_analysis')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.rationalityAnalysisNote" placeholder="请输入企业的近期及远期战略、投资的合理性与不合理性分析">

                 </el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">其他重要事项</h1>
                 <el-select  v-model="formData.otherImportantMatters" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('other_important_matters')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.otherImportantMattersNote" placeholder="请输入企业存在的其他可能导致经营风险的问题,包括但不限于下游客户集中度高,大股东股票质押比列过高,可能影响企业经营的重大负面新闻、法律纠纷等">

                 </el-input>
              </el-form-item>
              <el-form-item label="">
                <h1 class="title_h">总结</h1>
                 <el-select  v-model="formData.summary" placeholder="请选择" >
                    <el-option v-for="opt in getsubList('summary')" :key="opt.id" :label="opt.key" :value="opt.key">
                    </el-option>
                </el-select>
                 <el-input type="textarea" :rows="2" v-model="formData.summaryNote" placeholder="请输入企业存在的其他可能导致经营风险的问题,包括但不限于下游客户集中度高,大股东股票质押比列过高,可能影响企业经营的重大负面新闻、法律纠纷等">

                 </el-input>
              </el-form-item>
        </el-form>
    </div>
    <div class="formWrap">
        <div class="uploadWraper">
            <el-upload ref="uploadBinary" :file-list="attachedFiles" :on-change="onChange" :before-remove="onChange" class="avatar-uploader" width="50px" height="50px" action="/file/upload" :show-file-list="true" :headers="headers" :on-success="handleSuccess" :auto-upload="false" :multiple="true">
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="setlevel">
            <!-- <div>
              <el-button class="commitBtn" type="primary" @click="testChange" :disabled="istest" style="margin-bottom: 25px;">{{testmsg}}</el-button>
            </div> -->
            <div>模型评级结果：
                <el-input v-model="moduleLevel" :disabled="true"  style="margin-bottom: 20px;">
                </el-input>
            </div>
            <div>上次评级调整结果：
                <el-input v-model="moduleLevel" :disabled="true">
                </el-input>
            </div>
             <div style="margin-top:20px;">准入白名单：
              <el-select  v-model="rosterId" placeholder="请选择" style="width: 200px;">
                <el-option v-for="opt in rosterlist" :key="opt.id" :label="opt.key" :value="opt.id">
                </el-option>
              </el-select>
            </div>
            <div class="choose">信评人员调整评级结果：
                <!-- <el-select v-model="testlevel" placeholder="请选择">
                    <el-option v-for="opt in levelOption" :key="opt.option" :label="opt.option" :value="opt.option">
                    </el-option>
                </el-select> -->
                <!-- <el-input v-model="inputLevel"   style="margin-bottom: 20px;">
                </el-input> -->
                <el-select v-model="inputLevel" placeholder="请选择">
                    <el-option v-for="opt in searchOptions.level" :key="opt.value" :label="opt.label" :value="opt.value">
                    </el-option>
                </el-select>
            </div>
        </div>
    </div>
    <div class="buttons" style="text-align: center">
        <el-button class="commitBtn" type="primary" plain @click="submit">提交</el-button>
        <el-button class="commitBtn" type="primary" plain @click="cancel">取消</el-button>
    </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';
import searchList from '../../search-list.js';
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
      searchOptions: {
        level: searchList.level,
      },
      levelOption: levelList,
      inputLevelVal: '',
      textarea: '',
      loading: false,
      filelist: [],
      headers: {},
      rosterId: null,
      form: {
        zichan: '',
      },
      form: {
        // debtGuaranteeRate: '',//资产负债率
        // externalGuaranteeRate: '',//对外担保率
        // profitMargin: '',//利润率
        // otherCopeWith: '',//其他应付
        // otherReceivable: '',//其他应收
        // capitalImmobilizationRatio: '', //资本固定化比率
        // otherFinancialIndicators: '', //其他财务指标
        // actualControllerPrivate: '',//实际控制人分析(民企)
        // actualControllerCountry: '', //实际控制人分析(国企)
        // actualControllerCentral: '',//实际控制人分析(央企)
        channelAnalysis: '', // 企业融资渠道分析
        marketCompetitivenessAnalysis: '', // .企业产品/市场竞争力分析
        levelAnalysis: '', // ..企业管理水平分析
        rationalityAnalysis: '', // 企业战略投资合理性分析
        otherImportantMatters: '', // 其他重要事项
        summary: '',
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
      istest: false,
      testmsg: '试算',
      testLoading: '试算中...',
    };
  },
  props: ['formData', 'isClose', 'majority', 'rosterlist'],
  created() {
    this.curIndex = 0;
  },
  beforeUpdate() {
    console.log('before update');
  },
  mounted() {
    console.log('get new comment of reedit:', this.formData);
    this.headers = { Authorization: localStorage.getItem('token') };
    // this.inputLevel = this.formData.level;
    // this.textarea= this.formData.remark;
  },
  computed: {
    ...mapGetters(['getNewoutputContent']),
    inputLevel: {
      set(value) {
        this.inputLevelVal = value;
      },
      get() {
        return this.inputLevelVal || this.formData.level;
      },
    },
    moduleLevel() {
      if (this.inputLevelVal == '') {
        this.inputLevelVal = this.formData.gradeLevel;
      }
      return this.formData.gradeLevel;
    },
    zhibiaolist() {
      const arr = JSON.parse(localStorage.getItem('SubjectLevelList'));
      return arr;
    },
    attachedFiles() {
      const attachmentFile = this.formData.attachmentFile || '';
      console.log('get files from formdata:$$$$$$:DD:', attachmentFile);
      const files = attachmentFile ? attachmentFile.split(',') : [];
      const ret = [];
      files.forEach((val) => {
        ret.push({
          name: val.split('/').pop(),
          url: val,
        });
      });
      return ret;
    },
  },
  methods: {
    ...mapActions(['addNewCreatingComment', 'uploadBase64', 'modCreditSubjectLevel']),
    ...mapMutations(['setNewoutputContent']),
    showLoading(show) {
      this.loading = show;
    },
    testChange() {
      for (const key in this.formData) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = this.formData[key];
        }
      }
      const {
        plateValue: moduleId,
      } = this.getCreditFilter;
      const subjectId = this.formData.id;
      const param = {
        ...this.formData,
        moduleId,
      };
      this.modCreditSubjectLevel(param).then((res) => {
        if (res.status === 200 && res.data.length !== 0) {
          this.inputLevel = res.data.data;
          this.$message.success('试算成功');
        } else {
          this.$message.error(res.msg);
        }
        this.istest = false;
        this.testmsg = '试算';
      });
    },
    getsubList(val) {
      let obj = {};
      this.zhibiaolist.forEach((item) => {
        if (item.index == val) {
          obj = { ...item };
        }
        // console.log('arr',this.zhibiaolist)
        // console.log('obj',obj)
      });
      return obj.indexValueList;
    },
    addNewComment(param) {
      this.cancelToken = this.axios.CancelToken;
      this.cancelSource = this.cancelToken.source();
      const config = {
        cancelToken: this.cancelSource.token,
      };
      this.addNewCreatingComment({ payload: this.reqParam, config }).then((response) => {
        console.log('get response of add comment:', response);
        this.showLoading(false);
        this.$refs.uploadBinary.clearFiles();
        this.clearForm();
        if (response.status === '0000') {
          this.$message({
            message: '提交成功',
            type: 'success',
          });
          const data = this.getNewoutputContent;
          data.outputVisibleMy = false;
          data.updateShow = true;
          this.setNewoutputContent(data);
          this.$emit('updateStatus', false);
          return;
        }
        this.$message.error('提交失败');
      }).catch((error) => {
        this.showLoading(false);
        this.$message.error('提交失败');
      });
    },
    handleSuccess(result) {
      console.log('success:', result);
      this.curIndex++;
      if (result.length > 0) {
        const fileArray = this.reqParam.attachmentFile || [];
        this.reqParam.attachmentFile = [...fileArray, ...result];
      }
      if (this.fileLength !== this.curIndex) {
        console.log('current fileLength:', this.fileLength);
        return;
      }
      this.curIndex = 0;
      this.fileLength = 0;
      this.reqParam.attachmentFile = this.reqParam.attachmentFile.join(',');
      this.addNewComment(this.reqParam);
    },
    submit() {
      for (const key in this.formData) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = this.formData[key];
        }
      }
      console.log(this.form);
      console.log('submit,filelist:', this.filelist);
      // let subjectId = this.formData.subjectId;
      const level = this.inputLevelVal;
      const id = this.formData.id;
      const compName = this.formData.compName;
      const moduleId = this.formData.moduleId;
      const rosterId = this.rosterId;

      // if (remark == '') {
      //     this.$message('请输入点评内容');
      //     return;
      // }
      // if (level == '') {
      //     this.$message('请选择等级');
      //     return;
      // }
      this.reqParam = {
        ...this.form,
        level,
        status: 2,
        compName,
        rosterId,
        moduleId,
        id,

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
      this.textarea = '';
      this.inputLevel = '';
    },
    cancel() {
      this.$emit('cancelEdit');
    },
  },
  watch: {
    isClose(val) {
      if (val !== true) {
        // 清除表单数据
        this.$refs.uploadBinary.clearFiles();
        this.textarea = '';
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
.formWrap {
      overflow: hidden;
      margin-bottom: 20px;
  }
  .el-button{
    display: inline-block
  }
  .el-form-item{
    text-align: left;
  }
  .commitBtn {
      clear: both;
      /* display: block; */
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
