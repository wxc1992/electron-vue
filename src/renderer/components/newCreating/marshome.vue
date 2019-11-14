<template>
  <div id="marshome">
    <div class="firstbox clearfix">
      <div class="cardbox letf-box"  style="width: 40%">
        <div class="header" style="width: 100%">
            行业分布
        </div>
        <div style="width:95%;margin: 20px auto;height:100px;background:#EFF7FF;padding: 40px 0;">
            <div class="flexbox">
              <span style="width:85px;" @click="changeSpan(index,item.value)"  :class="index==nowindex?'active':''" v-for="(item,index) in spanlist" v-show="index<4" :key="index">{{item.lable}}</span>
            </div>
           <div class="flexbox" style="margin-top: 20px">
              <span style="width:85px;" @click="changeSpan(index,item.value)" :class="index==nowindex?'active':''" v-for="(item,index) in spanlist" v-show="index>=4" :key="index">{{item.lable}}</span>
           </div>
        </div>
      </div>
      <div class="cardbox right-box" style="width: 58%">
        <div class="header" style="width: 100%;">
            我的看板
        </div>
        <div  style="width: 100%;height:220px">
           <div class="fl" style="width: 55%;height:220px;padding-top:20px;padding-left:16px;box-sizing: border-box;">
             <el-table
                  ref="multipleTable3"
                  border
                  :data="tableData5"
                  tooltip-effect="dark"
                  height="180"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                  <el-table-column
                    prop="level"
                    label="评级"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                  align="center"
                  prop="count"
                  label="主体数">
                  </el-table-column>
                  <el-table-column
                    prop="countProportion"
                    label="占比(%)"
                    align="right"
                  >
                  </el-table-column>

                </el-table>
           </div>
           <div class="fr" style="width: 42%;height:220px;box-sizing: border-box;" ref="rightbox2">
              <div id="chartView2" :style="{height: '200px',width:'100%','padding-top':'20px'}">
              </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="文件上传" :visible="visibility" width="500px" center v-loading="loading2">
        <el-upload class="upload" ref="upload" drag :action="actionUrl" :data="extraParams" :on-success="onUploadSuccess" :on-error="onUploadError" :auto-upload="false" accept=".xls,.xlsx"  :headers="header">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过100M</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="submit">上 传</el-button>
            </span>
    </el-dialog>
    <el-dialog
      title="添加主体"
      :close-on-click-modal="false"
      :show-close="false"
     :visible="showAddsubject"
     width="500px"
     center
     v-loading="loading3">
     <div>
       <div>
         <span style="width:120px">查询主体：</span>
         <el-autocomplete
            v-model="compNameLike"
            style="width:300px"
            :fetch-suggestions="querySearchAsync"
            suffix-icon="el-icon-search"
            placeholder="请搜索查询公司"
            clearable
            @select="handleSelect">
          </el-autocomplete>
       </div>
       <div style="margin-top:20px">
         <div>
          <span style="width:120px"> 债券代码：</span>
          <!-- <el-input
              style="width: 220px"
              placeholder="请输入债券代码"
              v-model="addsubjectparams.bondCode">
            </el-input> -->
            <el-autocomplete
              style="width: 300px"
              v-model="addsubjectparams.bondCode"
              :fetch-suggestions="querySearchAsyncbondCode"
              placeholder="请输入债券代码"
              @select="handleSelect2"
            ></el-autocomplete>
         </div>
         <div style="margin-top:20px">
            <span style="width:120px">公司名称： </span>
            <el-input
            style="width: 300px"
              placeholder="请输入公司名称"
              v-model="addsubjectparams.compName">
            </el-input>

         </div>
       </div>
     </div>
      <div slot="footer" style="text-align: center">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </div>
    </el-dialog>
    <div class="cardbox lastbox" style="margin-top: 20px;">
      <div class="header" style="width: 100%">
            评级申请
      </div>
      <div style="padding: 20px;box-sizing: border-box">
        <div>
          <el-button plain size="mini" @click="uploadshow">上传文件</el-button>
          <el-button plain size="mini" @click="downloadTemplate">下载模板</el-button>
          <el-button plain size="mini" @click="addSubject">添加主体</el-button>
          <el-button plain size="mini" @click="applyComment(1,{})">申请点评</el-button>
        </div>
        <div style="margin-top: 10px;padding-bottom: 120px;">
          <el-table
            ref="multipleTable"
            :data="tableData3"
            v-loading="loading"
            tooltip-effect="dark"
            :row-class-name="tableRowClassName"
            style="width: 100%"
            height="300"
            @selection-change="handleSelectionChange">
             <el-table-column
                width="80">
                <template slot-scope="scope">
                  <div style="color:#f00" v-if="scope.row.checked == 1">
                    已申请点评
                  </div>
                </template>
             </el-table-column>
            <el-table-column
              type="selection"
              :selectable="selectfn"
              width="50">
            </el-table-column>
            <el-table-column
              label="债券代码"
              prop="bondCode"
              >
              <template slot-scope="scope">{{ scope.row.bondCode }}</template>
            </el-table-column>
            <el-table-column
              prop="compName"
              label="公司"
             >
            </el-table-column>
            <el-table-column
              prop="finalLevel"
              label="MARS评级">
            </el-table-column>
            <el-table-column
              prop="summaryNote"
              label="点评"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.summaryNote=='暂无点评' && scope.row.checked == 0">
                    <el-button plain size="mini" @click="applyComment(2,scope.row)">申请点评</el-button>
                </div>
                <div v-else>
                  {{scope.row.summaryNote}}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right;margin-top:10px;">
            <a href="javascript:;" style="font-size: 12px;color:rgb(64, 158, 255);text-decoration: none;" @click="showMore = !showMore">查看更多</a>
          </div>
          <div class="chartbox" v-show="showMore">
            <div class="chartboxTitle">
              评级分布
            </div>
            <div class="clearfix tablebox" ref="bigbox" id="tablebox">
              <div class="fl" style="width: 40%;" ref="leftBox">
                <el-table
                  ref="multipleTable2"
                  border
                  :data="tableData4"
                  tooltip-effect="dark"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                  <el-table-column
                  align="right"
                  label="评级分布">
                    <template slot-scope="scope">{{ scope.row.finalLevel }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="num"
                    label="个数"
                    align="right"
                  >
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label=""
                    width="2"
                    align="right"
                  >
                  </el-table-column>
                </el-table>
            </div>
            <div class="fr" style="width: 50%" ref="rightbox">
              <div id="chartView" :style="{height: '300px',width:'100%'}">
              </div>
            </div>
          </div>
            </div>
        </div>
      </div>
    </div>
    <div style="height:72px;">

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import echarts from 'echarts';
const permissionMap = {
  mainButton: ['ss_all'],
};
export default {
  data() {
    return {
      tableData3: [],
      multipleSelection: [],
      tableData4: [],
      tableData5: [],
      nowindex: null,
      chartWidth: 0,
      loading: false,
      addsubjectparams: {
        compName: '',
        bondCode: '',
      },
      loading3: false,
      visibility: false,
      nowClass: '',
      showMore: false,
      compNameLike: '',
      showAddsubject: false,
      extraParams: {},
      screenWidth: document.body.clientWidth,
      header: {},
      spanlist: [
        { lable: '城投', value: 5034, index: 0 },
        { lable: '钢铁', value: 5035, index: 1 },
        { lable: '地产', value: 5053, index: 2 },
        { lable: '轻工', value: 6004, index: 3 },
        { lable: '有色', value: 5036, index: 4 },
        { lable: '煤炭', value: 6002, index: 5 },
        { lable: '化工', value: 6001, index: 6 },
        { lable: '电力', value: 6003, index: 7 },
      ],
      loading2: false,
      actionUrl: '/dsmssec/applyLevel/importSearch',
      options: {
        color: ['#5593EF', '#88A1D5', '#35BACF', '#FED04F', '#EC6A2C'],
        title: {
          text: '',
          subtext: '',
          x: 'right',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [],
        },
        series: [
          {
            name: '评级分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data: [

            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
      options2: {
        color: ['#5593EF', '#88A1D5', '#35BACF', '#FED04F', '#EC6A2C'],
        title: {
          text: '',
          subtext: '',
          x: 'right',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [],
        },
        series: [
          {
            name: '评级分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [

            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => (() => {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
    })();
    const table = document.getElementById('tablebox').style.width;
    console.log('this.$refs.leftBox.style.width', `${this.$refs.leftBox.offsetWidth}---${this.$refs.bigbox.offsetWidth}`);
  },
  created() {
    const isshow = this.buttonRights['ssg3.0'];
    console.log(isshow);
    if (!isshow) {
      this.$message.warning('没有该菜单');
      this.$router.push('/');
    }
    // this.nowindex = this.spanlist.filter(item=> item.value == +localStorage.getItem('modulId'))[0].index || null

    const arr = this.spanlist.filter(item => item.value == +localStorage.getItem('modulId'));
    if (arr.length > 0) {
      this.nowindex = arr[0].index;
    } else {
      this.nowindex = null;
    }

    console.log(+localStorage.getItem('modulId'));
    console.log(arr);
    console.log('this.nowindex', this.nowindex);
    this.header = { Authorization: localStorage.getItem('token') };
    this.getMarsChartData2();
    this.gethomelist();
  },
  methods: {
    ...mapActions(['getMarsHome', 'getMarsLevel', 'applyDataComment', 'getlistByCompNameLike', 'addApplyLevel', 'selectLikeBondCode', 'getNewmarsHomechart']),
    addSubject() {
      this.showAddsubject = true;
    },
    cancelAdd() {
      this.showAddsubject = false;
    },
    saveAdd() {
      if (this.addsubjectparams.compName == '' && this.addsubjectparams.bondCode == '') {
        this.$message.warning('必须填写一个字段');
        return;
      }
      this.loading3 = true;
      const params = {
        ...this.addsubjectparams,
      };
      this.addApplyLevel(params).then((res) => {
        console.log('addsubjectparams', res);
        if (res.status == 200 && res.data.status == '0000') {
          this.$message.success('添加主体成功');
          this.compNameLike = '';
          this.addsubjectparams.bondCode = '';
          this.addsubjectparams.compName = '';
          this.showAddsubject = false;
          this.loading3 = false;
          this.gethomelist();
          this.getMarsChartData();
        } else {
          this.$message.error('添加主体失败');
          this.loading3 = false;
        }
      });
    },
    handleSelect(item) {
      console.log(item);
      this.addsubjectparams.compName = item.value;
      this.addsubjectparams.bondCode = '';
    },
    handleSelect2(item) {
      console.log(item);
      this.compNameLike = '';
      this.addsubjectparams.bondCode = item.key;
      this.addsubjectparams.compName = item.value.split('----')[1];
    },
    async querySearchAsync(queryString, callback) {
      const param = {
        name: queryString,
      };
      const res = await this.getlistByCompNameLike(param);
      console.log(res);
      let list = [];
      // res.data.data.forEach(item => {
      //   item.value = item.compName
      // });
      list = res.data.data;
      callback(list);
    },
    async querySearchAsyncbondCode(queryString, callback) {
      const param = {
        bondCode: queryString,
      };
      const res = await this.selectLikeBondCode(param);
      console.log(res);
      let list = [];
      res.data.forEach((item) => {
        item.value = `${item.key}----${item.value}`;
      });
      list = res.data || [];
      callback(list);
    },
    changeSpan(index, val) {
      this.nowindex = index;
      const obj = this.getNewCreditingMenu;
      const show = obj.childs.some(item => item.resCode == 'mars_main');
      if (show) {
      //  if(val === 5034){
      //     this.$message.warning('城投暂不支持跳转')
      //   } else {
      //     localStorage.setItem('modulId',val)
      //      this.$router.push('/newSSG/newCreatingMars')
      //   }
        localStorage.setItem('modulId', val);
        this.$router.push('/newSSG/newCreatingMars');
      } else {
        this.$message.warning('暂不支持跳转或您没有相关权限,可联系管理员查看详情');
      }

      // localStorage.setItem()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectfn(row, index) {
      console.log(row);
      if (row.checked == 1) {
        return false;
      }
      return true;
    },
    async applyComment(type, row) {
      let ids = [];
      if (type == 1) {
        if (this.multipleSelection.length == 0) {
          this.$message.warning('请选择一条或者多条数据');
          return;
        }
        this.multipleSelection.forEach((item) => {
          ids.push(item.id);
        });
        const res = await this.applyDataComment({ ids: ids.join(',') });
        console.log('applyDataComment@@@@@@@', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.$message.success('申请点评成功');
          this.gethomelist();
          this.getMarsChartData();
        }
      } else {
        ids = [row.id];
        const res = await this.applyDataComment({ ids: ids.join(',') });
        console.log('applyDataComment@@@@@@@', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.$message.success('申请点评成功');
          this.gethomelist();
          this.getMarsChartData();
        }
      }
    },
    uploadshow() {
      this.visibility = true;
      this.loading2 = false;
    },
    downloadTemplate() {
      const aTag = document.createElement('a');
      aTag.href = '../../static/files/marshome.xlsx';
      aTag.download = '模板.xlsx';
      aTag.click();
    },
    submit() {
      this.loading2 = true;
      this.$refs.upload.submit();
    },
    onUploadError(err, file, fileList) {
      this.$message.error('上传文件失败:', err);
      this.loading2 = false;
    },
    onUploadSuccess(response, file, fileLis) {
      if (response.status !== '0000') {
        // if(response.status ==='9998'){
        //     this.$message.error('权限过期，请重新登录');
        //     this.$router.replace('/login');
        //     return;
        // }
        this.$message.error('导入文件失败');
        this.loading2 = false;
      } else {
        this.$message({
          message: '导入文件成功',
          type: 'success',
        });
        this.gethomelist();
        this.loading2 = false;
      }
      this.visibility = false;
    },
    close() {
      this.visibility = false;
    },
    clearFiles() {
      this.$refs.upload.clearFiles();
    },
    async gethomelist() {
      this.loading = true;
      const res = await this.getMarsHome();
      console.log('gethomelist++++++', res);
      if (res.status === 200 && res.data.status === '0000') {
        this.tableData3 = res.data.data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } else {
        this.tableData3 = [];
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    async getMarsChartData() {
      const legenddata = [];
      const seriesdata = [];
      const res = await this.getMarsLevel();
      console.log('getMarsLevel!!!!!!!!!!!!!!!!', res);
      if (res.status === 200 && res.data.status === '0000') {
        this.tableData4 = res.data.data;
        res.data.data.forEach((item) => {
          legenddata.push(item.num);
          seriesdata.push({ name: item.finalLevel, value: item.num });
        });
        this.options.legend.data = legenddata;
        this.options.series[0].data = seriesdata;
      }
      this.$nextTick(() => {
        this.innitChart();
      });
    },
    async getMarsChartData2() {
      const legenddata = [];
      const seriesdata = [];
      const res = await this.getNewmarsHomechart();
      console.log('getNewmarsHomechart!!!!!!!!!!!!!!!!', res);
      if (res.status === 200) {
        this.tableData5 = res.data;
        res.data.forEach((item) => {
          legenddata.push(item.countProportion);
          seriesdata.push({ name: item.level, value: item.countProportion });
        });
        this.options2.legend.data = legenddata;
        this.options2.series[0].data = seriesdata;
      }
      this.$nextTick(() => {
        this.innitChart2();
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return 'warning-row';

      return '';
    },
    innitChart() {
      const lineChart = echarts.init(document.getElementById('chartView')); // 默认加载动画
      lineChart.resize();
      lineChart.setOption(this.options, true);
    },
    innitChart2() {
      const lineChart = echarts.init(document.getElementById('chartView2')); // 默认加载动画
      lineChart.resize();
      lineChart.setOption(this.options2, true);
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
  computed: {
    ...mapGetters(['getNewCreditingMenu']),
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
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        const that = this;
        setTimeout(() => {
          // that.screenWidth = that.$store.state.canvasWidth
          console.log(that.screenWidth);
          that.innitChart();
          that.innitChart2();
          that.timer = false;
        }, 400);
      }
    },
    showMore(val) {
      if (val) {
        this.chartWidth = this.$refs.rightbox.offsetWidth;
        this.getMarsChartData();
      }
    },
  },
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar
      {
          width: 0;
          height: 8px;
          background-color: #F5F5F5;
      }

      /*定义滚动条轨道 内阴影+圆角*/
      ::-webkit-scrollbar-track
      {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
          border-radius: 10px;
          background-color: #F5F5F5;
      }

      /*定义滑块 内阴影+圆角*/


  #marshome{
     width: 90%;
     margin: 0 auto;
     height: 100%;
     overflow-y: scroll;
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 220px;
      margin: 0 auto;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    .firstbox{
      width: 100%;
      margin: 0 auto;
    }
    .flexbox{
      display: flex;
      justify-content:space-around ;
      span{
        display: inline-block;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background: #fff;
        font-size: 14px;
        cursor: pointer;
        border-radius: 3px;
        &:hover{
          background: #1283D5;
          color:#fff;
        }
        &.active{
           background: #1283D5;
           color:#fff;
        }
      }
    }
    // .lastbox{
    //   margin-bottom: 20px;
    // }
    .chartbox{
      margin: 0 auto;
      margin-top:10px;
      width: 100%;
      border: 1px solid #E1E1E1;
      .chartboxTitle{
        width: 98%;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        margin: 0 auto;
        border-bottom: 1px solid #eee;
        color: #666;
      }
      .tablebox{
         width: 98%;
         margin: 0 auto;
         padding: 40px;
         box-sizing: border-box;
      }
    }
    .cardbox{
      width: 100%;
       background: #fff;
       box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
       box-sizing: border-box;
       &.letf-box{
         width:78%;
         float: left;
       }
       &.right-box{
         width: 20%;
         margin-left: 2%;
         float: right;
       }

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
    }

  }
</style>
