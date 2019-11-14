<template>
<div class="chartTable">
    <div class="operations">
        <div class="tabs autofit">
            <el-button-group>
                <el-button @click="toggleContent(true)" :autofocus="true" size="small">图</el-button>
                <el-button @click="toggleContent(false)" size="small">表</el-button>
            </el-button-group>
        </div>
        <div class="dateRange autofit">
            <el-date-picker v-model="startDate" type="date" value-format="yyyy-MM-dd" placeholder="开始日期">
            </el-date-picker>至
            <el-date-picker v-model="endDate" type="date" value-format="yyyy-MM-dd" placeholder="结束日期">
            </el-date-picker>
        </div>
        <div class="buttons autofit">
            <el-button type="primary" size="small" @click="onSearch">{{formConfig.search&&formConfig.search.text||'查询'}}</el-button>
            <el-button type="primary" size="small" @click="onCalc">{{formConfig.caculate&&formConfig.caculate.text||'计算'}}</el-button>
        </div>
    </div>
    <div class="tabContent">
        <div class="chart" v-if="showChart" v-loading="chartLoading">
            <Echarts :options="chartOptions"></Echarts>
        </div>
        <div class="table" v-if="!showChart" v-loading="tableLoading">
            <el-table :data="tableRows.values" style="width: 100%" :border="true">
                <el-table-column v-for="column in tableRows.columns" :key="column.prop" :prop="column.prop" :label="column.label">
                    <template slot-scope="scope">{{scope.row[column.prop]|reserve2Decimal}}</template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" background layout="total, prev, pager, next" :total="total" :page-size="pageSize" @current-change="switchPage" :current-page.sync="curPage">
            </el-pagination>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Echarts from 'vue-echarts';
import moment from 'moment';

function getChartOption(title) {
  return {
    title: {
      text: title,
      left: 'center',
    },
    color: ['#5994E2', '#E98052', '#52B2E2', '#F4CF65', '#869EF3', '#F78E8E', '#45C3D7', '#F1B885', '#9BE5CA', '#C55C8E', '#9FADCC', '#FDD7A2', '#677DAF', '#4B8CA8', '#7067D3', '#7F6695', '#9C8058', '#724B4B', '#61777A', '#1C5695'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    dataZoom: [{
      type: 'slider',
      start: 0,
      end: 100,
    }],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [{
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true,
      },
    }],
    yAxis: [{
      type: 'value',
      name: '占比(%)',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: '16',
      },
      boundaryGap: ['0', '0.02'],
    }],
    series: [],
  };
}

function getAttrs(obj, attrs) {
  if (!attrs || !obj) {
    return;
  }
  const attrArray = attrs.split('.');
  for (const attr of attrArray) {
    obj = obj && obj[attr];
  }
  return obj;
}

