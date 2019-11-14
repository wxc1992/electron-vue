<template>
  <div id="subjectUp">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="300px">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="approvalInfo">
        </el-input>

        <div slot="footer" class="dialog-footer" style="text-align: center">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="rejectPass(multipleSelection)">确 定</el-button>
        </div>
      </el-dialog>
      <sheetDio :showDio="showDio" @sendClose="sendClose" :rowstatus="rowstatus" :dialogdata="dialogdata" @sendResult="sendResult"></sheetDio>
      <div class="clearfix">
          <div class="timeinput fl">
            <span class="title">开始时间</span>
            <el-date-picker
              :editable="false"
              style="width:150px"
              v-model="updateparams.startDate"
              :picker-options="pickerOptionsStart"
              size="mini"
              type="date"
              value-format="timestamp"
              format="yyyy-MM-dd"
              placeholder="选择开始日期"
              @change="changeEnd"/>
          </div>
          <div class="fl">
            <span class="title">结束时间</span>
              <el-date-picker
                :editable="false"
                style="width:150px"
                v-model="updateparams.endDate"
                :picker-options="pickerOptionsEnd"
                size="mini"
                type="date"
                value-format="timestamp"
                format="yyyy-MM-dd"
                placeholder="选择结束日期"
                @change="changeStart"/>
          </div>
          <div class="fl">
            <span class="title">更新方式</span>
            <el-select v-model="updateparams.updateType" clearable placeholder="请选择更新方式"  style="width:150px">
              <el-option
                v-for="item in updateTypelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
           <div class="fl">
            <span class="title">警告标志</span>
            <el-select v-model="updateparams.warnFlag" clearable placeholder="请选择警告标志"  style="width:150px">
              <el-option
                v-for="item in warnFlaglist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="fl">
            <span class="title">报告期</span>
            <el-date-picker
              style="width:150px"
              v-model="updateparams.date"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择报告期">
            </el-date-picker>
          </div>
          <div>
            <div class="fl" style="clear:both;margin-top:10px">
              <span class="title">行业</span>
              <el-select v-model="updatetype.type" clearable placeholder="请选择行业"  style="width:150px" @change="typeChange">
                <el-option
                  v-for="item in industryList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id+'/'+item.name">
                </el-option>
              </el-select>
            </div>
            <div class="fl"  style="margin-top:10px">
              <span class="title">子行业</span>
              <el-select v-model="updatetype.secondType" clearable placeholder="请选择子行业"  style="width:150px"  @change="childtypeChange">
                <el-option
                  v-for="item in childIndustryList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div class="fl"  style="margin-top:10px;width:300px">
              <span class="title">主体公司</span>
              <el-autocomplete
                style="width:220px"
                v-model="updateparams.compName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                clearable
                @select="handleSelect"
              ></el-autocomplete>
            </div>
          </div>
      </div>
      <div style="margin-top: 10px;margin-bottom: 10px">
        <el-button size="small" type="primary" @click="doseacher(0)">待审核查询</el-button>
        <el-button size="small" type="primary" @click="doseacher(1)">已审核查询</el-button>
        <el-button size="small" type="primary" @click="doapproval(1,multipleSelection)">通过</el-button>
        <el-button size="small" type="primary" @click="doapproval(0,multipleSelection)">拒绝</el-button>
      </div>
       <!-- <div style="margin-bottom: 10px">

      </div> -->
    <div :style="{height:tableHeight+50+'px' }">
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :height="tableHeight"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          :selectable="selectable"
          width="55">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          fixed
          width="150"
          label="更新时间">
          <template slot-scope="scope">
            {{scope.row.updateDate |dateFormate}}
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="date"
          label="更新类型"
          width="180">
        </el-table-column> -->
        <el-table-column
          prop="updateType"
          label="更新方式">
          <template slot-scope="scope">
            {{scope.row.updateType==1?'年报更新':'季报更新'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="reportDate"
           width="100"
          label="报告期">
        </el-table-column>
        <el-table-column
          prop="type"
          label="行业">
        </el-table-column>
        <el-table-column
          prop="secondType"
          label="子行业">
        </el-table-column>
         <el-table-column
          prop="secondType"
          label="债券代码">
        </el-table-column>
        <el-table-column
          prop="compName"
          width="200px"
          label="主体">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="操作员">
        </el-table-column>
        <el-table-column
          prop="approvalStatus"
          label="审核状态">
         <template slot-scope="scope">
           {{scope.row.approvalStatus==1?'已审核':'待审核'}}
         </template>
        </el-table-column>
        <el-table-column
          prop="warnFlag"
          label="警告标志">
        </el-table-column>
        <el-table-column
          prop="exceptionInfo"
          label="异常信息">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <a href="javascript:;" style="text-decoration: none;color: #409EFF" @click="showSheetDio(scope.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
       style="margin-top:10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30,60, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import sheetDio from './fivesheet.vue';
const maps = {
  5034: '城投',
  5035: '钢铁',
  5036: '有色',
  5053: '地产',
  6001: '化工',
  6002: '煤炭',
  6003: '电力',
  6004: '轻工',
  6005: '建工',
  6006: '多元金融',
};
export default {
  components: {
    sheetDio,
  },
  data() {
    return {
      // 限制开始时间
      pickerOptionsStart: {},
      pickerOptionsEnd: {},
      // startDate: '', // 预算开始时间
      // endDate: '', // 预算结束时间
      pageSize: 10,
      currentPage: 1,
      tableHeight: 0,
      loading: false,
      dialogVisible: false,
      total: 0,
      updateparams: {
        updateType: '',
        startDate: '',
        endDate: '',
        date: '',
        compName: '',
        warnFlag: '',
      },
      warnFlaglist: [
        { value: '重要指标大幅下滑', label: '重要指标大幅下滑' },
        { value: '季报更新不及时', label: '季报更新不及时' },
        { value: '年报更新不及时', label: '年报更新不及时' },
      ],
      updatetype: {
        type: '',
        secondType: '',
      },
      updateTypelist: [
        { value: 0, label: '季报更新' },
        { value: 1, label: '年报更新' },
      ],
      industryList: [],
      childIndustryList: [],
      tableData: [],
      loading: false,
      tableHeight: 0,
      approvalStatus: null,
      multipleSelection: [],
      approvalInfo: '',
      showDio: false,
      rowstatus: {},
      dialogdata: {},
    };
  },
  filters: {
    dateFormate(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  mounted() {
    this.getLoglist();
    this.getIndustry();
    const that = this;
    setTimeout(() => {
      const multipleTable = that.$refs.multipleTable;
      if (!multipleTable) {
        return;
      }
      const tableTop = this.$refs.multipleTable.$el.getBoundingClientRect().top;
      const winHeight = window.innerHeight;
      this.tableHeight = window.innerHeight - 371;
    }, 200);
    this.$winResize.add(() => {
      clearTimeout(that.delay);
      that.delay = setTimeout(() => {
        const multipleTable = that.$refs.multipleTable;
        if (!multipleTable) {
          return;
        }
        const tableTop = that.$refs.multipleTable.$el.getBoundingClientRect().top;
        const winHeight = window.innerHeight;
        this.tableHeight = window.innerHeight - 371;
      }, 200);
    });
  },
  methods: {
    ...mapActions(['getDeepSubject', 'getFiltersNew', 'getmodCreditSubject', 'getdsmsLoglist', 'approvalSubject', 'getFivesheetData']),
    selectable(row, index) {
      // console.log(row)
      if (row.approvalStatus === '0') {
        return true;
      }
      return false;
    },
    showSheetDio(row) {
      console.log(row);
      if (row.approvalStatus == '0') {
        if (row) {
          this.$nextTick(() => {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          });
        }
      }
      const params = {
        compName: row.compName,
        type: row.type,
      };
      this.getFivesheetData(params).then((res) => {
        console.log(res);
        if (res.status === 200) {
          const columns = [];
          this.dialogdata = res.data || {};
        }
      });
      this.rowstatus = row;
      this.showDio = true;
    },
    sendClose(val) {
      this.showDio = val;
    },
    sendResult(obj) {
      console.log('sendResult', obj);
      const type = obj[0];
      const arr = [obj[1]];
      this.doapproval(+type, arr, () => {
        this.showDio = false;
        this.dialogVisible = false;
      });
    },
    doseacher(type) {
      console.log(type);
      this.approvalStatus = +type;
      this.currentPage = 1;
      this.getLoglist();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async rejectPass(arr) {
      const ids = [];
      if (this.approvalInfo == '') {
        this.$message.warning('请填写原因');
        return;
      }
      arr.forEach((item) => {
        ids.push(item.id);
      });
      const params = {
        approval: 0,
        approvalInfo: this.approvalInfo,
        ids,
      };
      const res = await this.approvalSubject(params);
      console.log('approvalSubject', res);
      if (res.status === 200) {
        this.$message.success('更新成功');
        this.dialogVisible = false;
        this.currentPage = 1;
        this.getLoglist();
      } else {
        this.$message.error('处理失败');
      }
    },
    async doapproval(type, arr, fn) {
      const ids = [];
      if (arr.length === 0) {
        this.$message.warning('请选择数据');
        return;
      }
      arr.forEach((item) => {
        ids.push(item.id);
      });
      let params = {};
      if (type === 0) {
        this.$confirm('是否填写意见?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.dialogVisible = true;
        }).catch(async () => {
          params = {
            approval: 0,
            approvalInfo: null,
            ids,
          };
          const res = await this.approvalSubject(params);
          console.log('approvalSubject', res);
          if (res.status === 200) {
            debugger;
            this.$message.success('更新成功');
            this.dialogVisible = false;
            this.currentPage = 1;
            this.getLoglist();
          } else {
            this.$message.error('处理失败');
          }
        });
      } else {
        params = {
          approval: 1,
          approvalInfo: null,
          ids,
        };
        const res = await this.approvalSubject(params);
        console.log('approvalSubject', res);
        if (res.status === 200) {
          this.$message.success('更新成功');
          this.currentPage = 1;
          this.getLoglist();
        } else {
          this.$message.error('处理失败');
        }
      }
      fn();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      this.getLoglist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.current, val);
      this.getLoglist();
    },
    async getLoglist() {
      this.loading = true;
      let type = this.updatetype.type;
      if (type !== '') {
        type = type.split('/')[1];
      } else {
        type = '';
      }
      const params = {
        ...this.updateparams,
        type,
        secondType: this.updatetype.secondType,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        approvalStatus: this.approvalStatus,
      };
      const res = await this.getdsmsLoglist(params);
      console.log('loaddingLog', res);
      if (res.status === 200) {
        if (res.data.list.length > 0) {
          res.data.list.forEach((item) => {
            item.approval === '1' ? item.isChecked = true : item.isChecked = false;
          });
          this.tableData = res.data.list;
          this.total = res.data.total;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        } else {
          this.loading = false;
          this.tableData = [];
          this.total = 0;
        }
      } else {
        this.tableData = [];
        this.total = 0;
        this.$message.error('获取数据失败');
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    async getIndustry() {
      const params = {

      };
      try {
        const res = await this.getDeepSubject(params);
        console.log('dataUpdate', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.industryList = res.data.data;
        }
      } catch (error) {
        console.log('dataUpdate', error);
      }
    },
    typeChange(val) {
      console.log('typeChange', val);
      const id = val.split('/')[0];
      const params = {
        parentId: id,
      };
      this.getFiltersNew(params).then((res) => {
        console.log('getDeepSubject', res);
        if (res.status === 200 && res.data.status === '0000') {
          if (!typeof res.data.data == 'array') {
            this.childIndustryList = [];
            this.updatetype.secondType = '';
          } else {
            this.childIndustryList = res.data.data;
            this.updatetype.secondType = '';
          }
        }
      });
    },
    async querySearchAsync(queryString, callback) {
      const param = {
        name: queryString,
      };
      const res = await this.getmodCreditSubject(param);
      console.log(res);
      let list = [];
      list = res.data.data;
      callback(list);
    },
    childtypeChange(val) {
      console.log('childtypeChange', val);
    },
    handleSelect(item) {
      console.log(item);
      const name = maps[item.moduleId];
      this.updatetype.type = `${item.moduleId}/${name}`;
      this.typeChange(this.updatetype.type);
    },
    changeStart() {
      if (!this.updateparams.endDate) {
        this.pickerOptionsStart = {
          disabledDate: {},
        };
        return;
      }
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        // 可通过箭头函数的方式访问到this
        disabledDate: (time) => {
          let times = '';
          times = time.getTime() > this.updateparams.endDate;
          return times;
        },
      });
    },
    // 开始时间 控制结束时间
    changeEnd() {
      if (!this.updateparams.startDate) {
        this.pickerOptionsEnd = {
          disabledDate: {},
        };
        return;
      }
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: time => time.getTime() < this.updateparams.startDate,
      });
    },
  },

};
</script>

<style lang="less" scoped>
  #subjectUp{
    .title{
      font-size: 13px;
      color: #606060;
      width: 60px;
      display: inline-block;
      text-align: right;
      margin-right:2px;
    }

    .fl{
      width: 230px;
      margin-left: 0;
    }
  }
</style>
