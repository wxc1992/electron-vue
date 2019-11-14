<template>
   <el-dialog class="customDialog" title="我的点评" :visible="outputVisibleMy" width="1024px"  @close="close" :close-on-click-modal="false">
      <el-tabs v-model="tabName" type="card" >
          <el-tab-pane :key="item.index" v-for="(item ,index) in tabList" :label="item.title" :name="item.name">
              <component
              style="outline: none;"
              :is="item.component"
              :tabIndex="index"
              :dioData="commentData"
              @closeUpdate="closeUpdate"
              v-if="outputVisibleMy"
              >
              </component>
          </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import Vue from 'vue';
import myupdateComment from './updateComment.vue';
import myhistorycomment from './historycommentmy.vue';
import myauditComment from './auditComment.vue';
import myauditedComment from './auditedComment.vue';
import mynopassComment from './nopassComment.vue';
import nodeleteComment from './nodeleteComment.vue';
import mybaseInfo from './baseinfomy.vue';
import mybaseInfoCT from './baseinfoCTmy.vue';
import myfinalDataCT from './finalData.vue';
const bus = new Vue();
export default {
  components: {
    myhistorycomment,
    myauditComment,
    myauditedComment,
    mynopassComment,
    mybaseInfo,
    nodeleteComment,
    mybaseInfoCT,
    myfinalDataCT,
    myupdateComment,
  },
  props: ['outputVisibleMy', 'commentData'],
  data() {
    return {
      tabName: '',
      levelStatus: '',
      tabList: [

      ],
      itemData: [],

    };
  },
  methods: {
    close() {
      this.$emit('closedio', false);
    },
    closeUpdate(val) {
      this.$emit('closedio', false);
    },
  },
  computed: {
    showStatus() {
      return this.commentData.rowData.status;
    },
    moduleId() {
      return this.commentData.rowData.moduleId;
    },
  },
  watch: {
    outputVisibleMy(val) {
      // debugger
      const status = this.commentData.rowData.status;
      console.log('show11111111111111', val);
      if (this.commentData.rowData.moduleId == 5034) {
        this.tabList = [{
          index: 1,
          title: '历史点评',
          name: '1',
          component: 'myhistorycomment',
        },
        {
          index: 2,
          title: '基本信息',
          name: '2',
          component: 'mybaseInfoCT',

        },
        {
          index: 3,
          title: '财务指标',
          name: '3',
          component: 'myfinalDataCT',

        }];
      } else {
        this.tabList = [{
          index: 1,
          title: '历史点评',
          name: '1',
          component: 'myhistorycomment',
        },
        {
          index: 2,
          title: '基本信息',
          name: '2',
          component: 'mybaseInfo',
        }];
      }
      if (status === 7) {
        this.tabList.unshift({
          index: 0,
          title: '更新点评',
          name: '0',
          component: 'myupdateComment',
        });
      } else if (status === 2) {
        this.tabList.unshift({
          index: 0,
          title: '待审核点评',
          name: '0',
          component: 'myauditComment',
        });
      } else if (status === 3) {
        this.tabList.unshift({
          index: 0,
          title: '已审核点评',
          name: '0',
          component: 'myauditedComment',
        });
      } else if (status === 4) {
        this.tabList.unshift({
          index: 0,
          title: '已驳回点评',
          name: '0',
          component: 'mynopassComment',
        });
      } else if (status === 5) {
        this.tabList.unshift({
          index: 0,
          title: '已撤销点评',
          name: '0',
          component: 'nodeleteComment',
        });
      }
      // debugger
      this.tabName = this.tabList[0].name;
      // if(this.showStatus ==){

      // }
    },
  },
  mounted() {
  },
};
</script>

<style>

</style>