export default {
  data() {
    return {
      chartLoading: false,
      tableLoading: false,
      showChart: true,
      chartOptions: getChartOption(this.title),
      tableRows: this.tableData,
      startDate: moment(+new Date()).subtract(1, 'months').format('YYYY-MM-DD'),
      endDate: moment(+new Date()).format('YYYY-MM-DD'),
      total: 0,
      pageSize: 10,
      curPage: 1,
    };
  },
  props: {
    formConfig: {
      type: Object,
      default() {
        return {
          search: {
            text: '',
            handler: null,
          },
          caculate: {
            text: '',
            handler: null,
          },
          beginDate: '',
          endDate: '',
        };
      },
    },
    chartConfig: {
      type: Object,
    },
    calcAction: {
      type: Object,
    },
    chartData: {
      type: Object,
      default() {
        return {};
      },
    },
    chartType: {
      type: String,
      default: 'line',
    },
    tableData: {
      type: Object,
      default() {
        return {
          columns: [],
          values: [],
        };
      },
    },
    paganation: {
      type: Object,
      default() {
        return {};
      },
    },
    selfDrive: {
      type: Object,
      default() {
        return {};
      },
    },
    title: {
      type: String,
      default: '',
    },
    dataAction: {
      type: Object,
    },
  },
  created() {
    this.initChartOption();
    this.setOptions('xAxis.0.data', this.chartData.xData);
    // this.mergeSerials(this.chartData.series);
    // this.setOptions('title.text', this.title);
    const formCfg = this.formConfig;
    const beginDate = new Date().getTime();
    console.log(beginDate, 'kkkk');
    // beginDate.setFullYear(beginDate.getFullYear() - 8);
    // console.log(beginDate,'vovovov')
    // this.startDate = formCfg.beginDate;
    // this.endDate = formCfg.endDate;
    //
    this.fetchData(null, 'chart');
  },
  methods: {
    initChartOption() {
      const keys = Object.keys(this.chartConfig);
      this.commonSeries = this.commonSeries || {};
      const seriesExp = /^series\.?/;
      for (const key of keys) {
        const value = this.chartConfig[key];
        if (seriesExp.test(key)) {
          this.createObjByProps(key, value, this.commonSeries);
          continue;
        }
        this.setOptions(key, value);
      }
      // this.setOptions('title.text', title);
      // this.setOptions('yAxis.name', yTitle);
    },
    updateTablechart(data = {}, type = 'chart') {
      const xData = data.xData || [];
      const startDate = xData[0];
      const endDate = new Date();
      if (startDate) {
        this.startDate = startDate;
        this.endDate = endDate;
      }
      if (type === 'table') {
        this.tableRows = data;
        this.total = data.total;
        return;
      }
      if (type === 'chart') {
        this.setOptions('xAxis.0.data', data.xData);
        let unit = '占比(%)';
        if (data.unit) {
          unit = `单位(${data.unit})`;
        }
        this.setOptions('yAxis.0.name', unit);
        this.mergeSerials(this.commonSeries.series, data.series);
      }
    },
    fetchData(extraParam = {}, type = 'chart') {
      const loadingStr = `${type}Loading`;
      this[loadingStr] = true;
      const { dataAction = {}, actionParams = {}, actionRes = {} } = this.dataAction;
      const reqFunc = dataAction[type];
      let reqParams = actionParams[type];
      const finalParams = {};
      const response = actionRes[type];
      const paramsNames = Object.keys(reqParams);
      const vmData = this.$data;
      for (const name of paramsNames) {
        if (vmData[name] && !finalParams[name]) {
          finalParams[name] = this[name];
        }
      }
      reqParams = { ...reqParams, ...finalParams, ...extraParam };
      reqFunc(reqParams).then((result) => {
        this[loadingStr] = false;
        if (result.status !== '0000') {
          this.$message.error('请求数据失败');
          return;
        }
        const finalData = response(result);
        this.updateTablechart(finalData, type);
      }).catch((err) => {
        this.$message.error('获取数据失败');
        this.updateTablechart({}, type);
        this[loadingStr] = false;
      });
    },
    toggleContent(value) {
      this.showChart = value;
      if (!value) {
        this.fetchData(null, 'table');
      }
    },
    onSearch() {
      const handler = this.formConfig.search.handler || (() => {
        this.fetchData(null, 'table');
        this.fetchData(null, 'chart');
      });
      const moduleName = getAttrs(this.chartOptions, 'title.text');
      handler(moduleName);
      this.$emit('onSearch', moduleName);
    },
    onCalc() {
      const handler = this.formConfig.caculate.handler || (() => {
        this.defCaculate();
      });
      const moduleName = getAttrs(this.chartOptions, 'title.text');
      handler(moduleName);
      this.$emit('onCalc', moduleName);
    },
    defCaculate() {
      const {
        calcAction,
        calcParams = {},
        calcCallback,
      } = this.calcAction;
      if (calcAction) {
        const endDate = this.endDate;
        calcAction({
          ...calcParams,
          endDate,
        }).then((result) => {
          if (result.status === '0000') {
            this.$message.success('计算成功');
          } else {
            this.$message.error(result.msg);
          }
          if (calcCallback) {
            calcCallback(result.data);
            return;
          }
          this.fetchData(null, 'chart');
          this.fetchData(null, 'table');
        }).catch((err) => {});
      }
      this.$emit('onCalc');
    },
    switchPage(curPage) {
      const pageNo = curPage;
      this.fetchData({
        pageNo,
        pageNum: pageNo,
      }, 'table');
      this.$emit('onPagechange', curPage);
    },
    mergeSerials(preset = {}, inputSerials) {
      if (!inputSerials || !Array.isArray(inputSerials)) {
        console.log('inputSerials must be an array');
        return;
      }
      inputSerials = inputSerials.map(serial => ({
        ...preset,
        ...serial,
      }));
      this.setOptions('series', inputSerials);
    },
    setOptions(propString, value) {
      if (!propString) {
        return;
      }
      let options = this.chartOptions;
      const props = propString.split('.');
      for (var idx = 0, len = props.length; idx < len - 1; idx++) {
        const prop = props[idx];
        options = options[prop] || {};
      }
      options[props[idx]] = value;
    },
    createObjByProps(propString, value, obj) {
      if (!propString) {
        return;
      }
      const newObj = obj || {};
      let pointer = newObj;
      const props = propString.split('.');
      for (var idx = 0, len = props.length; idx < len - 1; idx++) {
        const prop = props[idx];
        if (!pointer[prop]) {
          pointer[prop] = {};
        }
        pointer = pointer[prop];
      }
      pointer[props[idx]] = value;
      return newObj;
    },
  },
  watch: {
    startDate(val) {
      this.$emit('onStartdate', val);
    },
    chartConfig: {
      handler() {
        this.initChartOption();
      },
      deep: true,
    },
    endDate(val) {
      this.$emit('onEnddate', val);
    },
    chartConfig: {
      handler() {
        this.initChartOption();
      },
      deep: true,
    },
    dataAction: {
      handler() {
        this.fetchData(null, 'chart');
        this.fetchData(null, 'table');
      },
      deep: true,
    },
  },
  components: {
    Echarts,
  },
};
</script>

<style scoped>
.chartTable {
    min-width: 795px;
}

.operations {
    display: flex;
    justify-content: space-between;
}

.operations .autofit {
    flex: 1 1 auto;
}

.operations .dateRange {
    display: flex;
    font-size: 14px;
    line-height: 34px;
}

.operations .dateRange .el-date-editor.el-input {
    width: 200px;
}

.operations .tabs button {
    width: 75px;
    margin-top: 1px;
}

.operations .buttons button {
    width: 108px;
    margin-top: 1px;
}

.chartTable .tabContent .echarts {
    width: 100%;
}

.chartTable .tabContent .pagination {
    text-align: right;
}

.chartTable .tabContent {
    margin-top: 20px;
}

.chartTable .table {
    height: 400px;
}
</style>
