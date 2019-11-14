<template>
<div>
<el-table
    :data="data"
    border
    ref="treeTable"
    style="width:100%"
    class="treetable"
    height='400'
    v-loading="loading"
    element-loading-text="拼命加载中"
    :row-style="showTr"
    :toggleRowExpansion="setClassName">
    <el-table-column v-for="(column, index) in columns" :key="index"
      :width="column.width"
      :min-width="column.minwidth"
      :label="column.text"
      :align="column.align"
      :fixed="column.fixed"
      >
      <template slot-scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="levelIndex"></span>
        <button class="el-button el-button--primary is-circle el-button--mini" style="width:16px;height:16px;border-radius: 50%;position: relative" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i style="position: absolute;left:50%;margin-left: -6px;top:50%;margin-top:-6px;font-style:normal;width:12px;height:12px;border-radius: 50%;text-align: center;line-height:12px;font-size:14px;" v-if="!scope.row._expanded"  aria-hidden="true">+</i>
          <i style="position: absolute;left:50%;margin-left: -6px;top:50%;margin-top:-6px;font-style:normal;width:12px;height:12px;border-radius: 50%;text-align: center;line-height:10px;font-size:16px;" v-if="scope.row._expanded" aria-hidden="true">-</i>
        </button>
        <span v-if="index===0" class="ms-tree-space label"></span>
        {{scope.row[column.dataIndex]==null?'--':scope.row[column.dataIndex] | thousandSeparate(column.flag||false)}}
        <!-- scope.row[column.dataIndex]==0?'--': -->
      </template>
    </el-table-column>
    <el-table-column label="操作" v-if="caozuo" width="100">
      <template slot-scope="scope">
        <!-- <button type="button" class="el-button el-button--default el-button--small">
          <router-link
            :to="{ path: requestUrl + 'edit', query: {id: scope.row.Oid} }"
            tag="span">
            查看描述
          </router-link>
        </button> -->
        <button type="button" class="el-button el-button--default el-button--small" @click="sendID(scope.row,true)">
            查看描述
        </button>
        <!-- <el-button
          size="small"
          type="danger"
          @click="handleDelete()">
          删除
        </el-button> -->
        <!-- <button type="button" class="el-button el-button--success el-button--small">
          <router-link :to="{ path: requestUrl, query: {parentId: scope.row.parentOId} }"
                       tag="span">
            添加下级树结构
          </router-link>
        </button> -->
      </template>
    </el-table-column>
  </el-table>
</div>

</template>
<script>
  import Utils from '../utils/index.js';
//  import Vue from 'vue'
  export default {
    name: 'tree-grid',
    props: {
      showHeight: {
        type: String,
        default() {
          return '100%';
        },
      },
      // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default() {
          return false;
        },
      },
      // 这是相应的字段展示
      columns: {
        type: Array,
        default() {
          return [];
        },
      },
      // 这是数据源
      dataSource: {
        type: Array,
        default() {
          return [];
        },
      },
      // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
      requestUrl: {
        type: String,
        default() {
          return '';
        },
      },
      // 这个是是否展示操作列
      treeType: {
        type: String,
        default() {
          return 'normal';
        },
      },
      // 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default() {
          return false;
        },
      },
      caozuo: {
        type: Boolean,
        default() {
          return false;
        },
      },
      loading: {
        type: Boolean,
        default() {
          return false;
        },
      },
      showCaozuo: {
        type: Boolean,
        default() {
          return false;
        },
      },
    },
    data() {
      return {
        tableHeight: 0,
      };
    },
    mounted() {
      //  console.log('this.tableHeight',this.tableHeight)
      // this.tableHeight = window.innerHeight - this.$refs.treeTable.$el.getBoundingClientRect().top-20;
      // console.log('this.$refs.treeTable.$el.offsetTop',this.$refs.treeTable.$el.getBoundingClientRect().top)
      //  console.log('this.$refs.treeTable.$el.offsetTop',window.innerHeight-this.$refs.treeTable.$el.offsetTop)
      //  console.log('this.tableHeight',this.tableHeight)
      const that = this;
      const tabtop = this.$refs.treeTable.$el.getBoundingClientRect().top;
      setTimeout(() => {
        that.tableHeight = window.innerHeight - tabtop - 50;
      }, 200);
      this.$winResize.add(() => {
        clearTimeout(this.delay);
        this.delay = setTimeout(() => {
          that.tableHeight = window.innerHeight - tabtop - 50;
        }, 200);
      });
    },
    computed: {
    // 格式化数据源
      data() {
        const me = this;
        if (me.treeStructure) {
          const data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll);
          return data;
        }
        return me.dataSource;
      },
    },
    watch: {
      // data(){
      //   let vm=this
      //   for (let j = 0; j < vm.data.length; j++) {
      //     const element = vm.data[j];
      //     if (element._expanded==true) {
      //       vm.defaultExpandAll=true
      //     }
      //   }
      // },
      // 实现完全展开和，完全闭合功能
      defaultExpandAll() {
        const vm = this;
        console.log(vm.defaultExpandAll, 'xmxmxmxmxmx');
        if (vm.defaultExpandAll == false) {
          const record = vm.data;
          for (let i = 0; i < record.length; i++) {
            const element = record[i];
            console.log(element, 'vcmvncmvncnv');
            if (element._expanded == true) {
              element._expanded = false;
            }
            element._expanded = false;
          }
        } else if (vm.defaultExpandAll == true) {
          const record = vm.data;
          for (let i = 0; i < record.length; i++) {
            const element = record[i];
            element._expanded = true;
          }
        }
      },
    },
    methods: {
      sendID(val, val2) {
        this.$emit('listenToChhild', val, val2);
      },
      setClassName({ row, expanded }) {
        console.log(row, 'ghhghhghghghhghg');
      },
      // 显示行
      showTr(row, index) {
        const show = (row.row._parent ? (row.row._parent._expanded && row.row._parent._show) : true);
        row.row._show = show;
        return show ? '' : 'display:none;';
      },
      // 展开下级
      toggle(trIndex) {
        console.log(trIndex);
        const me = this;
        const record = me.data[trIndex];
        record._expanded = !record._expanded;
      },
      // 显示层级关系的空格和图标
      spaceIconShow(index) {
        const me = this;
        if (me.treeStructure && index === 0) {
          return true;
        }
        return false;
      },
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow(index, record) {
        const me = this;
        if (me.treeStructure && index === 0 && record.cashFlowRespVos && record.cashFlowRespVos.length > 0) {
          return true;
        }
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true;
        }
        if (me.treeStructure && index === 0 && record.groupList && record.groupList.length > 0) {
          return true;
        }
        if (me.treeStructure && index === 0 && record.positionData && record.positionData.length > 0) {
          return true;
        }
        if (me.treeStructure && index === 0 && record.dangerTableRespVos && record.dangerTableRespVos.length > 0) {
          return true;
        }
        return false;
      },
      handleDelete() {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
    },
  };
</script>
<style scoped lang="less">
  .ms-tree-space{
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 50px;
    height: 14px;
    &.label{
        width:auto
    }
    }
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }
  .button{
    outline: none;
  }
  .el-button--mini.is-circle{
        padding:1px;
  }
  .el-button--primary{
       background-color: #f00;
        border-color: #f00;

  }
</style>
