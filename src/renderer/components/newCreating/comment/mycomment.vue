<template>
    <div id="mycommentone">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我启动的" name="first"></el-tab-pane>
            <el-tab-pane label="待我审的" name="second"></el-tab-pane>
            <el-tab-pane label="我已审的" name="third"></el-tab-pane>
        </el-tabs>
        <div class="cardbox">
            <div class="flexboxwarp">
                <div class="cardItem" v-if="activeName=='first'">
                    <div class="title">申请状态</div>
                    <el-select v-model="status" multiple clearable placeholder="请选择申请状态" style="width:100%;margin-top:-3px;">
                        <el-option
                        label="待审核"
                        value=2>
                        </el-option>
                        <el-option
                        label="已审核"
                        value=3>
                        </el-option>
                        <el-option
                        label="驳回 "
                        value=4>
                        </el-option>
                        <el-option
                        label="暂存"
                        value=7>
                        </el-option>
                        <el-option
                        label="已撤销"
                        value=8>
                        </el-option>
                    </el-select>
                </div>
                <div class="cardItem">
                    <div class="title">行业</div>
                    <el-select v-model="seacherParams.moduleId" clearable placeholder="请选择行业" style="width:100%;margin-top:-3px;" @change="industryChange">
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
                    <div class="title">公司名称</div>
                    <el-autocomplete
                        style="width:100%;margin-top:-3px;"
                        v-model="seacherParams.compName"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入公司名称"
                        clearable
                        @select="handleSelect">
                    </el-autocomplete>
                </div>
                <div class="cardItem">
                    <div class="title">MARS评级</div>
                    <el-select v-model="seacherParams.level" multiple clearable collapse-tags placeholder="请选择" style="width:100%;margin-top:-3px;">
                    <el-option v-for="item in levellist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="cardItem">
                    <div class="title">开始时间</div>
                    <el-date-picker
                        style="width:100%;"
                        v-model="seacherParams.updateTimeBegin"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="cardItem">
                    <div class="title">结束时间</div>
                    <el-date-picker
                        style="width:100%;"
                        v-model="seacherParams.updateTimeEnd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div style="margin-top:20px;width:100%;text-align: center">
            <!-- <el-button  style="width:120px;background: none;color:#007CD3;border: 1px solid #007CD3;font-size:14px;" @click="clearParams">清空所有条件</el-button> -->
            <el-button size="small" style="width:120px;background:#007CD3;color:#fff;margin-left: 20px; font-size:14px;" @click="doseacher">查询</el-button>
            </div>
        </div>
        <commentdio :outputVisibleMy="outputVisibleMy" :commentData="commentData"  @closedio="closedio"></commentdio>
        <el-table
            ref="refTable"
            :data="tableData"
            v-loading="loading"
            :height="tableHeight"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
            prop="module"
            label="行业"
            align="center"
            width="150">
            </el-table-column>
            <!-- <el-table-column
            prop="date"
            label="更新类型"
            width="180">
            </el-table-column> -->
            <el-table-column
            prop="compName"
            align="center"
            width="200"
            label="公司名称">
            </el-table-column>
            <el-table-column
            prop="level"
            width="100"
            align="center"
            label="MARS评级">
            </el-table-column>
            <el-table-column
            prop="gradeLevel"
            align="center"
            label="德邦评级">
            </el-table-column>
            <el-table-column
            prop="levelPeople"
            align="center"
            label="点评人员">
            </el-table-column>
            <el-table-column
            prop="pendingReviewers"
            width="150px"
            align="center"
            v-if="activeName=='first'"
            label="待审核人员">
            </el-table-column>
            <!-- <el-table-column
            prop="reviewer"
            align="center"
            width="200px"
            label="主体">
            </el-table-column> -->
            <el-table-column
            prop="reviewer"
            align="center"
            v-if="activeName=='first'"
            label="审核人员">
            </el-table-column>
            <el-table-column
            prop="status"
            align="center"
            label="状态">
            <template slot-scope="scope">
                {{scope.row.status| filterstatus}}
            </template>
            </el-table-column>
            <el-table-column
            prop="updateTime"
            align="center"
            width="150"
            show-overflow-tooltip
            label="更新时间">
               <template slot-scope="scope">
                    {{scope.row.updateTime| formattime}}
               </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            align="center"
            min-width="160"
            label="操作">
            <template slot-scope="scope">
                <a href="javascript:;" style="text-decoration: none;color: #409EFF"  @click="update(scope.row)" v-show="scope.row.status == 7">更新</a>
                <!-- <a href="javascript:;" style="text-decoration: none;color: #409EFF"  v-show="scope.row.status == 7">撤销</a> -->
                <a href="javascript:;" style="text-decoration: none;color: #409EFF"  @click="update(scope.row)" v-show="scope.row.status == 2">待审核详情</a>
                <a href="javascript:;" style="text-decoration: none;color: #409EFF"  @click="update(scope.row)" v-show="scope.row.status == 3">已审核详情</a>
                <a href="javascript:;" style="text-decoration: none;color: #409EFF"  @click="update(scope.row)" v-show="scope.row.status == 5">已撤销详情</a>
                <a href="javascript:;" style="text-decoration: none;color: #409EFF"  @click="update(scope.row)" v-show="scope.row.status == 4">已驳回详情</a>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
        style="margin-top:10px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 30,60, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import searchList from '../search-list.js';
