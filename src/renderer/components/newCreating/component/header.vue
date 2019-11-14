<template>
<div style="width:100%;height:100%">
    <div class="secondMenu">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="item.title" :name="item.url.split(';')[0].split('/')[1]" v-for="(item,index) in menulist" :key="index"></el-tab-pane>
        </el-tabs>
    </div>
     <div  style="height:100%;width:100%;margin: 0 auto;overflow-x:hidden">
        <router-view></router-view>
     </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';
const permissionMap = {
  mainButton: ['ss_all', 'ssg3.0'],
};
export default {
  props: ['nowActiveName'],
  data() {
    return {
      activeName: '',
      menulist: [],
    };
  },
  methods: {
    handleClick(val, event) {
      console.log(val.name);
      // console.log(event)
      console.log(this.menulist);
      const arr = this.menulist.filter(item => item.url.split(';')[0].split('/')[1] === val.name);
      console.log(arr);
      if (val.name == 'comment') {
        this.$router.push(`/newSSG${arr[0].childs[0].url}`);
      } else if (val.name == 'datanamagement') {
        this.$router.push(`/newSSG${arr[0].childs[0].url.split(';')[0]}`);
      } else {
        this.$router.push(`/newSSG/${arr[0].url.split(';')[0].split('/')[1]}`);
      }
    },
    parseRightsData(entry, codeIndex) {
      const resCode = permissionMap.mainButton[codeIndex++];
      if (Array.isArray(entry)) {
        for (const item of entry) {
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
  mounted() {
    const menus = JSON.parse(localStorage.getItem('menu') || '[]');
    this.menulist = this.parseRightsData(menus, 0);
    //  this.activeName =  this.menulist[0].url.split(';')[0]
    console.log(' this.menulist', this.menulist);
  },
  created() {
    console.log('this.$route+++++++++++++', this.$route);

    if (this.$route.name == 'dataUpdate') {
      this.activeName = 'datanamagement';
    } else if (this.$route.name == 'updateAudit') {
      this.activeName = 'datanamagement';
    } else if (this.$route.path.indexOf('/newSSG/comment/') > -1) {
      this.activeName = 'comment';
    } else if (this.$route.path.indexOf('/newSSG/datanamagement/') > -1) {
      this.activeName = 'datanamagement';
    } else {
      this.activeName = this.$route.name;
    }
  },
  watch: {
    $route(to, from) {
      console.log('marshome route to:', to);
      console.log('marshome route from:', from);
      if (to.name == 'newSSGhome') {
        this.activeName = 'newSSGhome';
      }
      if (to.name == 'dataUpdate') {
        this.activeName = 'datanamagement';
      }
      if (to.name == 'updateAudit') {
        this.activeName = 'datanamagement';
      }
      if (to.name == 'newCreatingMars') {
        this.activeName = 'newCreatingMars';
      }
      // if(to.name == 'newSSGhome'){
      //   this.activeName = 'newSSGhome'
      // }
    },
  },
};
</script>
<style scoped lang="less">
.header{
    display:flex;
    padding:0 36px;
    height:55px;
    color:#fff;
    overflow: hidden;
    background:#104972;
    align-items: center;
    .logo{
        font-size:12px;
    }

}
.items{
    list-style:none;
    display: flex;
    margin-left:100px;
    flex:auto;
    justify-content: flex-start;
    li{
        width:90px;
        text-align: center;
        height: 55px;
        line-height: 55px;
        &:hover{
            background:#1283D5;
        }
        &.active{
           background:#1283D5;
        }
        a{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #FFFFFF;
            text-decoration: none;
        }
    }
}
.search{
    width:293px;
    background:#fff;
    overflow: hidden;
    border-radius:4px;
    position: relative;
    .text{
        padding:6px;
        width:251px;
        height:30px;
        outline: none;
        box-sizing: border-box;
    }
    // .button{
    //     position:absolute;
    //     top:7px;
    //     right:13px;
    //     width:15px;
    //     height:15px;
    //     background: url(../../assets/images/search.png) no-repeat;
    // }
}
.status{
    display: flex;
    flex:auto;
    align-items: center;
    justify-content: flex-end;
    .icon{
        width: 42px;
        height:18px;
    }
    // .unreadMsg{
    //     background:url(../../assets/images/ring.png) center no-repeat;
    // }
    // .qrCode{
    //     background:url(../../assets/images/phone.png) center no-repeat;
    // }
    .headPic{
        height:26px;
        width:26px;
        border-radius: 26px;
    }
}
.secondMenu{
  width: 100%;
  font-size: 14px;
  padding: 0 10px;
  color: #666;
  height: 35px;
  line-height: 35px;
  margin-bottom: 20px;
  // margin-bottom:20px;
  background: #fafafa;
  .el-tabs__nav{
    .el-tabs__item{
      .is-top{
        &:nth-child(2){
          padding-left:100px;
        }
      }
      }

  }

}
</style>
