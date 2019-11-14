<template>
  <div id="allquery">
    <CommentItem class="commentItem"  :showopertaty1="showopertate1" :showopertaty2="showopertate2" :showopertaty3="showopertate3" :rowdata="dioData" v-for="(item, index) in history" :singleItem="item" :key="item.id" v-show="current==index"></CommentItem>
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
      showopertate1: false,
      showopertate2: false,
      showopertate3: false,
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
      const comments = this.dioData.ItemData;
      ret = comments.filter(val => val.status < 4);
      console.log('ret of history:', ret);
      this.total = ret.length;
      console.log('this.total', this.total);
      return ret;
    },
  },
};
</script>

<style scoped lang="less">
#allquery{


}

</style>
