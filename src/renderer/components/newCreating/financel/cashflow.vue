<template>
  <el-table
    :data="cashFlow"
    :row-class-name="tableRowClassName"
    :height="Tableheight"
    style="width: 100%">
    <el-table-column
        prop="name"
        label=""
        width="420"
        fixed>
         <template slot-scope="scope">
          <div v-if="!((scope.row.name=='经营活动产生的现金流量' || scope.row.name=='投资活动产生的现金流量' || scope.row.name=='筹资活动产生的现金流量') && scope.row.v0 ==null)">
              <span style="width:60px;display:inline-block;" ></span> <span> {{scope.row.name}}</span>
           </div>
          <div v-else>
            <h3 > {{scope.row.name}}</h3>
          </div>
        </template>
    </el-table-column>
    <el-table-column
      :prop="item.prop"
      v-for="(item,index) in columns"
       v-if="index<=3"
      :label="item.label"
      align="right"
      :key="item.prop"
      >
      <template slot-scope="scope">
         <el-popover trigger="hover" placement="top">
          <span>{{(scope.row['c'+item.prop.replace('v', '')] && scope.row['c'+item.prop.replace('v', '')]!=='WHITE')?scope.row['t'+item.prop.replace('v', '')]:'无对比'}}</span>
           <div  slot="reference"  v-if="!(cashFlow[scope.$index].name =='经营活动产生的现金流量' || cashFlow[scope.$index].name =='投资活动产生的现金流量' || cashFlow[scope.$index].name=='筹资活动产生的现金流量') ">

             <span v-if="item.prop=='v0'" :style="{'color':'#000','padding-right':'5px','box-sizing':'border-box','width':'100%','display': 'block','background':cashFlow[scope.$index].c0=='WHITE'?'':cashFlow[scope.$index].c0}">
              {{cashFlow[scope.$index][item.prop]==null|| cashFlow[scope.$index][item.prop]==0?'--':cashFlow[scope.$index][item.prop]  | thousandSeparate}}
            </span>
            <span v-if="item.prop=='v1'" :style="{'color':'#000','padding-right':'5px','box-sizing':'border-box','width':'100%','display': 'block','background':cashFlow[scope.$index].c1=='WHITE'?'':cashFlow[scope.$index].c1}">
              {{cashFlow[scope.$index][item.prop]==null|| cashFlow[scope.$index][item.prop]==0?'--':cashFlow[scope.$index][item.prop] | thousandSeparate}}
            </span>
             <span v-if="item.prop=='v2'" :style="{'color':'#000','padding-right':'5px','box-sizing':'border-box','width':'100%','display': 'block','background':cashFlow[scope.$index].c2=='WHITE'?'':cashFlow[scope.$index].c2}">
              {{cashFlow[scope.$index][item.prop]==null|| cashFlow[scope.$index][item.prop]==0?'--':cashFlow[scope.$index][item.prop] | thousandSeparate}}
            </span>
            <span v-if="item.prop=='v3'" :style="{'color':'#000','padding-right':'5px','box-sizing':'border-box','width':'100%','display': 'block','background':cashFlow[scope.$index].c3=='WHITE'?'':cashFlow[scope.$index].c3}">
              {{cashFlow[scope.$index][item.prop]==null|| cashFlow[scope.$index][item.prop]==0?'--':cashFlow[scope.$index][item.prop] | thousandSeparate}}
            </span>
         </div>
         <div v-else>
           {{cashFlow[scope.$index][item.prop]}}
         </div>
        </el-popover>
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
    cashFlow() {
      return this.alltableData.cashFlow;
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
