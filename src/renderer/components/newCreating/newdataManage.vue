<template>
  <div id="manage_warp">
    <div class="fl left_container">
        <div class="header" style="width: 100%">
          数据管理
        </div>
        <div>
          <el-tabs tab-position="right" style="width: 100%" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane style="width:100%;height:40px;line-height:40px;" :label="item.title" :name="'/newSSG'+item.url.split(';')[0]" v-for="(item,index) in datalist" :key="index"></el-tab-pane>
          </el-tabs>
        </div>
        <!-- <div v-for="item in datalist" :key="item.id" class="text item">
          <router-link :to="'/newSSG/comment'+item.url.split(';')[0]">{{item.title}}</router-link>
        </div> -->
    </div>
    <div class="right_container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
const permissionMap = {
  mainButton: ['ssg3.0'],
};
export default {
  data() {
    return {
      datalist: [],
      menulist: {},
      activeName: '',
    };
  },
  methods: {
    handleClick(val, event) {
      console.log('handleClick', val);
      this.$router.push(val.name);
    },
    parseRightsData(entry, codeIndex) {
      const resCode = permissionMap.mainButton[codeIndex++];
      if (Array.isArray(entry)) {
        for (var item of entry) {
          if (item.resCode === resCode) {
            return this.parseRightsData(item, 0);
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
      for (var item of children) {
        if (nextCode === item.resCode) {
          found = true;
          return this.parseRightsData(item, codeIndex);
        }
      }
      if (!found) {
        return [];
      }
    },
    geyMenuData() {
      const arr = this.menulist.childs.filter(item => item.resCode == 'show_permission');
      this.datalist = arr[0].childs;
      console.log(this.$route);
    },
  },
  computed: {
    ...mapGetters(['getNewCreditingMenu']),
    buttonRights() {
      this.menulist = this.getNewCreditingMenu;
      const rets = this.parseRightsData(this.menulist, 0);
      const ret = {};
      if (rets instanceof Array) {
        rets.forEach((val) => {
          ret[val.resCode] = true;
        });
      }
      console.log('get ret of button rights:', ret);
      return ret;
    },
  },
  created() {
    console.log('this.$route', this.$route);
    this.activeName = this.$route.path;
  },
  mounted() {
    // console.log('getNewCreditingMenu',data)
    const show = this.buttonRights.show_permission;
    console.log('getNewCreditingMenu', show);
    if (!show) {
      this.$message.warning('没有该菜单');
      this.$router.push('/');
    } else {
      this.geyMenuData();
    }
  },
};
</script>

<style scope="scoped" lang="less">
  #manage_warp{
    width: 98%;
    height: 100%;
    margin: 0 auto;
    .right_container{
      // width: 82.777%
      margin-left: 220px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      background: #fff;
      padding: 10px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .left_container{
      width: 200px;
      // height: 300px;
      padding-bottom: 20px;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
  }
</style>
