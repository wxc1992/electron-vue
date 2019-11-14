<template>
<div class="leftMenu" :style="{height: jsmindHeight+ 'px'}">
    <div class="filter">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
    </div>
    <div class="menuTree " :style="{height: treeHeight+ 'px'}" v-loading="loading" element-loading-text="菜单数据加载中">
      <!-- <div>test</div> -->
        <el-tree
        node-key="id" :highlight-current="true"
        :current-node-key="10"
        default-expand-all
        :data="treeData"
        ref="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
        class="custom"
        :filter-node-method="filterNode">
       </el-tree>
    </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';
// const permissionMap = {
//     'mainButton': ['ss_all', 'dc2.0-data', 'dc2.0-indicator']
// }
const indusrtyMap = {
  // 'dc2.0-automobile':'2',
  // 'dc2.0-autoLogistical':'0',
  'dc2.0-automedical': '1',
};
const industryMacro = {
  'dc2.0-macrodata': '3',
};
const industryCard = {
  'dc2.0-creaditCard': '4',
};

export default {
  props: ['categorytype'],
  data() {
    return {
      category: 'dc2.0-macro0',
      categoryBuffer: {},
      curentid: 10,
      filterText: '',
      isdisable: false,
      showType: false,
      jsmindHeight: '',
      buttonlist: [
        { value: '中国宏观' },
        { value: '行业数据' },
        { value: '信用卡' },
        { value: '国际宏观' },
        { value: '行情数据' },
        { value: '公司数据' },
        { value: '特色数据' },
        { value: '指标收藏' },
      ],
      allData: [],
      ButtonIndex: 0,
      mainData: [],
      showData: [],
      treeData: [],
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  mounted() {
    //  alert(this.datashow)
    this.jsmindHeight = window.innerHeight - 140;
    this.requestMenuTree();
  },
  watch: {
    filterText(val) {
      this.$refs.treeData.filter(val);
    },
    datashow(val) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!datashow', val);
    },
  },
  methods: {
    ...mapActions(['getmedicineTreedata']),
    ...mapMutations(['setLeftMenue']),
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(nodeData) {
      // debugger
      console.log('nodeData', nodeData);
      if (nodeData.children && nodeData.children.length > 0) {
        return;
      }
      console.log('get node data:', nodeData);
      this.$emit('onclickNode', nodeData);
    },
    requestMenuTree() {
      this.loading = true;
      this.getmedicineTreedata().then((result) => {
        console.log('get menu tree', result);
        if (result.status === 200 && result.data.status === '0000') {
          // const data = result.data;
          //  let data = [{label: '医药行业',children: result.data,windCode: ""}]
          this.treeData = result.data.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      }, (err) => {
        this.loading = false;
      });
    },

  },
  computed: {
    treeHeight() {
      return this.datashow == '1' ? window.innerHeight - 260 : window.innerHeight - 250;
    },

  },
};
</script>

<style lang="less" scoped>
.leftMenu {
    font-family: PingFangSC-Medium;
    box-shadow: 1px 1px 8px 1px rgba(13, 30, 88, 0.11);
    height: 100%;
    width: 245px;
    background:#fff;
    ::-webkit-scrollbar
    {
        width: 8px;
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
    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color:rgba(144, 147, 153, 0.493);
    }

    .active{
      background: #007CD3;
    }
}

.filter {
    padding: 0 10px;
    .el-input {
      width:194px;
      height:32px;
      line-height: 32px;
      margin: 14px auto;
      margin-left: 15px;
    }

    .categoryBtn {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        height: 80px;
        align-content: space-between;

        button {
            width: 60px;
            height: 20px;
            background: #E2E2E2;
            border-radius: 2px;
            color: #3D3D3D;
            font-size: 12px;
            cursor: pointer;
            outline: none;
        }

        button.active {
            background: #007CD3;
            color:#fff;
        }

        // button:last-child {
        //     margin: auto;
        // }
    }
}

.menuTree {
    margin: 20px 10px 0;
    padding: 13px 0 20px;
    // height: 65%;
    border-top: 1px solid #F0F0F0;
}
</style>
