<template>
  <el-dialog
    id="sheetDio"
    title="主体详情"
    :visible.sync="showDio"
    :close-on-click-modal="false"
    :show-close="false"
    width="1000px"
    >
     <div style="width: 100%;">
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="资产负债指标" name="0">
          <el-table
          :data="alltableData.assetIndex"
          :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column
              prop="name"
              label=""
              fixed>
          </el-table-column>
          <el-table-column
            v-for="item in columns"
            :prop="item.prop"
            :label="item.label"
            align="right"
            :key="item.prop"
            >
            <template slot-scope="scope">
                {{alltableData.assetIndex[scope.$index][item.prop] | thousandSeparate}}
            </template>
          </el-table-column>
        </el-table>
        </el-tab-pane>
        <el-tab-pane label="利润指标" name="1">
          <el-table
            :data="alltableData.profitIndex"
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column
              prop="name"
              label=""
              fixed>
            </el-table-column>
            <el-table-column
              v-for="item in columns"
              :prop="item.prop"
              :label="item.label"
              :key="item.prop"
               align="right"
              >
              <template slot-scope="scope">
                {{alltableData.profitIndex[scope.$index][item.prop] | thousandSeparate}}
            </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="现金流量指标" name="2">
          <el-table
            :data="alltableData.cashFlow"
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column
              prop="name"
              label=""
              fixed>
            </el-table-column>
            <el-table-column
              v-for="item in columns"
              :prop="item.prop"
              :label="item.label"
              :key="item.prop"
               align="right"
              >
              <template slot-scope="scope">
                {{alltableData.cashFlow[scope.$index][item.prop] | thousandSeparate}}
            </template>
            </el-table-column>
           </el-table>
        </el-tab-pane>
        <el-tab-pane label=" 财务分析指标" name="3">
           <el-table
            :data="alltableData.financialAnalysis"
            :row-class-name="tableRowClassName"
            style="width: 100%">
            <el-table-column
              prop="name"
              fixed
              label="">
            </el-table-column>
            <el-table-column
              v-for="item in columns"
              :prop="item.prop"
              :label="item.label"
              :key="item.prop"
               align="right"
              >
              <template slot-scope="scope">
                {{alltableData.financialAnalysis[scope.$index][item.prop] | thousandSeparate}}
              </template>
            </el-table-column>
           </el-table>
        </el-tab-pane>
      </el-tabs>
     </div>
     <div>

     </div>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button @click="sendClose">关 闭</el-button>
      <el-button type="primary" @click="sendResult(0)" v-if="showButton">拒 绝</el-button>
      <el-button type="primary" @click="sendResult(1)" v-if="showButton">通 过</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['showDio', 'rowstatus', 'dialogdata'],
  data() {
    return {
      activeName: '0',
      assetIndextable: [],
      profitIndextable: [],
      cashFlowtable: [],
      financialAnalysistable: [],
    };
  },
  computed: {
    showButton() {
      return this.rowstatus.approvalStatus === '0';
    },
    alltableData() {
      return this.dialogdata;
    },
    columns() {
      const arr = [];
      for (const i in this.dialogdata.title) {
        arr.push({ prop: i, label: this.dialogdata.title[i] });
      }
      return arr;
    },
  },
  methods: {
    ...mapActions(['approvalSubject']),
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
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'success-row';
      }
      return 'warning-row';

      return '';
    },

  },

};
</script>

<style>

</style>
