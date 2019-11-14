<template>
  <div id="allquery2">
    <CommentItem class="commentItem" v-for="(item, index) in history" :showopertate1="false" :showopertate2="false" :showopertate3="false" :singleItem="item" :key="item.id" :moduleType="true" v-show="current==index"></CommentItem>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-size="pagesize"
         v-if="!history[0].status==3"
        layout="total, prev, pager, next"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CommentItem from './comment-item.vue';
export default {
  data() {
    return {
      pagesize: 1,
      pagenum: 1,
      total: 0,
      current: 0,
    };
  },
  props: ['dioData'],
  components: {
    CommentItem,
  },
  methods: {
    handleCurrentChange(val) {
      this.current = val - 1;
    },
  },
  created() {
    this.pagenum = 1;
    this.current = 0;
  },
  computed: {
    history() {
      let ret = [];
      console.log(this.dioData);
      const comments = [this.dioData.formData];
      ret = comments.filter(val => val.status == 3);
      console.log('ret of history:', ret);
      this.total = ret.length;
      console.log('this.total', this.total);
      return ret;
    },
  },
};
</script>

<style scoped lang="less">
#allquery2{


}

</style>
