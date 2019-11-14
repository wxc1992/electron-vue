<template>
<div class="filter">
    <el-select v-model="plateSelected" placeholder="板块">
        <el-option v-for="item in plates" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
    </el-select>
    <el-select v-model="reportSelected" placeholder="报告期">
        <el-option v-for="item in reportDate" :key="item.id" :label="item.content" :value="item.id">
        </el-option>
    </el-select>
</div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
      plates: [],
      reportDate: [],
      plateVal: '',
      reportVal: '',
    };
  },
  created() {
    Promise.all([this.getFilters({ type: 33 }), this.getFilters({ type: 35 })]).then(([plates, reportDate]) => {
      console.log('get mapping:', plates, reportDate);
      this.plates = plates.data;
      this.plateSelected = this.plates[0].id;
      this.reportDate = reportDate.data.sort((a, b) => parseInt(b.name) - parseInt(a.name));
      this.reportSelected = this.reportDate[0].id;
      const origin = { plates: this.plates, reportDate: this.reportDate };
      this.setCreditFilter({ origin });
    });
  },
  methods: {
    ...mapActions(['getFilters']),
    ...mapMutations(['setCreditFilter']),
  },
  computed: {
    ...mapGetters(['getCreditFilter']),
    plateSelected: {
      get() {
        return this.getCreditFilter.plateValue;
      },
      set(plateValue) {
        this.setCreditFilter({ plateValue });
      },
    },
    reportSelected: {
      get() {
        return this.getCreditFilter.dateValue;
      },
      set(dateValue) {
        this.setCreditFilter({ dateValue });
      },
    },
  },
};
</script>
<style scoped lang="less">
.filter{
    padding:20px;
    border-bottom: 1px solid #dcdfe6;
}
</style>

