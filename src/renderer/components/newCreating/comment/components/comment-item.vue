<template>
<div class="commentItem2">
    <div class="readonlyComment">
        <p>信评人员点评</p>
        <!-- <el-input type="textarea" :rows="2" v-model="textarea" disabled placeholder="请输入点评内容">
        </el-input> -->
        <div class="commentinput">
            <el-form ref="form" :model="form">
                <!-- <el-form-item label="">
                  <h1 class="title_h">资产负债率</h1>
                  <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.debtGuaranteeRate"></el-input>
                  <textarea v-model="form.debtGuaranteeRateNote" readonly="readonly" style="width:100%"></textarea>
                </el-form-item>
                <el-form-item label="">
                  <h1 class="title_h">对外担保率</h1>
                  <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.externalGuaranteeRate"></el-input>
                  <textarea v-model="form.externalGuaranteeRateNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="">
                  <h1 class="title_h">利润率</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.profitMargin"></el-input>
                  <textarea v-model="form.profitMarginNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="">
                  <h1 class="title_h">其他应付</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.otherCopeWith"></el-input>
                  <textarea v-model="form.otherCopeWithNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="">
                  <h1 class="title_h">其他应收</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.otherReceivable"></el-input>
                  <textarea v-model="form.otherReceivableNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="">
                  <h1 class="title_h">资本固定化比率</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.capitalImmobilizationRatio"></el-input>
                  <textarea v-model="form.capitalImmobilizationRatioNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="">
                  <h1 class="title_h">其他财务指标</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.otherFinancialIndicators"></el-input>
                  <textarea v-model="form.otherFinancialIndicatorsNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <div style="width: 100%;border-top:2px solid #CBCED4;margin:20px 0"></div>
                <el-form-item label="" v-if="majority ==='民企'">
                  <h1 class="title_h">实际控制人分析(民企)</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.actualControllerPrivate"></el-input>
                  <textarea v-model="form.actualControllerPrivateNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="" v-if="majority ==='地方国企'">
                  <h1 class="title_h">实际控制人分析(地方国企)</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.actualControllerCountry"></el-input>
                  <textarea v-model="form.actualControllerCountryNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="" v-if="majority ==='央企'">
                  <h1 class="title_h">实际控制人分析(央企)</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.actualControllerCentral"></el-input>
                  <textarea v-model="form.actualControllerCentralNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item> -->
                <el-form-item label=""  v-show="form.channelAnalysis && (form.channelAnalysis!=='正常'|| form.channelAnalysisNote!=='')">
                  <h1 class="title_h">企业融资渠道分析</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.channelAnalysis"></el-input>
                  <textarea v-model="form.channelAnalysisNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="" v-show="form.marketCompetitivenessAnalysis &&  (form.marketCompetitivenessAnalysis!=='正常'|| form.marketCompetitivenessAnalysisNote!=='')">
                  <h1 class="title_h">企业产品/市场竞争力分析</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.marketCompetitivenessAnalysis"></el-input>
                  <textarea v-model="form.marketCompetitivenessAnalysisNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="" v-show="form.levelAnalysis && (form.levelAnalysis!=='正常'|| form.levelAnalysisNote!=='')">
                  <h1 class="title_h">企业产品管理水平分析</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.levelAnalysis"></el-input>
                  <textarea v-model="form.levelAnalysisNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="" v-show="form.rationalityAnalysis && (form.rationalityAnalysis!=='正常'|| form.rationalityAnalysisNote!=='')">
                  <h1 class="title_h">企业战略投资合理性分析</h1>
                  <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.rationalityAnalysis"></el-input>
                  <textarea v-model="form.rationalityAnalysisNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="" v-show="form.otherImportantMatters && (form.otherImportantMatters!=='正常'|| form.otherImportantMattersNote!=='')">
                  <h1 class="title_h">其他重要事项</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.otherImportantMatters"></el-input>
                  <textarea v-model="form.otherImportantMattersNote" readonly="readonly" style="width:100%">
        </textarea>
                </el-form-item>
                <el-form-item label="" v-show="form">
                    <h1 class="title_h">总结</h1>
                    <el-input style="width:200px;height:30px;line-height:30px" readonly="readonly" v-model="form.summary"></el-input>
                    <textarea v-model="form.summaryNote" readonly="readonly" style="width:100%;height:160px">
                    </textarea>
                </el-form-item>
          </el-form>
        </div>

    </div>
    <div class="commentInfo">
        <div class="line1 module">模型评级：{{singleItem.gradeLevel}}</div>
        <div class="line1 personnel">点评人员：{{singleItem.userName}}</div>
        <div class="line1 level">评级:{{singleItem.level}}</div>
        <div class="line1 time">时间：{{singleItem.createDate}}</div>
        <div class="line1 time">准入白名单：{{singleItem.rosterName}}</div>
        <div class="line1 time">点评审核人员：{{singleItem.pendingReviewerNames!==null?singleItem.pendingReviewerNames.join('，'):''}}</div>
        <div class="line1 links">相关下载链接:
            <ul>
                <li v-for="link in fileLinks" :key="link.split('/').pop()"><a :href="link" :download="link.split('/').pop()" target="_blank">{{ link ==''?'':link.split('?')[1].split('=')[1]}}</a></li>
            </ul>
        </div>
    </div>
    <!-- <div class="edit" v-if="enableEdit">
        <el-button type="primary" plain @click="reEdit(singleItem)">编辑</el-button>
    </div> -->
    <div class="operate" v-if="needOperate">
        <el-button type="primary" plain @click="audit(3)" v-if="showopertate1">通过</el-button>
        <el-button plain @click="audit(4)" v-if="showopertate2">驳回</el-button>
        <el-button plain @click="audit(5)" v-if="showopertate3">撤销</el-button>
    </div>
    <div class="cover">{{coverText}}</div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';
