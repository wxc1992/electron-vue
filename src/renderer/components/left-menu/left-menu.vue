<template>
<div class="leftMenu" :style="{height: jsmindHeight+ 'px'}">
    <div class="filter">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
        <!-- <input type="text" class="search" placeholder="请输入关键词" v-model="filterText"> -->
        <div class="categoryBtn" v-show="datashow!=='1'">
            <button v-for="(item,index) in buttonlist"
              :class="[ButtonIndex == index ? 'active' : '']"
              @click="changeButton(index)"
              :disabled="isdisable"
              :key="index">
              {{item.value}}
            </button>
        </div>
    </div>
    <div class="menuTree " :style="{height: treeHeight+ 'px'}" v-loading="loading" element-loading-text="菜单数据加载中">
        <el-tree :data="showType?showData:treeData" ref="treeData"  @node-click="handleNodeClick"  class="custom" :filter-node-method="filterNode"></el-tree>
    </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';
const permissionMap = {
  mainButton: ['ss_all', 'dc2.0-data', 'dc2.0-indicator'],
};
const indusrtyMap = {
  'dc2.0-automobile': '2',
  'dc2.0-autoLogistical': '0',
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
      filterText: '',
      loading: false,
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
    };
  },
  mounted() {
    //  alert(this.datashow)
    this.jsmindHeight = window.innerHeight - 140;
    // let menuTree = JSON.parse(localStorage.getItem('menu') || '[]');
    // let menuList = this.parseRightsData(menuTree,0);
    const menuTree = JSON.parse(localStorage.getItem('menu')) || [];
    let lastChild = [];
    // debugger
    const hasSsdcmenu = menuTree.some(item => item.appCode == 'ss_all');
    if (hasSsdcmenu) {
      const ssdcMenu = menuTree.filter(item => item.appCode == 'ss_all');
      console.log('ssdcMenu', ssdcMenu);
      const menu = ssdcMenu[0].childs.some(item => item.appCode == 'ssdc2.0');
      if (menu) {
        const secondMenu = ssdcMenu[0].childs.filter(item => item.appCode == 'ssdc2.0');
        console.log('secondMenu', secondMenu);
        const showchild = secondMenu[0].childs.some(item => item.resCode == 'dc2.0-indicator');
        if (showchild) {
          // debugger
          const lastChildpbj = secondMenu[0].childs.filter(item => item.resCode == 'dc2.0-indicator');
          lastChild = lastChildpbj[0].childs;
          this.categoryList = lastChild;
          console.log(lastChild);
        } else {
          lastChild = [];
        }
      } else {
        lastChild = [];
      }
    } else {
      lastChild = [];
    }
    // this.categoryList = this.parseRightsData(lastChild,0);
    this.getMenuData(industryMacro);
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
    ...mapActions(['getMenuTree']),
    ...mapMutations(['setLeftMenue']),
    changeButton(index) {
      this.isdisable = true;
      this.ButtonIndex = index;
      this.categoryBuffer = [];
      this.treeData = [];
      this.mainData = [];
      if (index == 0) {
        this.category = 'dc2.0-macro0';
        const flag = this.allData.some(item => item.title == '宏观数据');
        if (flag) {
          this.showType = true;
          this.showData = this.allData.filter(item => item.title == '宏观数据');
        } else {
          this.getMenuData(industryMacro);
        }
      } else if (index == 1) {
        this.category = 'dc2.0-macro1';
        const flag = this.allData.some(item => item.title == '汽车行业' || item.title == '医药行业' || item.title == '物流行业');
        if (flag) {
          this.showType = true;
          this.showData = this.allData.filter(item => item.title == '汽车行业' || item.title == '医药行业' || item.title == '物流行业');
        } else {
          this.getMenuData(indusrtyMap);
        }
      } else if (index == 2) {
        this.category = 'dc2.0-macro2';
        const flag = this.allData.some(item => item.title == '信用卡');
        if (flag) {
          this.showType = true;
          this.showData = this.allData.filter(item => item.title == '信用卡');
        } else {
          this.getMenuData(industryCard);
        }
      } else {
        this.showData = [];
      }
      setTimeout(() => {
        this.isdisable = false;
      }, 1000);
      //  this.handleNodeClick()
    },
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
    requestMenuTree(param, category, item) {
      this.loading = true;
      const ret = [];
      this.getMenuTree(param).then((result) => {
        console.log('get menu tree', result);
        if (result.status === '0000') {
          const data = result.data;
          this.mainData.push({ ...item, children: data, label: item.title });
          this.allData.push({ ...item, children: data, label: item.title });
          this.$set(this.categoryBuffer, category, this.mainData);
          this.loading = false;
        }
        console.log('categoryBuffer:', this.categoryBuffer);
        console.log('this.mainData:', this.mainData);
        const obj = {};

        this.allData = this.allData.reduce((cur, next) => {
          obj[next.title] ? '' : obj[next.title] = true && cur.push(next);
          return cur;
        }, []);
        this.setLeftMenue(this.allData);
      }, (err) => {
        this.loading = false;
      });
    },
    getCurrentIndustryList(category, categoryList) {
      // debugger
      if (!category || !categoryList) {
        return [];
      }
      for (const item of categoryList) {
        if (item.resCode === category) {
          return item.childs;
        }
      }
    },
    getMenuData(industryType) {
      // debugger
      const industryList = this.getCurrentIndustryList(this.category, this.categoryList);
      for (const item of industryList) {
        const industry = industryType[item.resCode];
        console.log('industry', industry);
        if (industry) {
          this.requestMenuTree({ industry }, this.category, item);
        }
      }
      console.log('get menu list:', this.categoryList);
    },
    parseRightsData(entry, codeIndex) {
      // debugger
      const resCode = permissionMap.mainButton[codeIndex++];
      if (Array.isArray(entry)) {
        for (const item of entry) {
          if (item.resCode === resCode) {
            return this.parseRightsData(item.childs, 0);
          }
        }
      }
      const nextCode = permissionMap.mainButton[codeIndex];
      if (!nextCode) {
        return entry.childs || [];
      }
      const children = entry.childs || [];
      if (children.length === 0) {
        return [];
      }
      let found = false;
      for (const item of children) {
        if (nextCode === item.resCode) {
          found = true;
          return this.parseRightsData(item, codeIndex);
        }
      }
      if (!found) {
        return [];
      }
    },
  },
  computed: {
    ...mapGetters(['getUserRights']),
    datashow() {
      console.log(this.categorytype);
      return this.categorytype;
    },
    treeHeight() {
      return this.datashow == '1' ? window.innerHeight - 260 : window.innerHeight - 350;
    },
    treeData: {
      get() {
        console.log('categoryBuffer333:', this.categoryBuffer);
        console.log('this.category:', this.category);
        const categoryBuffer = this.categoryBuffer;
        // console.log('this.allData',this.allData)
        this.showData = categoryBuffer[this.category] || [];
        return categoryBuffer[this.category] || [];
      },
      set() {

      },

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
