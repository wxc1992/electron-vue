<template>
    <div class="main" v-if="watchPermission">
        <Header></Header>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Header from '../components/newCreating/component/header.vue';
export default {
  data() {
    return {
      watchPermission: false,
    };
  },
  computed: {
    //  buttonRights() {
    //       let entry = this.getUserRights;
    //       let mainButtons = rightsMap.mainButton;
    //       let rets = this.parseRightsData(entry, 0);
    //       let ret = {};
    //       if (rets instanceof Array) {
    //           rets.forEach(val => {
    //               ret[val.resCode] = true;
    //           })
    //       }
    //       console.log('get ret of button rights:', ret)
    //       return ret
    //   }
  },
  methods: {
    ...mapMutations(['setNewCreditingMenu']),
    getUserright() {
      const menulist = JSON.parse(localStorage.getItem('menu'));
      if (menulist == null) {
        this.watchPermission = false;
        this.$router.push('/home');
      }
      console.log(menulist);
      const childMenu = menulist.filter(item => item.appCode == 'ss_all');
      console.log('childShow', childMenu);
      const childShow = childMenu[0].childs.some(item => item.appCode == 'ssg3.0');
      console.log('childShow', childShow);
      if (childShow) {
        const childmenulist = childMenu[0].childs.filter(item => item.appCode == 'ssg3.0');
        this.setNewCreditingMenu(childmenulist[0]);
        if (childmenulist.length == 0) {
          this.watchPermission = false;
          this.$router.push('/home');
        } else {
          this.watchPermission = true;
        }
      }

      // console.log('childmenulist',childmenulist)
      // this.watchPermission = childmenulist[0].childs.some(item =>item.resCode == 'ssa_dashboard_watch')
      // console.log(this.watchPermission)
      // if (this.watchPermission == false){
      //   this.$router.push("/home");
      // }
    },
  },
  components: {
    Header,
  },
  created() {
    this.getUserright();
  },
};
</script>
<style scoped lang="less">
.main{
    height:100%;
    overflow: hidden;
    background: #EFF4F9;
    .contentContainer{
        height: calc(100% - 55px);
    }
}
</style>
