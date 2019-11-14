<template>
  <div id="marsMAp">
    <commonSeacher   @sendParams="sendParams" :type="typeparams" :showCt="showCt"></commonSeacher>
    <el-dialog
      title=""
      :visible.sync="showMarsDio"
      width="600px">
      <div class="chartWrap" style="position: relative">
            <h1 style="position: absolute;top: 0;left: 25px;">MARS评分图</h1>
            <h2 style="position: absolute;top: 140px;left: 30px;color:#72acd1;">{{marsLevel}}</h2>
            <Vchart ref="vchart" :options="chartOption"></Vchart>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="showMarsDio = false">取 消</el-button> -->
        <!-- <el-button type="primary" @click="showMarsDio = false">确 定</el-button> -->
      </span>
    </el-dialog>
   <detailDio :showPdf="showPdf" :dialogVisible="dialogVisible" :tableDatadio="tableDatadio" @sendHide="sendHide" :chartOption="chartOption" :rowData="rowData"></detailDio>
   <detailDioCity :showPdf="showPdf" :dialogVisible="dialogVisible1" :tableDatadio="tableDatadio" @sendHide="sendHide" :chartOption="chartOption" :rowData="rowData"></detailDioCity>
   <el-card class="mainMars" :style="{'height':cardHeight-6+ 'px'}">
     <el-table
        :row-class-name="tableRowClassName"
         :data="expandCals"
         v-loading="loading"
         @row-dblclick="rowdblclick"
         @sort-change="sortColumn"
        :height="cardHeight-80"
        style="width: 100%">
        <el-table-column
          type="index"
          label="+"
          width="100">
        </el-table-column>
         <el-table-column
          prop="compName"
          label="主体名称">
          <template slot-scope="scope">
            <a href="javascript:;" style="text-decoration: none;color:#409EFF;">{{scope.row.compName}}</a>
            <a href="javascript:;" @click="showMars(scope.row)" style="width:16px;height:16px;text-align: center;line-height: 16px;margin-left: 10px;"><img src="../../../../static/files/scope.png" style="width:10px;height:10px;"></a>
          </template>
        </el-table-column>
        <el-table-column
          prop="gradeLevel"
          sortable="custom"
          label="MARS评级">
        </el-table-column>
        <!-- <el-table-column
          prop="s_majority_shareholder"
          label="股东控股性质">
        </el-table-column> -->
      </el-table>
      <el-pagination
         style="margin-top:10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30,60, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
   </el-card>
  </div>
</template>

