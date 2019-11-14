<template>
  <div id="allquery2">
    <CommentItem class="commentItem" v-for="(item, index) in history" :singleItem="item" :key="item.id" :moduleType="true" @reEdit="reEdit" v-show="current==index"></CommentItem>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-size="pagesize"
        v-if="!history[0].status==5"
        layout="total, prev, pager, next"
        :total="total">
    </el-pagination>
    <!-- <el-dialog title="重新编辑" :visible.sync="showEdit" width="1000px" :modal="false" :close-on-click-modal="false">
        <span slot="footer" class="dialog-footer">
          <ReEdit :formData="formData" :majority="shareholder" @cancelEdit="cancelEdit"  :isClose="!showEdit" @updateStatus="updateStatus" :rosterlist="rosterlist"></ReEdit>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ReEdit from './new-reEdit.vue';
import CommentItem from './comment-item.vue';
export default {
  data() {
    return {
      pagesize: 1,
      pagenum: 1,
      total: 0,
      current: 0,
      showEdit: false,
      formData: {},
    };
  },
  props: ['dioData'],
  components: {
    CommentItem,
    ReEdit,
  },
  methods: {
    handleCurrentChange(val) {
      this.current = val - 1;
    },
    reEdit(data) {
      console.log('id is:', data);
      this.showEdit = true;
      this.formData = data;
    },
    cancelEdit() {
      this.showEdit = false;
    },
    updateStatus(val) {
      this.showEdit = false;
    },
  },
  created() {
    this.pagenum = 1;
    this.current = 0;
  },
  computed: {
    // shareholder(){
    //     return  this.dioData.formData.s_majority_shareholder || ''
    //   },
    history() {
      let ret = [];
      console.log(this.dioData);
      const comments = [this.dioData.formData];
      ret = comments.filter(val => val.status == 5);
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
