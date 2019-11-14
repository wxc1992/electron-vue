<template>
   <el-dialog
    id="datingDio"
    title="主体详情"
    :visible.sync="showDioRating"
    :close-on-click-modal="false"
    :show-close="false"
    width="1000px"
    >
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        style="width: 100%">
        <el-table-column
            prop="compName"
            label="公司名">
        </el-table-column>
        <el-table-column
            prop="moduleName"
            label="行业">
        </el-table-column>
        <el-table-column
            prop="gradeLevel"
            label="评级">
        </el-table-column>
        <el-table-column
            prop="gradeScore"
            label="评分">
           <template slot-scope="scope">
             {{scope.row.gradeScore|reserve2Decimal(4)}}
           </template>
        </el-table-column>
        <el-table-column
            prop="addTime"
            label="添加时间">
            <template slot-scope="scope">
              {{scope.row.addTime |dateFormate}}
            </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="sendClose">关 闭</el-button>
        <el-button type="primary" @click="sendResult(0)" v-if="showButton">拒 绝</el-button>
        <el-button type="primary" @click="sendResult(1)" v-if="showButton">通 过</el-button>
      </div>
   </el-dialog>
</template>

<script>
import moment from 'moment';
export default {
  props: ['showDioRating', 'rowstatus'],
  filters: {
    dateFormate(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  data() {
    return {

    };
  },
  computed: {
    showButton() {
      console.log(this.rowstatus.subject);
      return this.rowstatus.approvalStatus === '0';
    },
    tableData() {
      return [this.rowstatus.subject];
    },
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'success-row';
      }
      return 'warning-row';

      return '';
    },
    sendClose() {
      this.activeName = '0';
      this.$emit('sendClose', false);
    },
    sendResult(val) {
      this.$emit('sendResult', [val, this.rowstatus]);
    },
    doapproval(type) {

    },
    handleClick(tab, event) {

    },
  },
};
</script>

<style>

</style>
