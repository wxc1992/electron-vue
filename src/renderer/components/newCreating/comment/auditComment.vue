<template>
  <div id="allquery2">
    <CommentItem class="commentItem" v-for="(item, index) in history" :singleItem="item" :key="item.id" :moduleType="true" v-show="current==index"></CommentItem>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-size="pagesize"
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
  props: ['tabData'],
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
    ...mapGetters(['getNewoutputContent']),
    history() {
      let ret = [];
      console.log(this.getNewoutputContent);
      const comments = this.getNewoutputContent.ItemData;
      ret = comments.filter(val => val.status == 2);
      console.log('ret of history:', ret);
      this.total = ret.length;
      console.log('this.total', this.total);
      return ret;
    },
  },
  watch: {
    'getNewoutputContent.ItemData': function (val) {
      console.log('getNewoutputContent.ItemData', val);
    },
  },
};
</script>

<style scoped lang="less">
#allquery2{


}

</style>
