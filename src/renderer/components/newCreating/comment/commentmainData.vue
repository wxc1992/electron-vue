<template>
  <div id="commentPio">
    <seacherDio :type="typeparams"></seacherDio>
    <Table :cardHeight="cardHeight"></Table>
    <outputDio :rosterlist="rosterlist"></outputDio>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import seacherDio from './comentSeacher.vue';
import Table from './comment_table.vue';
import outputDio from './commentDio';
export default {
  data() {
    return {
      cardHeight: 0,
      rosterlist: [],
      typeparams: '2',
    };
  },
  computed: {

  },
  methods: {
    ...mapActions(['getNewrosterList']),
    getroster() {
      this.getNewrosterList().then((res) => {
        console.log('getNewrosterListQQQQQQQQQQQQQQQQ', res);
        if (res.status === 200 && res.data.status == '0000') {
          if (res.data.data.length > 0) {
            this.rosterlist = res.data.data;
          } else {
            // this.$message.warning('准入白名单为空')
            this.rosterlist = [];
          }
        }
      });
    },
  },
  mounted() {
    // debugger

    const that = this;
    setTimeout(() => {
      that.cardHeight = window.innerHeight - 303;
    }, 200);
    this.$winResize.add(() => {
      clearTimeout(this.delay);
      this.delay = setTimeout(() => {
        that.cardHeight = window.innerHeight - 303;
      }, 200);
    });
    this.getroster();
  },
  components: {
    seacherDio,
    Table,
    outputDio,
  },
};
</script>

<style lang="less" scoped>
  #commentPio{
    .box-card{
      margin-top: 20px;
    }
  }
</style>
