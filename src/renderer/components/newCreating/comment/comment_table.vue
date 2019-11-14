<template>
  <el-card class="box-card" :style="{'height':cardHeight+ 'px'}">
        <el-table
        :row-class-name="tableRowClassName"
        :data="expandCals"
         v-loading="loading"
          @sort-change="sortColumn"
        :height="cardHeight-80"
        style="width: 100%">
        <el-table-column
          type="index"
          label="+"
          fixed
          width="50">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed
          align="center"
          width="120">
          <template slot-scope="scope">
            <el-button size="mini" plain @click="addComment(scope.row,1)" v-if="levelStatus === ''">新增</el-button>
           <el-button size="mini" plain @click="addComment(scope.row,2)" v-if="levelStatus === '2'">待审核详情</el-button>
            <el-button size="mini" plain @click="addComment(scope.row,3)" v-if="levelStatus === '3'">已审核详情</el-button>
             <el-button size="mini" plain @click="addComment(scope.row,4)" v-if="levelStatus === '4'">已驳回详情</el-button>
          </template>
        </el-table-column>
       <el-table-column v-for="column in activtyColumns" :prop="column.fieldCode" :key="column.fieldCode" :class="column.fieldCode" :label="column.fieldName" :min-width="column.width ||240" :sortable="column.sortable" :fixed="column.fixed" :formatter="applyFormat">
            <template slot-scope="scope">
                <span class="trip-value" :title="scope.row[column.fieldCode]">{{scope.row[column.fieldCode]|reserve2Decimal|thousandSeparate}}</span>
            </template>
      </el-table-column>
      </el-table>
      <el-pagination
         style="margin-top:10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30,60, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
