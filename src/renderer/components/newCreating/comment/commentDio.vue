<template>
   <el-dialog class="customDialog" title="点评管理" :visible="outputVisible" width="1024px"  @close="close" :close-on-click-modal="false">
      <el-tabs v-model="tabName" type="card" >
          <el-tab-pane :key="item.index" v-for="(item ,index) in tabList" :label="item.title" :name="item.name">
              <component
              style="outline: none;"
              :is="item.component"
              :tabIndex="index"
              :rosterlist="rosterlist"
              v-if="outputVisible">
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
import addComment from './addcomment.vue';
import historycomment from './historycomment.vue';
import auditComment from './auditComment.vue';
import auditedComment from './auditedComment.vue';
import nopassComment from './nopassComment.vue';
import baseInfo from './baseinfo';
import baseInfoCT from './baseinfoCT';
import finalDataCT from './finalData';
const bus = new Vue();
export default {
  components: {
    addComment,
    historycomment,
    auditComment,
    auditedComment,
    nopassComment,
    baseInfo,
    baseInfoCT,
    finalDataCT,
  },
  props: ['rosterlist'],
  data() {
    return {
      tabName: '',
      levelStatus: '',
      tabList: [

      ],
      itemData: [],
      showDio: 5035,
    };
  },
  methods: {
    ...mapMutations(['setNewoutputContent']),
    close() {
      const data = this.getNewoutputContent;
      data.outputVisible = false;
      this.setNewoutputContent(data);
      // console.log(data)
    },
  },
  computed: {
    ...mapGetters(['getNewoutputContent']),
    ...mapState(['NewcreditRating']),
    outputVisible() {
      const show = this.getNewoutputContent.outputVisible;
      console.log('show', show);
      // this.tabName = this.tabList[0].name
      bus.$on('sendData', (msg) => {
        console.log('show1eeeeeeeeeeee1', msg);
        // this.itemData = msg
      });
      return show;
    },
  },
  watch: {
    outputVisible(val) {
      console.log('show11111111111111', val);
    },
    'getNewoutputContent.moduleId': function () {
      console.log('getNewoutputContentgetNewoutputContentgetNewoutputContent', this.getNewoutputContent.moduleId);
      const path = this.$route.path;
      this.showDio = this.getNewoutputContent.moduleId;
      if (this.showDio !== 5034) {
        if (path === '/newSSG/comment/0') {
          this.levelStatus = '';
          this.tabList = [{
            index: 0,
            title: '新增点评',
            name: '0',
            component: 'addComment',
          },
          {
            index: 1,
            title: '历史点评',
            name: '1',
            component: 'historycomment',
          },
          {
            index: 2,
            title: '基本信息',
            name: '2',
            component: 'baseInfo',

          }];
        }
        if (path === '/newSSG/comment/1') {
          this.levelStatus = '2';
          this.tabList = [
            {
              index: 1,
              title: '待审核点评',
              name: '1',
              component: 'auditComment',
            },
            {
              index: 2,
              title: '历史点评',
              name: '2',
              component: 'historycomment',
            },
            {
              index: 3,
              title: '基本信息',
              name: '3',
              component: 'baseInfo',

            }];
        }
        if (path === '/newSSG/comment/2') {
          this.levelStatus = '3';
          this.tabList = [
            {
              index: 1,
              title: '已审核点评',
              name: '1',
              component: 'auditedComment',
            },
            {
              index: 2,
              title: '历史点评',
              name: '2',
              component: 'historycomment',
            },
            {
              index: 3,
              title: '基本信息',
              name: '3',
              component: 'baseInfo',

            }];
        }
        if (path === '/newSSG/comment/3') {
          this.levelStatus = '4';
          this.tabList = [{
            index: 1,
            title: '已驳回点评',
            name: '1',
            component: 'nopassComment',
          },
          {
            index: 2,
            title: '历史点评',
            name: '2',
            component: 'historycomment',
          },
          {
            index: 3,
            title: '基本信息',
            name: '3',
            component: 'baseInfo',

          }];
        }
      } else {
        if (path === '/newSSG/comment/0') {
          this.levelStatus = '';
          this.tabList = [{
            index: 0,
            title: '新增点评',
            name: '0',
            component: 'addComment',
          },
          {
            index: 1,
            title: '历史点评',
            name: '1',
            component: 'historycomment',
          },
          {
            index: 2,
            title: '基本信息',
            name: '2',
            component: 'baseInfoCT',

          },
          {
            index: 3,
            title: '财务指标',
            name: '3',
            component: 'finalDataCT',

          }];
        }
        if (path === '/newSSG/comment/1') {
          this.levelStatus = '2';
          this.tabList = [
            {
              index: 1,
              title: '待审核点评',
              name: '1',
              component: 'auditComment',
            },
            {
              index: 2,
              title: '历史点评',
              name: '2',
              component: 'historycomment',
            },
            {
              index: 3,
              title: '基本信息',
              name: '3',
              component: 'baseInfoCT',

            }, {
              index: 4,
              title: '财务指标',
              name: '4',
              component: 'finalDataCT',

            }];
        }
        if (path === '/newSSG/comment/2') {
          this.levelStatus = '3';
          this.tabList = [
            {
              index: 1,
              title: '已审核点评',
              name: '1',
              component: 'auditedComment',
            },
            {
              index: 2,
              title: '历史点评',
              name: '2',
              component: 'historycomment',
            },
            {
              index: 3,
              title: '基本信息',
              name: '3',
              component: 'baseInfoCT',

            },
            {
              index: 4,
              title: '财务指标',
              name: '4',
              component: 'finalDataCT',

            }];
        }
        if (path === '/newSSG/comment/3') {
          this.levelStatus = '4';
          this.tabList = [{
            index: 1,
            title: '已驳回点评',
            name: '1',
            component: 'nopassComment',
          },
          {
            index: 2,
            title: '历史点评',
            name: '2',
            component: 'historycomment',
          },
          {
            index: 3,
            title: '基本信息',
            name: '3',
            component: 'baseInfoCT',

          },
          {
            index: 4,
            title: '财务指标',
            name: '4',
            component: 'finalDataCT',

          }];
        }
      }

      this.tabName = this.tabList[0].name;
    },
    $route(val) {
      const path = val.path;
      console.log('showDiorouterouterouterouteroute', this.showDio);
      console.log('this.$route.name', val);
      if (this.showDio !== 5034) {
        if (path === '/newSSG/comment/0') {
          this.levelStatus = '';
          this.tabList = [{
            index: 0,
            title: '新增点评',
            name: '0',
            component: 'addComment',
          },
          {
            index: 1,
            title: '历史点评',
            name: '1',
            component: 'historycomment',
          },
          {
            index: 2,
            title: '基本信息',
            name: '2',
            component: 'baseInfo',

          }];
        }
        if (path === '/newSSG/comment/1') {
          this.levelStatus = '2';
          this.tabList = [
            {
              index: 1,
              title: '待审核点评',
              name: '1',
              component: 'auditComment',
            },
            {
              index: 2,
              title: '历史点评',
              name: '2',
              component: 'historycomment',
            },
            {
              index: 3,
              title: '基本信息',
              name: '3',
              component: 'baseInfo',

            }];
        }
        if (path === '/newSSG/comment/2') {
          this.levelStatus = '3';
          this.tabList = [
            {
              index: 1,
              title: '已审核点评',
              name: '1',
              component: 'auditedComment',
            },
            {
              index: 2,
              title: '历史点评',
              name: '2',
              component: 'historycomment',
            },
            {
              index: 3,
              title: '基本信息',
              name: '3',
              component: 'baseInfo',

            }];
        }
        if (path === '/newSSG/comment/3') {
          this.levelStatus = '4';
          this.tabList = [{
            index: 1,
            title: '已驳回点评',
            name: '1',
            component: 'nopassComment',
          },
          {
            index: 2,
            title: '历史点评',
            name: '2',
            component: 'historycomment',
          },
          {
            index: 3,
            title: '基本信息',
            name: '3',
            component: 'baseInfo',

          }];
        }
      } else {
        if (path === '/newSSG/comment/0') {
          this.levelStatus = '';
          this.tabList = [{
            index: 0,
            title: '新增点评',
            name: '0',
            component: 'addComment',
          },
          {
            index: 1,
            title: '历史点评',
            name: '1',
            component: 'historycomment',
          },
          {
            index: 2,
            title: '基本信息',
            name: '2',
            component: 'baseInfoCT',

          },
          {
            index: 3,
            title: '财务指标',
            name: '3',
            component: 'finalDataCT',

          }];
        }
        if (path === '/newSSG/comment/1') {
          this.levelStatus = '2';
          this.tabList = [
            {
              index: 1,
              title: '待审核点评',
              name: '1',
              component: 'auditComment',
            },
            {
              index: 2,
              title: '历史点评',
              name: '2',
              component: 'historycomment',
            },
            {
              index: 3,
              title: '基本信息',
              name: '3',
              component: 'baseInfoCT',

            },
            {
              index: 4,
              title: '财务指标',
              name: '4',
              component: 'finalDataCT',

            }];
        }
        if (path === '/newSSG/comment/2') {
          this.levelStatus = '3';
          this.tabList = [
            {
              index: 1,
              title: '已审核点评',
              name: '1',
              component: 'auditedComment',
            },
            {
              index: 2,
              title: '历史点评',
              name: '2',
              component: 'historycomment',
            },
            {
              index: 3,
              title: '基本信息',
              name: '3',
              component: 'baseInfoCT',

            },
            {
              index: 4,
              title: '财务指标',
              name: '4',
              component: 'finalDataCT',

            }];
        }
        if (path === '/newSSG/comment/3') {
          this.levelStatus = '4';
          this.tabList = [{
            index: 1,
            title: '已驳回点评',
            name: '1',
            component: 'nopassComment',
          },
          {
            index: 2,
            title: '历史点评',
            name: '2',
            component: 'historycomment',
          },
          {
            index: 3,
            title: '基本信息',
            name: '3',
            component: 'baseInfoCT',

          },
          {
            index: 4,
            title: '财务指标',
            name: '4',
            component: 'finalDataCT',

          }];
        }
      }

      this.tabName = this.tabList[0].name;
    },
  },
  mounted() {
    const path = this.$route.path;
    this.showDio = this.getNewoutputContent.moduleId;
    console.log('showDiomountedmountedmountedmountedmountedmounted', this.showDio);
    console.log('this.$route.name', path);
    if (this.showDio !== 5034) {
      if (path === '/newSSG/comment/0') {
        this.levelStatus = '';
        this.tabList = [{
          index: 0,
          title: '新增点评',
          name: '0',
          component: 'addComment',
        },
        {
          index: 1,
          title: '历史点评',
          name: '1',
          component: 'historycomment',
        },
        {
          index: 2,
          title: '基本信息',
          name: '2',
          component: 'baseInfo',

        }];
      }
      if (path === '/newSSG/comment/1') {
        this.levelStatus = '2';
        this.tabList = [
          {
            index: 1,
            title: '待审核点评',
            name: '1',
            component: 'auditComment',
          },
          {
            index: 2,
            title: '历史点评',
            name: '2',
            component: 'historycomment',
          },
          {
            index: 3,
            title: '基本信息',
            name: '3',
            component: 'baseInfo',

          }];
      }
      if (path === '/newSSG/comment/2') {
        this.levelStatus = '3';
        this.tabList = [
          {
            index: 1,
            title: '已审核点评',
            name: '1',
            component: 'auditedComment',
          },
          {
            index: 2,
            title: '历史点评',
            name: '2',
            component: 'historycomment',
          },
          {
            index: 3,
            title: '基本信息',
            name: '3',
            component: 'baseInfo',

          }];
      }
      if (path === '/newSSG/comment/3') {
        this.levelStatus = '4';
        this.tabList = [{
          index: 1,
          title: '已驳回点评',
          name: '1',
          component: 'nopassComment',
        },
        {
          index: 2,
          title: '历史点评',
          name: '2',
          component: 'historycomment',
        },
        {
          index: 3,
          title: '基本信息',
          name: '3',
          component: 'baseInfo',

        }];
      }
    } else {
      if (path === '/newSSG/comment/0') {
        this.levelStatus = '';
        this.tabList = [{
          index: 0,
          title: '新增点评',
          name: '0',
          component: 'addComment',
        },
        {
          index: 1,
          title: '历史点评',
          name: '1',
          component: 'historycomment',
        },
        {
          index: 2,
          title: '基本信息',
          name: '2',
          component: 'baseInfoCT',

        },
        {
          index: 3,
          title: '财务指标',
          name: '3',
          component: 'finalDataCT',

        }];
      }
      if (path === '/newSSG/comment/1') {
        this.levelStatus = '2';
        this.tabList = [
          {
            index: 1,
            title: '待审核点评',
            name: '1',
            component: 'auditComment',
          },
          {
            index: 2,
            title: '历史点评',
            name: '2',
            component: 'historycomment',
          },
          {
            index: 3,
            title: '基本信息',
            name: '3',
            component: 'baseInfoCT',

          },
          {
            index: 4,
            title: '财务指标',
            name: '4',
            component: 'finalDataCT',

          }];
      }
      if (path === '/newSSG/comment/2') {
        this.levelStatus = '3';
        this.tabList = [
          {
            index: 1,
            title: '已审核点评',
            name: '1',
            component: 'auditedComment',
          },
          {
            index: 2,
            title: '历史点评',
            name: '2',
            component: 'historycomment',
          },
          {
            index: 3,
            title: '基本信息',
            name: '3',
            component: 'baseInfoCT',

          },
          {
            index: 4,
            title: '财务指标',
            name: '4',
            component: 'finalDataCT',

          }];
      }
      if (path === '/newSSG/comment/3') {
        this.levelStatus = '4';
        this.tabList = [{
          index: 1,
          title: '已驳回点评',
          name: '1',
          component: 'nopassComment',
        },
        {
          index: 2,
          title: '历史点评',
          name: '2',
          component: 'historycomment',
        },
        {
          index: 3,
          title: '基本信息',
          name: '3',
          component: 'baseInfoCT',

        },
        {
          index: 4,
          title: '财务指标',
          name: '4',
          component: 'finalDataCT',

        }];
      }
    }

    this.tabName = this.tabList[0].name;
  },
};
</script>

<style>

</style>
