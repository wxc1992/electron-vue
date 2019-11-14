<template>
  <div id="finalcel">
    <div class="fl left_container">
        <div style="width: 100%;" class="titlebox">
          <div class="header" style="width: 100%">
            选择主体
          </div>
          <el-form ref="form" :model="form" style="padding: 10px 0 10px 20px;">
            <el-form-item label="行业">
             <el-select v-model="form.moduleId" placeholder="请选择行业"  @change="industryChange">
                <el-option
                  clearble
                  v-for="item in industryList"
                  :key="item.id"
                  :label="item.key"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主体">
              <el-autocomplete
                  v-model="form.compNameLike"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  clearable
                  @select="handleSelect">
              </el-autocomplete>
            </el-form-item>
          </el-form>
        </div>
        <div class="listbox" :style="{'height':cardHeight-180+'px'}">
          <el-tabs tab-position="right" style="width: 100%" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane style="width:100%;height:40px;line-height:40px;font-size: 14px;" :label="item.compName" :name="item.compName" v-for="(item,index) in datalist" :key="index"></el-tab-pane>
          </el-tabs>
           <el-pagination
              style="margin-top:10px;"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="total">
          </el-pagination>
        </div>
    </div>
    <div class="right_container" :style="{'height':cardHeight+'px'}">
      <div class="header">
        {{compNameShow}}
      </div>
      <div style="{'height':cardHeight-40+'px'}" class="tabtop" v-loading="loadding">
        <el-tabs v-model="nowName" type="card" @tab-click="nowNameClick">
          <el-tab-pane label="资产负债指标" name="1"><zichan :alltableData="alltableData" :Tableheight="cardHeight-120"></zichan></el-tab-pane>
          <el-tab-pane label="利润指标" name="2"><lirun :alltableData="alltableData" :Tableheight="cardHeight-120"></lirun></el-tab-pane>
          <el-tab-pane label="现金流量指标" name="3"><cashflow :alltableData="alltableData" :Tableheight="cardHeight-120"></cashflow></el-tab-pane>
          <el-tab-pane label="财务分析指标" name="4"><caiwu :alltableData="alltableData" :Tableheight="cardHeight-120"></caiwu></el-tab-pane>
          <!-- <el-tab-pane label="行业分类" name="5"><industry :alltableData="alltableData" :Tableheight="cardHeight-120"></industry></el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import zichan from './financel/zichan.vue';
