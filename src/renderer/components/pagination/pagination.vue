<template>
<div>
  <div class="allpagination" v-if="sizepage==4">
      <el-pagination
      @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[4]"
        :page-size="4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allpage">
      </el-pagination>
    </div>
    <div class="allpagination" v-else>
      <el-pagination
      @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allpage">
      </el-pagination>
    </div>


</div>

</template>
<script>
export default {
  name: 'pagination',
  props: {
    allpage: {
      type: Number,
      default() {
        return 0;
      },
    },
    sizepage: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {
      showCount: 10,
      currentPage: 1,
    };
  },
  watch: {},
  methods: {
    handleSizeChange(val) {
      this.showCount = val;
      this.$emit('showCount', this.showCount);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit('currentPage', this.currentPage);
    },
  },
};
</script>
<style>

</style>