const rightsMap = {
  mainButton: ['ssg3.0', 'comment_m', 'Audit_comment'],
};
export default {
  data() {
    return {
      show: true,
      // form.: this.singleItem.remark
      // form: {
      //   debtGuaranteeRate: '',//资产负债率
      //   externalGuaranteeRate: '',//对外担保率
      //   profitMargin: '',//利润率
      //   otherCopeWith: '',//其他应付
      //   otherReceivable: '',//其他应收
      //   capitalImmobilizationRatio: '', //资本固定化比率
      //   otherFinancialIndicators: '', //其他财务指标
      //   actualControllerPrivate: '',//实际控制人分析(民企)
      //   actualControllerCountry: '', //实际控制人分析(国企)
      //   actualControllerCentral: '',//实际控制人分析(央企)
      //   channelAnalysis: '', //企业融资渠道分析
      //   marketCompetitivenessAnalysis:'', //.企业产品/市场竞争力分析
      //   levelAnalysis: '',//..企业管理水平分析
      //   rationalityAnalysis: '',//企业战略投资合理性分析
      //   otherImportantMatters:'',//其他重要事项
      //   summary: '',
      //   debtGuaranteeRateNote: '', //资产负债率比例备注
      //   externalGuaranteeRateNote: '', //对外担保比例备注
      //   profitMarginNote: '',//利润率备注
      //   otherCopeWithNote: '',//其他应付备注
      //   otherReceivableNote: '',// 其他应收备注
      //   capitalImmobilizationRatioNote: '', //资本固定化比率备注
      //   otherFinancialIndicatorsNote: '', //其他财务指标备注
      //   actualControllerPrivateNote: '',//实际控制人分析(民企)备注
      //   actualControllerCountryNote: '',// 实际控制人分析(国企)备注
      //   actualControllerCentralNote: '',// 实际控制人分析(央企)备注
      //   channelAnalysisNote: '', // 企业融资渠道分析备注
      //   marketCompetitivenessAnalysisNote: '',//企业产品/市场竞争力分析备注
      //   levelAnalysisNote: '',//企业管理水平分析备注
      //   rationalityAnalysisNote: '',//企业战略投资合理性分析备注
      //   otherImportantMattersNote: '', //其他重要事项备注
      //   summaryNote: ''
      // },
    };
  },
  props: ['singleItem', 'moduleType', 'rowdata', 'showopertate1', 'showopertate2', 'showopertate3'],
  methods: {
    ...mapActions(['resolveCommentNew']),
    audit(status) {
      const id = this.singleItem.id;
      this.resolveCommentNew({
        status,
        id,
      }).then((result) => {
        console.log('get response of resolveCommentNew:', result);
        if (result.status == '0000') {
          this.$message.success('操作成功');
          this.$emit('sendClose', false);
        }
      });
    },
    reEdit(id) {
      this.$emit('reEdit', id);
    },
    parseRightsData(entry, codeIndex) {
      const resCode = rightsMap.mainButton[codeIndex++];
      const nextCode = rightsMap.mainButton[codeIndex];
      if (!nextCode) {
        return entry.childs || [];
      }
      const children = entry.childs || [];
      if (children.length === 0) {
        return [];
      }
      let found = false;
      for (const item of children) {
        if (nextCode === item.resCode) {
          found = true;
          return this.parseRightsData(item, codeIndex);
        }
      }
      if (!found) {
        return [];
      }
    },
  },
  computed: {
    ...mapGetters(['getNewCreditingMenu', 'getNewoutputContent']),
    remark() {
      console.log('this.singleItem', this.singleItem);
      return this.singleItem.remark;
    },
    form() {
      console.log('this.singleItem', this.singleItem);
      return this.singleItem;
    },
    needOperate() {
      if (this.singleItem.status === 2) {
        return true;
      }
    },
    coverText() {
      if (this.singleItem.status == 2) {
        return '待审核';
      }
      if (this.singleItem.status == 3) { return '已审核'; }
      if (this.singleItem.status == 4) {
        return '已驳回';
      }
      if (this.singleItem.status == 5) {
        return '已撤销';
      }
      return '';
    },
    fileLinks() {
      const attachFiles = this.singleItem.attachmentFile || '';
      return attachFiles.split(',') || [];
    },
    enableEdit() {
      if (this.singleItem.status === 4 && this.moduleType) {
        return true;
      }
    },
    buttonRights() {
      const entry = this.getNewCreditingMenu;
      const mainButtons = rightsMap.mainButton;
      const rets = this.parseRightsData(entry, 0);
      const ret = {};
      rets.forEach((val) => {
        ret[val.resCode] = true;
      });
      console.log('get ret of button rights comment:', ret);
      return ret;
    },
  },
};
</script>

<style scoped>
 p{
  margin-bottom: 20px;
  text-indent: 10px;
  height: 30px;
  line-height: 30px;
  background: #DAEBFB;
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

.commentItem2 textarea {
    box-sizing: border-box;
    max-width: 100%;
    min-height: 80px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
}

.line1 {
    flex: 1 1 198px;
    padding: 20px;
}


.operate {
    display: flex;
    justify-content: center;
}

.commentItem2 {
    position: relative;
    color: #303234;

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
