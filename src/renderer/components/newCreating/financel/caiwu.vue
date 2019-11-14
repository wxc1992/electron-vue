<template>
  <el-table
    :data="financialAnalysis"
    :row-class-name="tableRowClassName"
    :height="Tableheight"
    style="width: 100%">
    <el-table-column
        prop="name"
        label=""
        width="390"
        fixed>
        <template slot-scope="scope">
          <!-- <span style="width:60px;display:inline-block;" v-show="!((scope.row.name =='其他关注指标' ||scope.row.name =='成长能力' || scope.row.name=='营运能力' || scope.row.name =='资本结构' || scope.row.name=='盈利能力' || scope.row.name=='偿债能力') && scope.row.v0 ==null)"></span> <span> {{scope.row.name}}</span> -->
          <div v-if="!((scope.row.name =='其他关注指标' || scope.row.name=='成长能力' || scope.row.name=='营运能力' || scope.row.name=='资本结构' || scope.row.name=='盈利能力' || scope.row.name=='偿债能力') && scope.row.v0 ==null)">
              <span style="width:40px;display:inline-block;" ></span> <span> {{scope.row.name}}</span>
           </div>
          <div v-else>
            <h3 > {{scope.row.name}}</h3>
          </div>
        </template>
    </el-table-column>
    <el-table-column
     v-for="(item,index) in columns"
       v-if="index<=3"
      :prop="item.prop"
      :label="item.label"
      align="right"
      :key="item.prop"
      >
      <template slot-scope="scope">
          <!-- {{financialAnalysis[scope.$index][item.prop] | thousandSeparate}} -->
           <!-- <el-popover trigger="hover" placement="top">
            <span>{{ (scope.row['c'+item.prop.replace('v', '')] && scope.row['c'+item.prop.replace('v', '')]!=='WHITE')?scope.row['t'+item.prop.replace('v', '')]:'无对比'}}</span>
            <div  slot="reference"  v-if="!(financialAnalysis[scope.$index].name =='其他关注指标' || financialAnalysis[scope.$index].name=='成长能力'  || financialAnalysis[scope.$index].name=='营运能力'|| financialAnalysis[scope.$index].name=='偿债能力'|| financialAnalysis[scope.$index].name=='资本结构' || financialAnalysis[scope.$index].name=='盈利能力') ">
              <span v-if="item.prop=='v0'" :style="{'color':financialAnalysis[scope.$index].c0=='WHITE'?'':financialAnalysis[scope.$index].c0}">
                {{financialAnalysis[scope.$index][item.prop]==null|| financialAnalysis[scope.$index][item.prop]==0?'--':financialAnalysis[scope.$index][item.prop]  | thousandSeparate}}
              </span>
              <span v-if="item.prop=='v1'" :style="{'color':financialAnalysis[scope.$index].c1=='WHITE'?'':financialAnalysis[scope.$index].c1}">
                {{financialAnalysis[scope.$index][item.prop]==null|| financialAnalysis[scope.$index][item.prop]==0?'--':financialAnalysis[scope.$index][item.prop] | thousandSeparate}}
              </span>
              <span v-if="item.prop=='v2'" :style="{'color':financialAnalysis[scope.$index].c2=='WHITE'?'':financialAnalysis[scope.$index].c2}">
                {{financialAnalysis[scope.$index][item.prop]==null|| financialAnalysis[scope.$index][item.prop]==0?'--':financialAnalysis[scope.$index][item.prop] | thousandSeparate}}
              </span>
              <span v-if="item.prop=='v3'" :style="{'color':financialAnalysis[scope.$index].c3=='WHITE'?'':financialAnalysis[scope.$index].c3}">
                {{financialAnalysis[scope.$index][item.prop]==null|| financialAnalysis[scope.$index][item.prop]==0?'--':financialAnalysis[scope.$index][item.prop] | thousandSeparate}}
              </span>
          </div>
          <div v-else>
              {{financialAnalysis[scope.$index][item.prop]}}
          </div>
          </el-popover> -->
          <div  v-if="!(financialAnalysis[scope.$index].name =='其他关注指标' || financialAnalysis[scope.$index].name=='成长能力'  || financialAnalysis[scope.$index].name=='营运能力'|| financialAnalysis[scope.$index].name=='偿债能力'|| financialAnalysis[scope.$index].name=='资本结构' || financialAnalysis[scope.$index].name=='盈利能力') ">
              <span v-if="item.prop=='v0'" :style="{'color':financialAnalysis[scope.$index].c0=='WHITE'?'':financialAnalysis[scope.$index].c0}">
                {{financialAnalysis[scope.$index][item.prop]==null|| financialAnalysis[scope.$index][item.prop]==0?'--':financialAnalysis[scope.$index][item.prop]  | thousandSeparate}}
              </span>
              <span v-if="item.prop=='v1'" :style="{'color':financialAnalysis[scope.$index].c1=='WHITE'?'':financialAnalysis[scope.$index].c1}">
                {{financialAnalysis[scope.$index][item.prop]==null|| financialAnalysis[scope.$index][item.prop]==0?'--':financialAnalysis[scope.$index][item.prop] | thousandSeparate}}
              </span>
              <span v-if="item.prop=='v2'" :style="{'color':financialAnalysis[scope.$index].c2=='WHITE'?'':financialAnalysis[scope.$index].c2}">
                {{financialAnalysis[scope.$index][item.prop]==null|| financialAnalysis[scope.$index][item.prop]==0?'--':financialAnalysis[scope.$index][item.prop] | thousandSeparate}}
              </span>
              <span v-if="item.prop=='v3'" :style="{'color':financialAnalysis[scope.$index].c3=='WHITE'?'':financialAnalysis[scope.$index].c3}">
                {{financialAnalysis[scope.$index][item.prop]==null|| financialAnalysis[scope.$index][item.prop]==0?'--':financialAnalysis[scope.$index][item.prop] | thousandSeparate}}
              </span>
          </div>
          <div v-else>
              {{financialAnalysis[scope.$index][item.prop]}}
          </div>
      </template>
    </el-table-column>
    <el-table-column
        prop=""
        label=""
        width="50px"
        >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['alltableData', 'Tableheight'],
  computed: {
    financialAnalysis() {
      return this.alltableData.financialAnalysis;
    },
    columns() {
      const arr = [];
      for (const i in this.alltableData.title) {
        arr.push({ prop: i, label: this.alltableData.title[i] });
      }
      return arr;
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
  },
};
</script>

<style>

</style>