import caiwu from './financel/caiwu.vue';
import cashflow from './financel/cashflow.vue';
import lirun from './financel/lirun.vue';
import industry from './financel/industry.vue';
const permissionMap = {
  mainButton: ['ss_all', 'ssg3.0'],
};
export default {
  components: {
    zichan,
    industry,
    caiwu,
    lirun,
    cashflow,
  },
  data() {
    return {
      activeName: '',
      nowName: '1',
      datalist: [],
      industryList: [],
      cardHeight: 0,
      form: {
        compNameLike: '',
        moduleId: '',
      },
      compName: '',
      currentPage: 1,
      pageSize: 10,
      total: 10,
      alltableData: {},
      loadding: false,
      compNameShow: '',
    };
  },
  methods: {
    ...mapActions(['getfiveTableSelect', 'getFiveTableCompList', 'getQueryfinal']),
    handleClick(tab, event) {
      // console.log(tab)
      //  console.log(event)
      this.compNameShow = tab.name;
      this.form.compNameLike = '';
    },
    nowNameClick(tab, event) {

    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      this.getCompanylist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.current, val);
      this.getCompanylist();
    },
    getFiveTableData() {
      // debugger
      this.loadding = true;
      const param = {
        compName: this.activeName,
        type: this.form.moduleId,
      };
      this.getQueryfinal(param).then((res) => {
        console.log('getQueryfinal!!!!!!!!!!!!!', res);
        if (res.status === 200) {
          this.alltableData = res.data || {};
          // if(this.alltableData.financialAnalysis && this.alltableData.financialAnalysis.length>0){
          //   this.alltableData.financialAnalysis.forEach(item => {
          //     item.c0 = 'red'
          //     item.c1 = 'green'
          //     item.c2 = 'orange'
          //     item.c3 = 'purple'
          //   })
          // }
          setTimeout(() => {
            this.loadding = false;
          }, 1000);
        } else {
          this.alltableData = {};
          setTimeout(() => {
            this.loadding = false;
          }, 1000);
        }
      });
    },
    getCompanylist() {
      const param = {
        type: this.form.moduleId,
        currtenPage: this.currentPage,
        pageSize: this.pageSize,
      };
      this.getFiveTableCompList(param).then((res) => {
        console.log('getFiveTableCompList', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.datalist = res.data.data.records;
          this.activeName = res.data.data.records[0].compName;
          this.compNameShow = res.data.data.records[0].compName;
          this.total = res.data.data.total;
        }
      });
    },
    industryChange(val) {
      this.currentPage = 1;
      // this.getCompanylist()
    },
    async getIndustry() {
      try {
        const res = await this.getfiveTableSelect();
        console.log('getFiltersNew', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.industryList = res.data.data;
          this.form.moduleId = this.industryList[0].key;
        }
      } catch (error) {
        console.log('dataUpdate', error);
      }
    },
    async querySearchAsync(queryString, callback) {
      const param = {
        compName: queryString,
      };
      const res = await this.getFiveTableCompList(param);
      // console.log(res)
      let list = [];
      list = res.data.data.records || [];
      res.data.data.records.forEach((item) => {
        item.value = item.compName;
      });
      callback(list);
    },
    handleSelect(item) {
      //  debugger
      // this.form.moduleId = item.type
      this.activeName = '';
      this.compNameShow = item.compName;
      this.loadding = true;
      const param = {
        compName: this.compNameShow,
        type: item.type,
      };
      this.getQueryfinal(param).then((res) => {
        console.log('getQueryfinal!!!!!!!!!!!!!', res);
        if (res.status === 200) {
          this.alltableData = res.data || {};
          setTimeout(() => {
            this.loadding = false;
          }, 1000);
        } else {
          this.alltableData = {};
          setTimeout(() => {
            this.loadding = false;
          }, 1000);
        }
      });
    },
    parseRightsData(entry, codeIndex) {
      const resCode = permissionMap.mainButton[codeIndex++];
      if (Array.isArray(entry)) {
        for (var item of entry) {
          if (item.resCode === resCode) {
            return this.parseRightsData(item, 0);
          }
        }
      }
      const nextCode = permissionMap.mainButton[codeIndex];
      if (!nextCode) {
        return entry.childs || [];
      }
      const children = entry.childs || [];
      if (children.length === 0) {
        return [];
      }
      let found = false;
      for (var item of children) {
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
  watch: {
    'form.moduleId': function (val) {
      this.getCompanylist();
    },
    activeName(val) {
      if (val !== '') {
        this.getFiveTableData();
      }
    },
  },
  computed: {
    buttonRights() {
      const menulist = JSON.parse(localStorage.getItem('menu'));
      const rets = this.parseRightsData(menulist, 0);
      const ret = {};
      if (rets instanceof Array) {
        rets.forEach((val) => {
          ret[val.resCode] = true;
        });
      }
      console.log('get ret of button rights:', ret);
      return ret;
    },
  },

  created() {
    const isshow = this.buttonRights.creating_f;
    console.log(isshow);
    if (!isshow) {
      this.$message.warning('没有该菜单');
      this.$router.push('/');
    }
    this.getIndustry();
  },
  mounted() {
    const that = this;
    setTimeout(() => {
      that.cardHeight = window.innerHeight - 124;
    }, 200);
    this.$winResize.add(() => {
      clearTimeout(this.delay);
      this.delay = setTimeout(() => {
        that.cardHeight = window.innerHeight - 124;
      }, 200);
    });
  },
};
</script>

<style scoped lang="less">
#finalcel{
   width: 98%;
   margin: 0 auto;
  .header{
      padding: 0;
      height: 35px;
      width: 100%;
      line-height: 35px;
      background: #DAEBFB;
      padding-left: 10px;
      box-sizing: border-box;
      color: #404141;
      font-size: 14px;
      font-weight: bold;
      }
   .left_container{
      width:300px;
      // height: 300px;

      .listbox{
          height: 300px;
          padding-bottom: 10px;
          background: #fff;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          margin-top:20px;
      }
      .titlebox{
         width: 100%;
         padding-bottom: 20px;
         background: #fff;
         height: 130px;
         box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      }

    }
    .right_container{
    //  width: 100%;
     overflow: hidden;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      background: #fff;
      box-sizing: border-box;
      .tabtop{
        margin-top: 15px;
        padding: 0 15px;
        box-sizing: border-box;

      }
    }
}

</style>
