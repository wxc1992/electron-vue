<template>
  <div>
    <commentmain v-if="modalShow"></commentmain>
    <applycomment v-if="applycommentShow"></applycomment>
    <mycomment v-if="mycommentShow"></mycomment>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import commentmain from './commentmainData.vue';
import applycomment from './applyComment.vue';
import mycomment from './mycomment.vue';
const permissionMap = {
  mainButton: ['ssg3.0', 'comment_m'],
};
export default {
  data() {
    return {
      levelStatus: '',
      modalShow: true,
      applycommentShow: false,
      mycommentShow: false,
    };
  },
  methods: {
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
  watch: {
    $route(to, from) {
      if (to.path === '/newSSG/comment/newCommentApply') {
        this.applycommentShow = true;
        this.mycommentShow = false;
        this.modalShow = false;
      } else if (to.path === '/newSSG/comment/mycomment') {
        this.mycommentShow = true;
        this.modalShow = false;
        this.applycommentShow = false;
      } else {
        this.applycommentShow = false;
        this.mycommentShow = false;
        this.modalShow = true;
      }
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
    const path = this.$route.path;
    console.log('this.$route.name', path);
    if (path === '/newSSG/comment/0') {
      this.levelStatus = '';
    }
    if (path === '/newSSG/comment/1') {
      this.levelStatus = '2';
    }
    if (path === '/newSSG/comment/2') {
      this.levelStatus = '3';
    }
    if (path === '/newSSG/comment/3') {
      this.levelStatus = '4';
    }
    if (path === '/newSSG/comment/newCommentApply') {
      this.levelStatus = '5';
    }
    // console.log(' this.levelStatus', this.levelStatus)
  },
  mounted() {
    const path = this.$route.path;
    console.log('this.$route.name', path);
    if (path === '/newSSG/comment/0') {
      const show = this.buttonRights.add_comment;
      console.log('/newSSG/comment/0', show);
      if (!show) {
        this.$message.warning('没有该菜单');
        this.$router.push('/');
      }
    }
    if (path === '/newSSG/comment/1') {
      const show = this.buttonRights.Audit_comment;
      console.log('/newSSG/comment/1', show);
      if (!show) {
        this.$message.warning('没有该菜单');
        this.$router.push('/');
      }
    }
    if (path === '/newSSG/comment/2') {
      const show = this.buttonRights.Audited_comment;
      console.log('/newSSG/comment/2', show);
      if (!show) {
        this.$message.warning('没有该菜单');
        this.$router.push('/');
      }
    }
    if (path === '/newSSG/comment/3') {
      const show = this.buttonRights.rejected_comment;
      console.log('/newSSG/comment/3', show);
      if (!show) {
        this.$message.warning('没有该菜单');
        this.$router.push('/');
      }
    }
    if (path === '/newSSG/comment/newCommentApply') {
      const show = this.buttonRights.commentapply;
      console.log('/newSSG/comment/newCommentApply', show);
      if (!show) {
        this.$message.warning('没有该菜单');
        this.$router.push('/');
      }
    }
    if (path === '/newSSG/comment/newCommentApply') {
      this.applycommentShow = true;
      this.mycommentShow = false;
      this.modalShow = false;
    } else if (path === '/newSSG/comment/mycomment') {
      this.mycommentShow = true;
      this.modalShow = false;
      this.applycommentShow = false;
    } else {
      this.applycommentShow = false;
      this.mycommentShow = false;
      this.modalShow = true;
    }
  },
  components: {
    commentmain,
    applycomment,
    mycomment,

  },
};
</script>

<style>

</style>
