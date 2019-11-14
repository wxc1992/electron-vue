<template>
  <el-card class="box-card">
    <div id="cardWrap2">
      <div  style="width: 100%;">
        <div class="cardItem">
            <div class="title">行业</div>
              <el-select v-model="updateparams.moduleId" placeholder="请选择行业" style="width:100%;margin-top:-3px;" @change="industryChange">
              <el-option
                clearble
                v-for="item in industryList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="cardItem">
            <div class="title">MARS评级</div>
              <el-select v-model="updateparams.finalLevels" multiple collapse-tags placeholder="请选择" style="width:100%;margin-top:-3px;">
              <el-option v-for="item in searchOptions.level" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
           <div class="cardItem" >
            <div class="title">公司名称</div>
              <el-autocomplete
                  style="width:100%;margin-top:-4px;"
                  v-model="updateparams.compNameLike"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  clearable
                  @select="handleSelect">
              </el-autocomplete>
            </div>
            <div class="cardItem"  style="width:auto;" v-if="$route.path=='/newSSG/comment/1'">
              <div>待审核点评主体个数:&nbsp;&nbsp;<span style="color: #f00">{{total}}</span></div>
              <div>
                <span v-for="item in numlist" :key="item.module">{{item.module}}: <span style="color: #f00">{{item.num}}</span>&nbsp;&nbsp;</span>
              </div>
            </div>
          <div style="margin-top:20px;width:100%;text-align: center">
            <!-- <el-button  style="width:120px;background: none;color:#007CD3;border: 1px solid #007CD3;font-size:14px;" @click="clearParams">清空所有条件</el-button> -->
             <el-button size="small" style="width:120px;background:#007CD3;color:#fff;margin-left: 20px; font-size:14px;" @click="sendParams">查询</el-button>
          </div>
      </div>
    </div>
  </el-card>
</template>

<script>
// const maps= {
//   // '5034': '城投',
//   '5035': '钢铁',
//   '5036': '有色',
//   '5053': '地产',
//   '6001': '化工',
//   '6002': '煤炭',
//   '6003': '电力',
//   '6004': '轻工'
// }
import searchList from '../search-list.js';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      total: 0,
      numlist: [],
      updateparams: {
        moduleId: 5053,
        compNameLike: '',
        finalLevels: [],
      },
      industryList: [],
      searchOptions: {
        level: searchList.level,
        outerLevelList: searchList.outerLevelList,
        stockholder: searchList.stockholder,
        stockholderElectric: searchList.stockholderElectric,
        position: searchList.position,
      },
    };
  },
  watch: {
    $route(to, from) {
      console.log('/newSSG/comment/1watchwatchwatch', to);
      if (to.path == '/newSSG/comment/1') {
        this.getNum();
      }
    },
    'updateparams.compNameLike': function (val) {
      if (val == '') {
        this.updateparams.moduleId = 5053;
        const data = this.getNewoutputContent;
        data.moduleId = 5053;
        this.setNewoutputContent(data);
        this.setNewCreditingS({ ...this.updateparams });
      }
    },
  },
  computed: {
    ...mapGetters(['getNewoutputContent']),
  },
  methods: {
    ...mapActions(['getDeepSubject', 'getlistByCompNameLike', 'getauditnum']),
    ...mapMutations(['setNewCreditingS', 'setNewoutputContent']),
    getNum() {
      this.total = 0;
      this.getauditnum().then((res) => {
        console.log(res);

        this.numlist = res.data.data.moduleAndNums || [];
        res.data.data.moduleAndNums.forEach((item) => {
          this.total += item.num;
        });
      });
    },
    industryChange(val) {
      this.setNewCreditingS({
        moduleId: +val,
      });
      const data = this.getNewoutputContent;
      data.moduleId = +val;
      this.setNewoutputContent(data);
    },
    handleSelect(item) {
      this.updateparams.moduleId = item.moduleId;
      //  let params = {
      //   moduleId: this.moduleId,
      //   compNameLike: this.compNameLike,
      //   finalLevels: this.finalLevels,
      //   fieldCodeValue: this.fieldCodeValue
      // }
      // this.$emit('sendParams',params)
      const data = this.getNewoutputContent;
      data.moduleId = item.moduleId;
      this.setNewoutputContent(data);
      this.setNewCreditingS({ ...this.updateparams });
    },
    sendParams() {
      this.setNewCreditingS({
        ...this.updateparams,
      });
      const data = this.getNewoutputContent;
      data.moduleId = this.updateparams.moduleId;
      this.setNewoutputContent(data);
    },
    async getIndustry() {
      const params = {

      };
      try {
        const res = await this.getDeepSubject(params);
        console.log('getDeepSubject', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.industryList = res.data.data;
        }
      } catch (error) {
        console.log('dataUpdate', error);
      }
    },
    async querySearchAsync(queryString, callback) {
      const param = {
        name: queryString,
      };
      const res = await this.getlistByCompNameLike(param);
      console.log(res);
      let list = [];
      list = res.data.data;
      callback(list);
    },
  },
  created() {
    // this.compNameLike = ''
    // this.moduleId = 5035
    // this.finalLevels = []
    // this.fieldCodeValue = this.BasefieldCodeValue
    this.getIndustry();
    if (this.$route.path == '/newSSG/comment/1') {
      this.getNum();
    }
  },
  mounted() {
    const data = this.getNewoutputContent;
    data.moduleId = this.updateparams.moduleId;
    this.setNewoutputContent(data);
  },
};
</script>

<style lang="less" scoped>
  #cardWrap2{
    width: 100%;
      //  text-align: center;
      .cardItem{
        width:145px;
        margin-right: 40px;
        display: inline-block;
        // margin-bottom: 10px;
        &:last-child{
          margin-right: 0;
        }
        .title{
          width: 100%;
          position: relative;
          height: 22px;
          background: #DAEBFB;
          line-height: 22px;
          color: #76767B;
          text-align: center;
          font-size: 14px;
          z-index: 2;
        }
        .el-select{
          position: relative;
          z-index: 1;
        }
      }
  }
</style>