<script>
import commonSeacher from './component/commonSeacherMars.vue';
import detailDio from './component/creatingMaindio.vue';
import detailDioCity from './component/creatingMaindioCity.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import Echarts from 'vue-echarts';
const permissionMap = {
  mainButton: ['ss_all', 'ssg3.0', 'mars_main'],
};
function convertLevel(level) {
  level = level || 'E';
  return Math.abs(level.charCodeAt(0) - 70);
}
const scoreMap = {
  AAA: 90,
  AA: 80,
  A: 70,
  BBB: 60,
  BB: 50,
  B: 40,
  CCC: 30,
  CC: 20,
};
export default {
  data() {
    return {
      tableData: [],
      pageparams: {},
      cardHeight: 0,
      showPdf: false,
      pageSize: 20,
      currentPage: 1,
      typeparams: '1',
      loading: false,
      showCt: true,
      total: 0,
      moduleId: +localStorage.getItem('modulId') || null,
      showMarsDio: false,
      marsLevel: '',
      dialogVisible: false,
      dialogVisible1: false, // 城投的弹窗
      tableDatadio: {},
      sortparams: {},
      levelData: [],
      rowData: {},
      chartOption: {
        title: {
          text: '',
          textStyle: {
            color: '#666',
          },
        },
        // tooltip: {
        //     trigger: 'item',
        //     // formatter: function (params, ticket, callback) {
        //     //     console.log('##params:', params);
        //     //     return '每个维度的评价是根据评级模型中多个指标的分数加总后再分级，用来衡量企业相应维度在行业中的排名；</br>部分定性指标不在这六个维度内，例如股东性质、融资渠道多样性等；</p></br>\
        //     //     <p>行业地位——主要包括地产企业排名、净资产、销售商品提供劳务收到的现金、是否上市等；</p>\
        //     //     <p>资产负债能力——主要指标包括有息资本负债率、对外担保比率等；</p>\
        //     //     <p>盈利能力——主要包括毛利率、净利率、ROA、ROE、销售商品提供劳务收到的现金增长等；</p>\
        //     //     <p>短期偿债能力——主要包括流比、速比、现金比、投资性地产占比、长短期有息债务比、EBITDA利息保障倍数等；</p>\
        //     //     <p>营运能力——主要包括销售回款率、总资产周转速度等；</p>\
        //     //     <p>土储布局优势——包括土储在各地区的分布、各地房价收入比、一般预算收入增长、城市等级等。</p>'
        //     // },
        //     position:['-8%','50%'],
        //     textStyle:{
        //         lineHeight:10
        //     }
        // },
        radar: [{
          indicator: [
            {
              text: '规模水平',
              max: 5,
            },
            {
              text: '资产负债能力',
              max: 5,
            },
            {
              text: '盈利能力',
              max: 5,
            },
            {
              text: '偿债能力',
              max: 5,
            },
            {
              text: '营运能力',
              max: 5,
            },
            {
              text: '产业布局',
              max: 5,
            },
          ],
          center: ['50%', '50%'],
          radius: 120,
          startAngle: 90,
          splitNumber: 5,
          shape: 'rect',
          name: {
            formatter: '{value}',
            textStyle: {
              color: '#72ACD1',
            },
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(114, 172, 209, 0.2)',
                'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)',
              ],
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10,
            },
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
        }],
        series: [{
          name: 'MARS评分图',
          type: 'radar',
          itemStyle: {
            emphasis: {
              // color: 各异,
              lineStyle: {
                width: 4,
              },
            },
          },
          data: [{
            value: this.levelData,
            name: '图一',
            symbolSize: 5,
            areaStyle: {
              normal: {
                color: 'rgba(255, 255, 255, 0.5)',
              },
            },
          }],
        }],
      },
    };
  },
  created() {
    const isshow = this.buttonRights.watch;
    console.log(isshow);
    if (!isshow) {
      this.$message.warning('没有该菜单');
      this.$router.push('/');
    }
    this.showPdf = this.buttonRights.export_pdf;
    this.getMainData();
  },
  mounted() {
    const that = this;
    setTimeout(() => {
      that.cardHeight = window.innerHeight - 330;
    }, 200);
    this.$winResize.add(() => {
      clearTimeout(this.delay);
      this.delay = setTimeout(() => {
        that.cardHeight = window.innerHeight - 330;
      }, 200);
    });
  },
  watch: {
    moduleId(val) {
      console.log('mouduleIdQQQQQQQQQQQQQQQ', val);
      // if( val==5035||val==5036 || val==6001 || val==6002 || val==6003 || val==6004){
      //    this.chartOption.radar[0].indicator = [
      //           {
      //               text: '规模水平',
      //               max: 5
      //           },
      //           {
      //               text: '资产负债能力',
      //               max: 5
      //           },
      //           {
      //               text: '盈利能力',
      //               max: 5
      //           },
      //           {
      //               text: '偿债能力',
      //               max: 5
      //           },
      //           {
      //               text: '营运能力',
      //               max: 5
      //           },
      //           {
      //               text: '产业布局',
      //               max: 5
      //           }]
      // }
      //  if(val==5053){
      //    this.chartOption.radar[0].indicator = [
      //         {
      //             text: '行业地位',
      //             max: 5
      //         },
      //         {
      //             text: '资产负债能力',
      //             max: 5
      //         },
      //         {
      //             text: '盈利能力',
      //             max: 5
      //         },
      //         {
      //             text: '短期偿债能力',
      //             max: 5
      //         },
      //         {
      //             text: '营运能力',
      //             max: 5
      //         },
      //         {
      //             text: '土储布局优势',
      //             max: 5
      //         }]
      // }
      //  if(val == 5034){
      //   this.chartOption.radar[0].indicator= [{
      //                       text: '地区GDP',
      //                       max: 90
      //                   },
      //                   {
      //                       text: '城市及区位优势',
      //                       max: 90
      //                   },
      //                   {
      //                       text: '政府债务率',
      //                       max: 90
      //                   },
      //                   {
      //                       text: '政策支持',
      //                       max: 90
      //                   },
      //                   {
      //                       text: '项目补助制度',
      //                       max: 90
      //                   },
      //                   {
      //                       text: '资产流动性',
      //                       max: 90
      //                   },
      //                   {
      //                       text: '资产负债率',
      //                       max: 90
      //                   },
      //                   {
      //                       text: '资产总额',
      //                       max: 90
      //                   }
      //               ]
      //    }
    },
  },
  computed: {
    buttonRights() {
      const menulist = JSON.parse(localStorage.getItem('menu'));
      const rets = this.parseRightsData(menulist, 0);
      const ret = {};
      if (rets instanceof Array) {
        rets.forEach((val) => {
          ret[val.resCode] = true;
        });
      }
      console.log('get ret of button rights:', ret);
      return ret;
    },
    expandCals() {
      return this.tableData.map((curValue, index) => {
        const cals = curValue.cals || [];
        for (const cal of cals) {
          if (cal.fieldCode && cal.tradeType == '2') {
            curValue[cal.fieldCode] = cal.calValue || '';
          }
        }
        console.log('curValue', curValue);
        return curValue;
      });
    },
  },
  methods: {
    ...mapActions(['getmodCreditSubjectNewMARS', 'getMainInfo', 'getMainComment']),
    innitChart(scope, arr) {
      let newArr = [];
      //  console.log('scope++++++',scope)
      if (scope.moduleId == 5035 || scope.moduleId == 5035 || scope.moduleId == 5036 || scope.moduleId == 6001 || scope.moduleId == 6002 || scope.moduleId == 6003 || scope.moduleId == 6004) {
        const {
          s_scale_level,
          s_industry_status,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_industry_layout,
        } = scope;
        newArr = [convertLevel(s_scale_level), convertLevel(s_industry_status), convertLevel(s_profitability), convertLevel(s_short_term_solvency), convertLevel(s_management_ability), convertLevel(s_industry_layout)];
      } else if (scope.moduleId == 5053) {
        const {
          s_industry_status,
          s_asset_liability_capability,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_soil_storage_layout,
        } = scope;
        newArr = [convertLevel(s_industry_status), convertLevel(s_asset_liability_capability), convertLevel(s_profitability), convertLevel(s_short_term_solvency), convertLevel(s_management_ability), convertLevel(s_soil_storage_layout)];
      } else if (scope.moduleId == 5034) {
        const {
          s_region_gdp,
          s_zone_superiority_level,
          s_policy_support_level,
          s_project_subsidy_system_level,
          s_debttoassets,
          s_liquidity_of_assets_level,
          s_government_debt_ratio,
          s_total_assets,
        } = scope;
        newArr = [scoreMap[s_region_gdp],
          scoreMap[s_zone_superiority_level],
          scoreMap[s_government_debt_ratio],
          scoreMap[s_policy_support_level],
          scoreMap[s_project_subsidy_system_level],
          scoreMap[s_liquidity_of_assets_level],
          scoreMap[s_debttoassets],
          scoreMap[s_total_assets]];
      }

      console.log('thisLevel', newArr);
      this.chartOption.series[0].data[0].value = newArr;
    },
    showMars(scope) {
      //  this.showMarsDio = true
      //  debugger
      this.levelData = [];
      console.log('scope++++++', scope);
      this.marsLevel = scope.gradeLevel;
      if (scope.moduleId == 5035 || scope.moduleId == 5036 || scope.moduleId == 6001 || scope.moduleId == 6002 || scope.moduleId == 6003 || scope.moduleId == 6004) {
        this.chartOption.radar[0].indicator = [
          {
            text: '规模水平',
            max: 5,
          },
          {
            text: '资产负债能力',
            max: 5,
          },
          {
            text: '盈利能力',
            max: 5,
          },
          {
            text: '偿债能力',
            max: 5,
          },
          {
            text: '营运能力',
            max: 5,
          },
          {
            text: '产业布局',
            max: 5,
          }];
      }
      if (scope.moduleId == 5053) {
        this.chartOption.radar[0].indicator = [
          {
            text: '行业地位',
            max: 5,
          },
          {
            text: '资产负债能力',
            max: 5,
          },
          {
            text: '盈利能力',
            max: 5,
          },
          {
            text: '短期偿债能力',
            max: 5,
          },
          {
            text: '营运能力',
            max: 5,
          },
          {
            text: '土储布局优势',
            max: 5,
          }];
      }
      if (scope.moduleId == 5034) {
        this.chartOption.radar[0].indicator = [
          {
            text: '地区GDP',
            max: 90,
          },
          {
            text: '城市及区位优势',
            max: 90,
          },
          {
            text: '政府债务率',
            max: 90,
          },
          {
            text: '政策支持',
            max: 90,
          },
          {
            text: '项目补助制度',
            max: 90,
          },
          {
            text: '资产流动性',
            max: 90,
          },
          {
            text: '资产负债率',
            max: 90,
          },
          {
            text: '资产总额',
            max: 90,
          },
        ];
      }

      //  debugger
      console.log('scope++++++', scope);
      if (scope.moduleId == 6004 || scope.moduleId == 5035 || scope.moduleId == 5035 || scope.moduleId == 5036 || scope.moduleId == 6001 || scope.moduleId == 6002 || scope.moduleId == 6003) {
        const {
          s_scale_level,
          s_industry_status,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_industry_layout,
        } = scope;
        this.levelData = [
          s_scale_level,
          s_industry_status,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_industry_layout,
        ];
      } else if (scope.moduleId == 5053) {
        const {
          s_industry_status,
          s_asset_liability_capability,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_soil_storage_layout,
        } = scope;
        this.levelData = [
          s_industry_status,
          s_asset_liability_capability,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_soil_storage_layout,
        ];
      } else if (scope.moduleId == 5034) {
        const {
          s_region_gdp,
          s_zone_superiority_level,
          s_policy_support_level,
          s_project_subsidy_system_level,
          s_debttoassets,
          s_liquidity_of_assets_level,
          s_government_debt_ratio,
          s_total_assets,
        } = scope;
        // this.levelData = [
        //     scoreMap[s_region_gdp],
        //     scoreMap[s_zone_superiority_level],
        //     scoreMap[s_government_debt_ratio],
        //     scoreMap[s_policy_support_level],
        //     scoreMap[s_project_subsidy_system_level],
        //     scoreMap[s_liquidity_of_assets_level],
        //     scoreMap[s_debttoassets],
        //     scoreMap[s_total_assets]
        // ]
        this.levelData = [
          s_region_gdp,
          s_zone_superiority_level,
          s_policy_support_level,
          s_project_subsidy_system_level,
          s_debttoassets,
          s_liquidity_of_assets_level,
          s_government_debt_ratio,
          s_total_assets,
        ];
      }
      console.log('thisLevel', this.levelData);
      const show = this.levelData.every(item => item == 'undefined' || item == undefined);
      console.log(show);
      if (show) {
        this.$message.warning('此数据没有MARS评分图');
      } else {
        // debugger
        const arr = [];
        this.levelData.forEach((item) => {
          if (scope.moduleId == 5034) {
            item = item == 'undefined' || item == undefined ? 20 : item;
          } else {
            item = item == 'undefined' || item == undefined ? 'E' : item;
          }
          arr.push(item);
        });
        this.showMarsDio = true;
        this.innitChart(scope, arr);
        //  this.$nextTick(()=>{

        //     // this.chartOption.series[0].data[0].value = arr;
        //  })
      }
    },
    sendHide(val) {
      console.log(this.moduleId, val, '////////');
      if (this.moduleId == '5034') {
        this.dialogVisible1 = false;
      } else {
        this.dialogVisible = false;
      }
    },
    parseRightsData(entry, codeIndex) {
      const resCode = permissionMap.mainButton[codeIndex++];
      if (Array.isArray(entry)) {
        for (var item of entry) {
          if (item.resCode === resCode) {
            return this.parseRightsData(item, 0);
          }
        }
      }
      const nextCode = permissionMap.mainButton[codeIndex];
      if (!nextCode) {
        return entry.childs || [];
      }
      const children = entry.childs || [];
      if (children.length === 0) {
        return [];
      }
      let found = false;
      for (var item of children) {
        if (nextCode === item.resCode) {
          found = true;
          return this.parseRightsData(item, codeIndex);
        }
      }
      if (!found) {
        return [];
      }
    },
    async rowdblclick(row, column, event) {
      console.log('rowdblclick--row', row);
      this.rowData = row;
      this.moduleId = row.moduleId;
      console.log('rowdblclick--column', column);
      console.log('rowdblclick--event', event);
      const res = await this.getMainInfo({ id: row.id });
      console.log('showDetail', res);
      if (res.status === 200 && res.data.status === '0000') {
        this.tableDatadio.baseInfo = res.data.data;
        console.log('this.tableDatadio', this.tableDatadio);
      } else {
        this.tableDatadio.baseInfo = {};
      }
      const res2 = await this.getMainComment({ moduleId: row.moduleId, compName: row.compName });
      console.log('showDetail!!!!!!!!!!', res2);
      console.log('showDetail!!!!!!!!!!', row.moduleId);

      if (res2.status === 200 && res.data.status === '0000') {
        for (const key in res2.data.data) {
          if (res2.data.data[key] == null) {
            res2.data.data[key] = '';
          }
        }
        this.tableDatadio.formData = res2.data.data;
        console.log('this.tableDatadio.formData', this.tableDatadio.formData);
      } else {
        this.$message.error('点评数据获取失败');
        this.tableDatadio.formData = {};
      }
      if (row.moduleId != '5034') {
        this.dialogVisible = true;
      } else {
        this.dialogVisible1 = true;
      }
    },
    sortColumn(column) {
      console.log('coloumn', column);
      const sortParam = {};
      const order = column.order;
      if (order) {
        let prop = column.prop;
        if (prop === 'isWhite') {
          prop = 'is_white';
        }
        if (prop === 'gradeLevel') {
          prop = 'grade_level';
        }
        sortParam.sort = prop;
        sortParam.sortValue = column.order.slice(0, -6);
        this.sortparams = { ...sortParam };
        this.getMainData({ ...sortParam });
      }
    },
    getMainData(otherparam) {
      this.loading = true;
      const params = {
        moduleId: this.moduleId,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        tradeType: 2,
        ...otherparam,
      };
      this.getmodCreditSubjectNewMARS(params).then((res) => {
        console.log('getmodCreditSubjectNewMARS', res);
        if (res.status === 200 && res.data.status === '0000') {
          const arr = Object.keys(res.data.data);
          if (arr.length !== 0) {
            this.tableData = res.data.data.rows;
            this.total = res.data.data.total || 0;
            this.loading = false;
          } else {
            this.tableData = [];
            this.total = 0;
            this.loading = false;
          }
        } else {
          this.tableData = [];
          this.total = 0;
          this.loading = false;
        }
      });
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      this.getMainData({ ...this.sortparams, ...this.pageparams });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.current, val);
      this.getMainData({ ...this.sortparams, ...this.pageparams });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return 'warning-row';

      return '';
    },
    //  sendModuleId(val){
    //   this.currentPage = 1
    //   this.moduleId =val
    //   console.log(val)
    //   // this.getColumn()
    //   this.getMainData({})
    // },
    sendParams(val) {
      console.log(val);
      this.currentPage = 1;
      this.moduleId = val.moduleId;
      this.pageparams = val;
      this.getMainData(val);
    //  let params = {
    //    ...val
    //  }
    },
  },
  components: {
    commonSeacher,
    Vchart: Echarts,
    detailDio,
    detailDioCity,
  },
};
</script>

<style lang="less" scoped>
  #marsMAp{
     width: 98%;
     margin:0 auto;
    //  margin-top:20px;
   .mainMars{
     margin-top: 20px;
   }
   .chartWrap .echarts {
     margin: 0 auto;
     margin-left: 54px;
     margin-top: 20px;
      height: 320px;
    }
  }
</style>
