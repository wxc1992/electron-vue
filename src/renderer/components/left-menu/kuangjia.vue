<template>
<div class="leftMenu" :style="{height: jsmindHeight+ 'px'}">
    <div class="filter">
       <el-select v-model="categoryType" placeholder="请选择" style="width: 194px;margin-left: 15px;" @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

    </div>
    <div class="menuTree " :style="{height: treeHeight+ 'px'}" v-loading="loading" element-loading-text="菜单数据加载中">
        <el-tree :data="treeData" ref="treeData"  @node-click="handleNodeClick"  class="custom" :filter-node-method="filterNode"></el-tree>
    </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';

export default {
  data() {
    return {
      categoryType: 0,
      filterText: '',
      jsmindHeight: '',
      loading: false,
      options: [
        { name: '宏观数据', value: 3 },
        { name: '大宗商品', value: 6 },
      ],
      treeData: [],
    };
  },
  mounted() {
    //  alert(this.datashow)
    this.jsmindHeight = window.innerHeight - 140;
    this.categoryType = 3;
    this.$emit('sendType', this.categoryType);
    this.getMenuData();
  },
  watch: {
    filterText(val) {
      this.$refs.treeData.filter(val);
    },
  },
  methods: {
    ...mapActions(['getMenuTree']),

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(nodeData) {
      console.log('nodeData', nodeData);
      if (nodeData.children) {
        return;
      }
      console.log('get node data:', nodeData);
      this.$emit('onclick', nodeData);
    },
    selectChange(val) {
      this.categoryType = val;
      this.$emit('sendType', this.categoryType);
      this.getMenuData();
    },
    getMenuData() {
      this.loading = true;
      // debugger
      const param = {
        industry: this.categoryType,
      };
      this.getMenuTree(param).then((res) => {
        console.log('this.categoryType framework', res);
        if (res.status == '0000') {
          if (this.categoryType == 3) {
            this.treeData = [{ label: '宏观数据', children: res.data }];
          }
          if (this.categoryType == 6) {
            this.treeData = [{ label: '大宗商品', children: res.data }];
          }
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
    },

  },
  computed: {
    treeHeight() {
      return window.innerHeight - 300;
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
    .el-select{
     margin: 14px auto;
    }
    .el-input {
      width:194px;
      height:32px;
      line-height: 32px;
      margin: 0 auto;
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
