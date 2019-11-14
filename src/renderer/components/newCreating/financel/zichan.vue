<template>
  <el-table
    :data="assetIndex"
    :row-class-name="tableRowClassName"
    :height="Tableheight"
    style="width: 100%">
    <el-table-column
        prop="name"
        label=""
        width="280px;"
        fixed>
        <template slot-scope="scope">
          <div v-if="!((scope.row.name =='资产' || scope.row.name=='负债' || scope.row.name=='所有者权益') && scope.row.v0 ==null)">
            <span style="width:20px;display:inline-block;"></span> <span> {{scope.row.name}}</span>
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
        <el-popover trigger="hover" placement="top">
            <span>{{(scope.row['c'+item.prop.replace('v', '')] && scope.row['c'+item.prop.replace('v', '')]!=='WHITE')?scope.row['t'+item.prop.replace('v', '')]:'无对比'}}</span>
            <div  slot="reference" v-if="!(assetIndex[scope.$index].name =='资产' || assetIndex[scope.$index].name=='负债' || assetIndex[scope.$index].name=='所有者权益')">
            <!-- {{assetIndex[scope.$index][item.prop]==null|| assetIndex[scope.$index][item.prop]==0?'--':assetIndex[scope.$index][item.prop] | thousandSeparate}} -->
             <span v-if="item.prop=='v0'" :style="{'color':'#000','padding-right':'5px','box-sizing':'border-box','width':'100%','display': 'block','background':assetIndex[scope.$index].c0=='WHITE'?'':assetIndex[scope.$index].c0}">
              {{assetIndex[scope.$index][item.prop]==null|| assetIndex[scope.$index][item.prop]==0?'--':assetIndex[scope.$index][item.prop]  | thousandSeparate}}
            </span>
            <span v-if="item.prop=='v1'" :style="{'color':'#000','padding-right':'5px','box-sizing':'border-box','width':'100%','display': 'block','background':assetIndex[scope.$index].c1=='WHITE'?'':assetIndex[scope.$index].c1}">
              {{assetIndex[scope.$index][item.prop]==null|| assetIndex[scope.$index][item.prop]==0?'--':assetIndex[scope.$index][item.prop] | thousandSeparate}}
            </span>
             <span v-if="item.prop=='v2'" :style="{'color':'#000','padding-right':'5px','box-sizing':'border-box','width':'100%','display': 'block','background':assetIndex[scope.$index].c2=='WHITE'?'':assetIndex[scope.$index].c2}">
              {{assetIndex[scope.$index][item.prop]==null|| assetIndex[scope.$index][item.prop]==0?'--':assetIndex[scope.$index][item.prop] | thousandSeparate}}
            </span>
            <span v-if="item.prop=='v3'" :style="{'color':'#000','padding-right':'5px','box-sizing':'border-box','width':'100%','display': 'block','background':assetIndex[scope.$index].c3=='WHITE'?'':assetIndex[scope.$index].c3}">
              {{assetIndex[scope.$index][item.prop]==null|| assetIndex[scope.$index][item.prop]==0?'--':assetIndex[scope.$index][item.prop] | thousandSeparate}}
            </span>
          </div>
          <div v-else>
           {{assetIndex[scope.$index][item.prop]}}
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
    assetIndex() {
      return this.alltableData.assetIndex;
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
