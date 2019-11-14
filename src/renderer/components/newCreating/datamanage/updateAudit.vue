<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="评级更新" name="0">
        <ratingUpdate></ratingUpdate>
      </el-tab-pane>
      <el-tab-pane label="定性数据更新" name="1">
        <NominalUpdate></NominalUpdate>
      </el-tab-pane>
      <el-tab-pane label="财务数据更新" name="2">
        <subjectUpdate></subjectUpdate>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ratingUpdate from './components/ratingUpdate';
import subjectUpdate from './components/subjectUpdate';
import NominalUpdate from './components/NominalUpdate';
const permissionMap = {
  mainButton: ['ss_all', 'ssg3.0', 'show_permission'],
};
export default {
  data() {
    return {
      activeName: '0',
    };
  },
  components: {
    ratingUpdate,
    subjectUpdate,
    NominalUpdate,
  },
  mounted() {
    const isshow = this.buttonRights.show_permission2;
    console.log(isshow);
    if (!isshow) {
      this.$message.warning('没有该菜单');
      this.$router.push('/');
    }
  },
  computed: {
    buttonRights() {
      const menulist = JSON.parse(localStorage.getItem('menu'));
      const rets = this.parseRightsData(menulist, 0);
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
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
  },
};
</script>

<style>

</style>