const bus = new Vue();
export default {
  props: ['cardHeight'],
  data() {
    return {
      tableData: [],
      levelStatus: '',
      pageSize: 20,
      currentPage: 1,
      loading: false,
      total: 0,
      fixedColumns: [],
      activtyColumns: [],
      sortparams: {},
      sortableExclude: ['compName', 's_majority_shareholder'],
      fixedColumns: [{
        fieldCode: 'compName',
        fieldName: '主体名',
        fixed: 'left',
        width: 275,
      },
      {
        fieldCode: 'gradeLevel',
        fieldName: 'MARS评级',
        sortable: 'custom',
        width: 120,
      },
      ],
    };
  },
  computed: {
    ...mapGetters(['getNewCreditingS', 'getNewoutputContent']),
    expandCals() {
      return this.tableData.map((curValue, index) => {
        const cals = curValue.cals || [];
        for (const cal of cals) {
          if (cal.fieldCode && cal.tradeType == '2') {
            curValue[cal.fieldCode] = cal.calValue || '';
          }
        }
        console.log('curValue', curValue);
        return curValue;
      });
    },
  },
  mounted() {
    const path = this.$route.path;
    console.log('this.$route.name@@@@@@@@@@@@@', path);
    if (path === '/newSSG/comment/0') {
      this.levelStatus = '';
    }
    if (path === '/newSSG/comment/1') {
      this.levelStatus = '2';
    }
    if (path === '/newSSG/comment/2') {
      this.levelStatus = '3';
    }
    if (path === '/newSSG/comment/3') {
      this.levelStatus = '4';
    }
    console.log(' thislevelStatus', this.levelStatus);
    this.getMainData({});
  },
  watch: {
    getNewCreditingS(obj) {
      this.currentPage = 1;
      console.log(obj);
      if (obj.moduleId) {
        this.getMainData({});
      }
    },
    'getNewoutputContent.outputVisible': function () {
      console.log('getNewoutputContent.outputVisible', this.getNewoutputContent.outputVisible);
      if (!this.getNewoutputContent.outputVisible && this.getNewoutputContent.updateShow) {
        this.getMainData({});
      }
    },
    $route(val) {
      const data = this.getNewoutputContent;
      data.updateShow = false;
      this.setNewoutputContent(data);
      this.currentPage = 1;
      const path = val.path;
      console.log('this.$route.name', val);
      if (path === '/newSSG/comment/0') {
        this.levelStatus = '';
      }
      if (path === '/newSSG/comment/1') {
        this.levelStatus = '2';
      }
      if (path === '/newSSG/comment/2') {
        this.levelStatus = '3';
      }
      if (path === '/newSSG/comment/3') {
        this.levelStatus = '4';
      }
      console.log(' thislevelStatus', this.levelStatus);
      this.getMainData({});
    },
  },
  methods: {
    ...mapActions(['getmodCreditSubjectNewcomment', 'getMainColumnNew', 'getHistoryComment', 'getMainInfo']),
    ...mapMutations(['setNewoutputContent']),
    sortColumn(column) {
      this.loading = true;
      console.log('colname:', column);
      const order = column.order;
      const sortParam = { ...this.baseParam };
      if (order) {
        let prop = column.prop;
        if (prop === 'isWhite') {
          prop = 'is_white';
        }
        if (prop === 'gradeLevel') {
          prop = 'grade_level';
        }
        sortParam.sort = prop;
        sortParam.sortValue = column.order.slice(0, -6);
      }
      this.sortparams = { ...sortParam };
      let params = {};
      if (this.getNewCreditingS.moduleId) {
        params = {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          levelStatus: this.levelStatus,
          tradeType: 2,
          ...this.getNewCreditingS,
          ...sortParam,
        };
      } else {
        params = {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          levelStatus: this.levelStatus,
          tradeType: 2,
          moduleId: this.getNewCreditingS.moduleId || 5053,
          ...sortParam,
        };
      }
      // let params = {
      //   moduleId : this.moduleId,
      //   pageSize: this.pageSize,
      //   pageNum: this.currentPage,
      //   ...sortParam
      // }
      this.getmodCreditSubjectNewcomment(params).then((res) => {
        console.log('getmodCreditSubjectNewcomment', res);
        if (res.status === 200 && res.data.status === '0000') {
          const arr = Object.keys(res.data.data);
          if (arr.length !== 0) {
            this.tableData = res.data.data.rows;
            this.total = res.data.data.total || 0;
            this.loading = false;
          } else {
            this.tableData = [];
            this.total = 0;
            this.loading = false;
          }
        } else {
          this.tableData = [];
          this.total = 0;
          this.loading = false;
        }
      });
    },
    async addComment(row, type) {
      console.log(row);

      const params = {
        moduleId: row.moduleId,
        compName: row.compName,
      };

      let ItemData = [];
      let needOperate = null;
      let baseInfo = {};
      const res = await this.getHistoryComment(params);
      console.log('getHistoryComment@@@@@@@@@@@@@@@@@@@@@@@', res);
      if (res.status === 200 && res.data.status === '0000') {
        ItemData = res.data.data;
      } else {
        ItemData = [];
      }
      bus.$emit('sendData', ItemData);
      if (type === 1) {
        needOperate = true;
      } else {
        needOperate = false;
      }
      const res2 = await this.getMainInfo({ compName: row.compName, type: row.moduleName });
      console.log('showDetail', res2);
      if (res2.status === 200 && res2.data.status === '0000') {
        baseInfo = res2.data.data;
        // console.log('this.tableDatadio',this.tableDatadio)
      } else {
        this.$message.error('详情获取失败');
        baseInfo = {};
      }
      const data = this.getNewoutputContent;
      data.outputVisible = true;
      data.rowdata = row;
      data.ItemData = ItemData;
      data.baseInfo = baseInfo;
      data.needOperate = needOperate;
      this.setNewoutputContent(data);
      console.log(data);
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      this.getMainData({ ...this.sortparams, ...this.getNewCreditingS });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.current, val);
      this.getMainData({ ...this.sortparams, ...this.getNewCreditingS });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return 'warning-row';

      return '';
    },
    getColumn() {
      const params = {
        isShow: 1,
        moduleId: this.getNewCreditingS.moduleId || 5053,
        weight: -1,
        type: 2,
        pageNum: 1,
      };
      this.getMainColumnNew(params).then((res) => {
        console.log('getMainColumnNew', res);
        if (res.status === 200 && res.data.status === '0000') {
          const columns = res.data.data.map((col) => {
            col.sortable = this.sortableExclude.indexOf(col.fieldCode) < 0 ? 'custom' : false;
            if (col.fieldName !== '主营业务') {
              // col.width = Math.max(col.fieldName.length,4) * 17 + 24;
              // col.width = widthMap[col.fieldCode];
              if (!col.width) {
                col.width = Math.max(col.fieldName.length, 4) * 17 + 50;
              }
            }
            return col;
          });
          this.activtyColumns = [...this.fixedColumns, ...columns];
        }
      });
    },
    applyFormat(row, column, cellValue) {
      const formatHandler = generateFormateHandler('credit-rating', column.property);
      return formatHandler(cellValue);
    },
    getMainData(othetparms) {
      this.loading = true;
      this.getColumn();
      let params = {};
      if (this.getNewCreditingS.moduleId) {
        params = {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          levelStatus: this.levelStatus,
          ...this.getNewCreditingS,
          tradeType: 2,
          ...othetparms,
        };
      } else {
        params = {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          levelStatus: this.levelStatus,
          tradeType: 2,
          moduleId: this.getNewCreditingS.moduleId || 5053,
          ...othetparms,
        };
      }

      this.getmodCreditSubjectNewcomment(params).then((res) => {
        console.log('getmodCreditSubjectNewcomment', res);
        if (res.status === 200 && res.data.status === '0000') {
          const arr = Object.keys(res.data.data);
          if (arr.length !== 0) {
            this.tableData = res.data.data.rows;
            this.total = res.data.data.total || 0;
            this.loading = false;
          } else {
            this.tableData = [];
            this.total = 0;
            this.loading = false;
          }
        } else {
          this.tableData = [];
          this.total = 0;
          this.loading = false;
        }
      });
    },
  },
  created() {

  },
};
</script>

<style>

</style>