import commentdio from './components/mycommentdio.vue';
export default {
  components: {
    commentdio,
  },
  filters: {
    filterstatus(value) {
      let lastvalue = '';
      switch (value) {
        case 2:
          lastvalue = '待审核';
          break;
        case 3:
          lastvalue = '已审核';
          break;
        case 4:
          lastvalue = '已驳回';
          break;
        case 7:
          lastvalue = '暂存';
          break;
        case 5:
          lastvalue = '已撤销';
          break;
          break;
      }
      return lastvalue;
    },
    formattime(value) {
      if (value == null) {
        return '--';
      }
      const timevalue = moment(value).format('YYYY-MM-DD  HH:mm:ss');
      return timevalue;
    },
  },
  data() {
    return {
      activeName: 'first',
      industryList: [],
      commentData: [],
      levellist: searchList.level,
      tableHeight: 0,
      outputVisibleMy: false,
      seacherParams: {
        moduleId: '',
        updateTimeBegin: '',
        updateTimeEnd: '',
        compName: '',
        level: [],
      },
      seacherParamsBase: {
        moduleId: '',
        updateTimeBegin: '',
        updateTimeEnd: '',
        compName: '',
        level: [],
      },
      status: [],
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      loading: false,
      total: 0,
    };
  },
  methods: {
    ...mapActions(['getlistByCompNameLike', 'getDeepSubject', 'queryMySubjectLevel', 'queryModCredCalDetail', 'queryMyReviewSubjectLevel', 'getHistoryComment', 'getMainInfo', 'querysubjectLevelDetail']),
    update(row) {
      console.log('update', row);
      this.commentData.rowData = row;
      const params = {
        compName: row.compName,
        moduleId: row.moduleId,
      };
      const params2 = {
        compName: row.compName,
        type: row.module,
      };
      const params1 = {
        id: row.id,
      };
      this.queryModCredCalDetail(params).then((res) => {
        const { status, data } = res.data;
        if (res.status === 200 && status === '0000') {
          this.commentData.cals = data.cals;
        }
      });
      this.querysubjectLevelDetail(params1).then((res) => {
        console.log('hiory--this.querysubjectLevelDetail--querysubjectLevelDetail', res);
        const { status, data } = res.data;
        if (res.status === 200 && status === '0000') {
          this.commentData.formData = data || {};
          this.getHistoryComment(params).then((res) => {
            console.log('hiory--this.getHistoryComment--ItemData', res);
            const { status, data } = res.data;
            if (res.status === 200 && status === '0000') {
              this.commentData.ItemData = data || {};
              this.getMainInfo(params2).then((res) => {
                console.log('hiory--this.getMainInfo--getMainInfo', res);
                const { status, data } = res.data;
                if (res.status === 200 && status === '0000') {
                  this.commentData.baseInfo = data || {};
                  this.commentData.activeName = this.activeName;
                  this.outputVisibleMy = true;
                  this.commentData.outputVisibleMy = true;
                }
              });
            }
          });
        }
      });
    },
    closedio() {
      this.gettableData();
      this.outputVisibleMy = false;
    },
    gettableData() {
      this.tableData = [];
      this.loading = true;
      const params = {
        ...this.seacherParams,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      if (this.activeName == 'first') {
        params.status = this.status;
        this.queryMySubjectLevel(params).then((res) => {
          console.log('first---this.queryMySubjectLevel', res);
          const { status, data } = res.data;
          if (res.status === 200 && status === '0000') {
            data.list.forEach((item) => {
              item.pendingReviewers = item.pendingReviewers == null || item.pendingReviewers == '' || item.pendingReviewers == undefined ? '' : `${item.pendingReviewers.join('，')}`;
            });
            this.tableData = data.list;
            this.total = data.total;
            this.loading = false;
          } else {
            this.tableData = [];
            this.loading = false;
          }
        });
      } else {
        if (this.activeName == 'second') {
          params.status = [2];
        }
        if (this.activeName == 'third') {
          params.status = [3, 4];
        }
        this.queryMyReviewSubjectLevel(params).then((res) => {
          console.log('second--third---this.queryMySubjectLevel', res);
          const { status, data } = res.data;
          if (res.status === 200 && status === '0000') {
            this.tableData = data.list;
            this.total = data.total;
            this.loading = false;
          } else {
            this.tableData = [];
            this.loading = false;
          }
        });
      }
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
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.pageNum = 1;
      this.gettableData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      console.log(this.pageNum, val);
      this.gettableData();
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.activeName = tab.name;
      this.gettableData();
    },
    industryChange(val) {

    },
    handleSelect(item) {
      console.log(item);
      this.seacherParams.moduleId = item.moduleId;
    },
    doseacher() {
      this.pageNum = 1;
      this.gettableData();
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
  watch: {
    'seacherParams.compName': function (val) {
      if (this.seacherParams.compName == '') {
        this.seacherParams.moduleId = '';
      }
    },
    activeName(val) {
      this.seacherParams = { ...this.seacherParamsBase };
    },
  },
  mounted() {
    const that = this;
    setTimeout(() => {
      const refTable = that.$refs.refTable;
      const tableTop = this.$refs.refTable.$el.getBoundingClientRect().top;
      const winHeight = window.innerHeight;
      this.tableHeight = winHeight - tableTop - 70;
    }, 200);
    this.$winResize.add(() => {
      clearTimeout(that.delay);
      that.delay = setTimeout(() => {
        const refTable = that.$refs.refTable;
        if (!refTable) {
          return;
        }
        const tableTop = that.$refs.refTable.$el.getBoundingClientRect().top;
        const winHeight = window.innerHeight;
        this.tableHeight = winHeight - tableTop - 70;
      }, 200);
    });
    this.getIndustry();
    this.gettableData();
  },
};
</script>
<style lang="less" scoped>
    #mycommentone{
         width: 100%;
         height: 100%;
          margin-top: 20px;
          background: #fff;
          padding: 10px;
          box-sizing: border-box;
          .flexboxwarp{
              display:-webkit-flex;
              display:flex;
          }
          .cardbox{
              border-bottom: 1px solid #eee;
              padding-bottom: 20px;
          }
          .cardItem{
            flex-direction: column ;
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