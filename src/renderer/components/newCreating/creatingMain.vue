<template>
  <div id="creatingMainview">
    <div style="width:100%" class="clearfix">
      <div class="typeChangebutton">
         <div class="box-card" style="height: 156px;background: #fff;">
             <!-- <div class="cardItem"> -->
                <!-- <div class="title">板块</div> -->
                  <!-- <el-select v-model="typeChangebutton" placeholder="请选择产业" style="width:100%;margin-top:-3px;">
                    <el-option label="城投" value="1"></el-option>
                    <el-option label="行业" value="2"></el-option>
                </el-select> -->

              <!-- </div> -->
               <div class="header" style="width: 100%">
                  板块管理
                </div>
                <div>
                  <el-tabs tab-position="right" style="width: 100%" v-model="typeChangebutton">
                    <el-tab-pane style="width:100%;height:40px;line-height:40px;" label="产业" name="2"></el-tab-pane>
                    <el-tab-pane style="width:100%;height:40px;line-height:40px;" label="城投" name="1"></el-tab-pane>
                  </el-tabs>
                </div>
         </div>
      </div>
      <div style="width:86%;float:right" ref="searcherbox">
         <commonSeacher @sendParams="sendParams" @sendOtherMoudleId="sendOtherMoudleId" v-if="typeChangebutton == '2'" :showCt="showCt"></commonSeacher>
         <commonSeacherCt @sendParams="sendParams" v-if="typeChangebutton == '1'" :citComName="citComName" :clearSearch="clearSearch" :mapParams="mapParams"></commonSeacherCt>
      </div>
    </div>

    <div v-show="isCityInvest" class="chinaMap">

        <el-dialog
          title="提示"
          :visible.sync="showMapUpdate"
          width="600px">
          <el-form :model="updateForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="省份" prop="name">
              <el-input v-model="updateForm.province" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="地级市" prop="city" v-if="updateForm.city">
              <el-input v-model="updateForm.city" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="区县" prop="district" v-if="updateForm.district">
              <el-input v-model="updateForm.district" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="GDP(亿元)" prop="gdp">
              <el-input v-model="updateForm.gdp"></el-input>
            </el-form-item>
            <el-form-item label="一般预算收入(亿元)" prop="generalRevenue">
              <el-input v-model="updateForm.generalRevenue"></el-input>
            </el-form-item>
            <el-form-item label="政府性基金收入(亿元)" prop="governmentFundRevenue">
              <el-input v-model="updateForm.governmentFundRevenue"></el-input>
            </el-form-item>
            <el-form-item label="显性债务余额(亿元)" prop="areaDebtBalance">
              <el-input v-model="updateForm.areaDebtBalance"></el-input>
            </el-form-item>
            <el-form-item label="城投债务余额(亿元)" prop="cityInvestDebtBalance">
              <el-input v-model="updateForm.cityInvestDebtBalance"></el-input>
            </el-form-item>
            <el-form-item label="广义债务率(%)" prop="debtRate">
              <el-input v-model="updateForm.debtRate"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="showMapUpdate = false">取 消</el-button>
            <el-button type="primary" @click="updateMapdio">确 定</el-button>
          </div>
        </el-dialog>
        <div>
            <div  class="cardItem" >
              <div class="title">年份</div>
              <el-select v-model="reportSelected" placeholder="报告期"  style="width:90%;margin-top:-3px;">
                  <el-option v-for="item in reportDateYears" :key="item.id" :label="item.content" :value="item.id">
                  </el-option>
              </el-select>
            </div>
            <div id="chinamap" ref="chinamap"></div>
            <div class="operate">
                <el-button type="plain" icon="el-icon-arrow-left" :disabled="backDisable" @click="onPrev"></el-button>
                <el-button type="plain" icon="el-icon-arrow-right" :disabled="forwardDisable" @click="onNext"></el-button>
            </div>
        </div>
        <div class="table" v-loading="tableLoading">
            <el-table :data="tableDatachart" max-height="400"  :border="true" @sort-change="onSort"  @row-dblclick="maprowdblclick">
                <el-table-column v-for="column in currentColumn" :width="column.width"  :key="column.prop" :prop="column.prop" :label="column.label"
                :sortable=" column.prop=='governmentFundRevenue' || column.prop=='fiscalSelfRate'||column.prop=='taxRevenueProp'||column.prop=='generalRevenue'|| column.prop=='gdp'|| column.prop=='areaDebt'||column.prop == 'revenue'||column.prop=='areaDebtBalance'||column.prop=='cityInvestDebtBalance'||column.prop=='debtRate'||column.prop=='financingProportion'">
                    <template slot-scope="scope">
                        <Percentage :base="percentBase[column.prop]" :value="scope.row[column.prop]" :porpname="column.prop"></Percentage>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="province" label="省份">
                </el-table-column>
                <el-table-column prop="city" label="地级市">
                </el-table-column>
                <el-table-column prop="revenue" label="财政收入（亿）" :sortable="true">
                    <template slot-scope="scope">{{scope.row.closeClose|reserve2Decimal}}</template>
                </el-table-column>
                <el-table-column prop="areaDeb tBalance" label="地区显性债务余额（亿）" :sortable="true">
                    <template slot-scope="scope">{{scope.row.parkinson|reserve2Decimal}}</template>
                </el-table-column>
                <el-table-column prop="cityInvestDebtBalance" label="城投有息债务余额（亿）" :sortable="true">
                    <template slot-scope="scope">{{scope.row.garmanKlass|reserve2Decimal}}</template>
                </el-table-column>
                <el-table-column prop="debtRate" label="广义债务率(%)" :sortable="true">
                    <template slot-scope="scope">{{scope.row.yangZhang|reserve2Decimal}}</template>
                </el-table-column>
                <el-table-column prop="financingProportion" label="非标融资占比" :sortable="true">
                    <template slot-scope="scope">{{scope.row.yangZhang|reserve2Decimal}}</template>
                </el-table-column> -->
            </el-table>
        </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="showCTDeDio"
      v-if="showCTDeDio"
      width="900px">
      <div  id="comment_ct" style="width:95%;margin: 0 auto">
         <div class="baseInfo" >
          <div class="moduelName">基本信息</div>
          <table class="mainTable" align="center" >
             <tr>
                <td style="height:40px;">公司全称</td>
                <td colspan="3">{{ctDiodata.compName|emptyValue}}</td>
              </tr>
              <tr class="tr0">
                  <td>第一大股东</td>
                  <td>{{ctDiodata.cals.s_name_of_major_shareholder_one|emptyValue}}</td>
                  <td style="height:40px;">参考外部城投评分</td>
                  <td style="height:40px;">{{ctDiodata.cals.s_reference_score|emptyValue}} </td>
              </tr>
              <tr class="tr1">
                  <td>省</td>
                  <td>{{ctDiodata.cals.s_region|emptyValue}}</td>
                  <td>市</td>
                  <td>{{ctDiodata.cals.s_comp_level|emptyValue}}</td>
                 
              </tr>
              <tr class="tr2">
                  <td>区县</td>
                  <td>{{ctDiodata.cals.s_district|emptyValue}}</td>
                  <td >实际控制人</td>
                  <td>{{ctDiodata.cals.s_actual_controller|emptyValue}} </td>
                 
              </tr>
              <tr class="tr6">
                <td style="height:40px;">董事长曾任职位</td>
                <td style="height:40px;" colspan="3">{{ctDiodata.cals.s_chairman_position|emptyValue}} </td>
              </tr>
              <tr>
                <td style="height:80px;">简介</td>
                <td style="height:80px;" colspan="3">{{ctDiodata.cals.s_brief|emptyValue}} </td>
              </tr>
            </table>
        </div>
        <div>
          <div class="moduelName">定量数据</div>
          <table class="caiwu">
              <tr>
                  <td>地区GDP(亿元)</td>
                  <td>{{ctDiodata.cals.s_region_gdp_fake|reserve2Decimal|emptyValue}}</td>
                  <td>一般预算收入(亿元)</td>
                  <td>{{ctDiodata.cals.s_general_budget_revenue|reserve2Decimal|emptyValue}}</td>
              </tr>
              <tr>
                  <td>担保比率(%)</td>
                  <td>{{ctDiodata.cals.s_guarantee|reserve2Decimal|emptyValue}}</td>
                  <td>资产总额(亿元)</td>
                  <td>{{ctDiodata.cals.s_total_assets|reserve2Decimal|emptyValue}}</td>
              </tr>
              <tr>
                  <td>营业收入(亿元)</td>
                  <td>{{ctDiodata.cals.s_operation_revenue|reserve2Decimal|emptyValue}}</td>
                  <td>资产负债率 (%)</td>
                  <td>{{ctDiodata.cals.s_debttoassets|reserve2Decimal|emptyValue}}</td>
              </tr>
              <tr>
                  <td>已获利息倍数</td>
                  <td>{{ctDiodata.cals.s_interest_coverage|reserve2Decimal|emptyValue}}</td>
                  <td>带息债务率(%)</td>
                  <td>{{ctDiodata.cals.s_interestdebt|reserve2Decimal|emptyValue}}</td>
              </tr>
              <tr>
                  <td>净资产</td>
                  <td >{{ctDiodata.cals.s_net_asset|emptyValue}}</td>
                  <td>有息债务(亿元)</td>
                  <td >{{ctDiodata.cals.s_interest_bearing_liabilities|emptyValue}}</td>
              </tr>
            
          </table>
        </div>
      </div>
      <div id="comment_fin" style="width:95%;margin: 0 auto">
        <div class="moduelName">定性分析</div>
        <table class="caiwu">
            <tr>
              <th style="width: 20%">指标</th>
              <th style="width: 60%">数据</th>
              <th style="width: 20%">评级</th>
            </tr>
            <tr>
                <td>城市及区位优势</td>
                <td>{{ctDiodata.cals.s_zone_superiority|emptyValue}}</td>
                <td>{{ctDiodata.cals.s_zone_superiority_level|emptyValue}}</td>
            </tr>
            <tr>
                <td>政策支持</td>
                <td>{{ctDiodata.cals.s_policy_support|emptyValue}}</td>
                <td>{{ctDiodata.cals.s_policy_support_level|emptyValue}}</td>
            </tr>
            <tr>
                <td>项目补助制度</td>
                <td>{{ctDiodata.cals.s_project_subsidy_system|emptyValue}}</td>
                <td>{{ctDiodata.cals.s_project_subsidy_system_level|emptyValue}}</td>
            </tr>
            <tr>
                <td>所运营项目质量</td>
                <td>{{ctDiodata.cals.s_projects_quality|emptyValue}}</td>
                <td>{{ctDiodata.cals.s_projects_quality_level|emptyValue}}</td>
            </tr>
            <tr>
                <td>资产流动性</td>
                <td>{{ctDiodata.cals.s_liquidity_of_assets|emptyValue}}</td>
                <td>{{ctDiodata.cals.s_liquidity_of_assets_level|emptyValue}}</td>
            </tr>
        </table>
      </div>
    </el-dialog>
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
    <el-dialog :visible="editVisible" width="1024px" center @close="editVisible=false" :close-on-click-modal="false">
        <div slot="title" class="dialogHead">
        <span class="el-dialog__title">更新主体数据</span>
        </div>
        <editCredit :ctDiodata="ctDiodata" @sendClose="sendClose" v-if="editVisible" @sendParamsUpdate="sendParamsUpdate" :moduleId="moduleId" :reportDate="dateValue"></editCredit>
        <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close" v-if="showConfimBtn">确 定</el-button>
      </span> -->
    </el-dialog>
    <detailDio :showPdf="showPdf" :dialogVisible="dialogVisible" :tableDatadio="tableDatadio" @sendHide="sendHide" :chartOption="chartOption" :rowData="rowData"></detailDio>
    <detailDioCity :showPdf="showPdf" :dialogVisible="dialogVisible1" :tableDatadio="tableDatadio" @sendHide="sendHide" :chartOption="chartOption" :rowData="rowData"></detailDioCity>
    <el-card class="tablecard" :style="{'height':boxHeight+ 'px'}">
      <el-table
        :row-class-name="tableRowClassName"
        :data="expandCals"
         v-loading="loading"
         @row-dblclick="rowdblclick"
        @sort-change="sortColumn"
        :height="cardHeight-80"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="+"
          fixed
          width="50">
        </el-table-column>
        <el-table-column
          prop="compName"
          fixed=""
          width="245"
          label="主体名称">
          <!-- <template slot-scope="scope"> -->
            <!-- <a href="javascript:;" style="text-decoration: none;color:#409EFF;"  @click="showDetail(scope.row)">{{scope.row.compName}}</a> -->
            <!-- <a href="javascript:;" @click="showMars(scope.row)" style="width:16px;height:16px;text-align: center;line-height: 16px;margin-left: 10px;"><img src="../../../static/files/scop.png" style="width:10px;height:10px;"></a> -->
          <!-- </template> -->
          <template slot-scope="scope">
            <a href="javascript:;" style="text-decoration: none;color:#409EFF;">{{scope.row.compName}}</a>
            <a href="javascript:;" @click="showMars(scope.row)" style="width:16px;height:16px;text-align: center;line-height: 16px;margin-left: 10px;"><img src="../../../../static/files/scope.png" style="width:10px;height:10px;"></a>
          </template>
        </el-table-column>
        <el-table-column v-for="(column,index) in activtyColumns" :prop="column.fieldCode" :key="index"  :class="column.fieldCode" :label="column.fieldName" :width="activtyColumns.length>6?column.width:'auto'" :sortable="column.sortable" :fixed="column.fixed" :formatter="applyFormat" :align="column.align">
              <template slot-scope="scope">
                  <span class="trip-value"  :title="scope.row[column.fieldCode]">{{scope.row[column.fieldCode]|reserve2Decimal|thousandSeparate}}</span>
              </template>
        </el-table-column>
         <el-table-column
          label="定量数据日期"
           prop="reportDateStr"
           v-if="typeChangebutton=='1'"
           align="center"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          v-if="moduleId==5034 && buttonRights1['update']"
          width="150">
          <template slot-scope="scope">
              <el-button size="small"   @click="updateMainData(scope.row)">更新</el-button>
              <el-button size="small"  @click="openDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
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
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
import detailDio from './component/creatingMaindio.vue';
import detailDioCity from './component/creatingMaindioCity.vue';
import 'echarts/map/js/china.js';
import '../commons/all-province.js';
// import Echarts from 'vue-echarts';
import Percentage from '../commons/percentage.vue';
import editCredit from './component/new-credit.vue';
import echarts from 'echarts';
import Echarts from 'vue-echarts';
import commonSeacher from './component/commonSeacher.vue';
import commonSeacherCt from './component/commonSeacherCT.vue';
const permissionMap = {
  mainButton: ['ss_all', 'ssg3.0'],
};
const permissionMap1 = {
  mainButton: ['ss_all', 'ssg3.0', 'creating_main'],
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
function transformProvinceName(provinceName) {
  if (!provinceName) {
    return '';
  }
  provinceName = provinceName.replace('省', '');
  const specialAreaRE = /^(新疆|西藏|广西|宁夏|内蒙古)(.*)/;
  return provinceName.replace(specialAreaRE, '$1');
}
function isInteger(rule, value, callback) {
  if (value == '') {
    value = null;
    callback();
  } else if (!Number(value)) {
    callback(new Error('请输入正整数'));
  } else {
    const re = /^[0-9]*[1-9][0-9]*$/;
    const rsCheck = re.test(value);
    if (!rsCheck) {
      callback(new Error('请输入正整数'));
    } else {
      callback();
    }
  }
}

// setTimeout(() => {
//   if (!Number(value)) {
//     callback(new Error('请输入正整数'));
//   } else {
//     const re = /^[0-9]*[1-9][0-9]*$/;
//     const rsCheck = re.test(value);
//     if (!rsCheck) {
//       callback(new Error('请输入正整数'));
//     } else {
//       callback();
//     }
//   }
// }, 0);
const provColumns = [
  { label: '省份', prop: 'province', width: 135 },
  { label: 'GDP（亿元）', prop: 'gdp', width: 135 },
  { label: '一般预算收入', prop: 'generalRevenue', width: 145 },
  { label: '政府性基金收入', prop: 'governmentFundRevenue', width: 155 },
  { label: '显性债务余额', prop: 'areaDebtBalance', width: 145 },
  { label: '城投债务余额', prop: 'cityInvestDebtBalance', width: 135 },
  { label: '广义债务率(%)', prop: 'debtRate', width: 145 },
];
const cityColumns = [
  { label: '省份', prop: 'province', width: 135 },
  { label: '地级市', prop: 'city', width: 135 },
  { label: 'GDP（亿元）', prop: 'gdp', width: 135 },
  { label: '一般预算收入', prop: 'generalRevenue', width: 135 },
  { label: '政府性基金收入', prop: 'governmentFundRevenue', width: 155 },
  { label: '显性债务余额', prop: 'areaDebtBalance', width: 135 },
  { label: '城投债务余额', prop: 'cityInvestDebtBalance', width: 135 },
  { label: '广义债务率(%)', prop: 'debtRate', width: 145 },
];
const strictColumns = [
  { label: '省份', prop: 'province', width: 135 },
  { label: '地级市', prop: 'city', width: 135 },
  { label: '区县', prop: 'district', width: 135 },
  { label: 'GDP（亿元）', prop: 'gdp', width: 135 },
  { label: '一般预算收入', prop: 'generalRevenue', width: 135 },
  { label: '政府性基金收入', prop: 'governmentFundRevenue', width: 155 },
  { label: '显性债务余额', prop: 'areaDebtBalance', width: 135 },
  { label: '城投债务余额', prop: 'cityInvestDebtBalance', width: 135 },
  { label: '广义债务率(%)', prop: 'debtRate', width: 145 },
];
const debtParamMap = [null, 'province', 'city', 'district'];
let mapDepth = 0;
const widthMap = {
  // s_region:94,//省份
  // s_comp_level:100,//地级市
  // s_name_of_major_shareholder_one:100,//第一大股东
  // s_outer_level:51,//外部主体评级
  s_main_business: 100, // 主营业务
  // s_region_gdp_fake:100,//地区gdp
  // s_total_assets_fake:100,//资产总额
  // s_debttoassets_fake:100,//资产负债率
  // s_zone_superiority_level:47,//城市区位优势
  // s_policy_support_level:47,//政策支持评级
  // s_project_subsidy_system_level:47,//项目补助制度
  // s_projects_quality_level:47,//运营项目质量评级
  // s_liquidity_of_assets_level:47//资产流动性
};
export default {
  data() {
    return {
      marsLevel: '',
      dateValue: '',
      targetlist: [],
      tableData: [],
      ctDiodata: {},
      showCTDeDio: false,
      tableDatachart: [],
      backDisable: true,
      percentBase: {},
      forwardDisable: true,
      typeChangebutton: '2',
      showCt: false,
      tableDatadio: {},
      dialogVisible: false,
      dialogVisible1: false, // 城投的弹窗
      cardHeight: 0,
      boxHeight: 0,
      pageSize: 20,
      currentPage: 1,
      showMarsDio: false,
      reEditData: {},
      mapParams: {
        districtVal: '',
        provinceVal: '',
        cityVal: '',
        s_region: [],
        s_comp_level: [],
      },
      rowData: {},
      chartOptions: {
        title: {
          text: '',
          subtext: '',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter(params) {
            // console.log('params',params)
            return `${params.name}<br/>债务率:${params.value}`;
          },
        },
        legend: {
        },
        visualMap: {
          min: 0,
          max: 800,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          // dimension: 0,
          inRange: {
            color: ['#DFE7F4', '#315795'],
          },
          calculable: true,
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {
              show: true,
            },
          },
        },
        series: [{
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: true,
            },
          },
          data: [],
        },
        ],
      },
      chartOption: {
        title: {
          text: '',
          textStyle: {
            color: '#666',
          },
        },
        // tooltip: {
        //     trigger: 'item',
        //     formatter: function (params, ticket, callback) {
        //         console.log('##params:', params);
        //         return '每个维度的评价是根据评级模型中多个指标的分数加总后再分级，用来衡量企业相应维度在行业中的排名；</br>部分定性指标不在这六个维度内，例如股东性质、融资渠道多样性等；</p></br>\
        //         <p>行业地位——主要包括地产企业排名、净资产、销售商品提供劳务收到的现金、是否上市等；</p>\
        //         <p>资产负债能力——主要指标包括有息资本负债率、对外担保比率等；</p>\
        //         <p>盈利能力——主要包括毛利率、净利率、ROA、ROE、销售商品提供劳务收到的现金增长等；</p>\
        //         <p>短期偿债能力——主要包括流比、速比、现金比、投资性地产占比、长短期有息债务比、EBITDA利息保障倍数等；</p>\
        //         <p>营运能力——主要包括销售回款率、总资产周转速度等；</p>\
        //         <p>土储布局优势——包括土储在各地区的分布、各地房价收入比、一般预算收入增长、城市等级等。</p>'
        //     },
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
      cityNameTT: '',
      citComName: '',
      updateForm: {

      },
      reportDateYears: [],
      reportSelected: '',
      rules: {
        gdp: [
          {
            validator: isInteger, type: 'number', trigger: 'blur', message: '请输入整数',
          },
        ],
        generalRevenue: [
          {
            validator: isInteger, type: 'number', trigger: 'blur', message: '请输入整数',
          },
        ],
        areaDebtBalance: [
          { validator: isInteger, trigger: 'blur', message: '请输入整数' },
        ],
        governmentFundRevenue: [
          {
            validator: isInteger, type: 'number', trigger: 'blur', message: '请输入整数',
          },
        ],
        cityInvestDebtBalance: [
          {
            validator: isInteger, type: 'number', trigger: 'blur', message: '请输入整数',
          },
        ],
        debtRate: [
          {
            validator: isInteger, type: 'number', trigger: 'blur', message: '请输入整数',
          },
        ],
      },
      loading: false,
      levelData: [],
      showMapUpdate: false,
      clearSearch: false,
      tableLoading: false,
      sortparams: {},
      historyIndex: 0,
      total: 0,
      moduleId: 5053,
      // compNameLike: '',
      // gradeLevels: [],
      fieldCodeValue: {
        s_industry_status: [],
        s_majority_shareholder: [],
        s_outer_level: [],
        s_scale_level: [],
      },
      fixedColumns: [],
      activtyColumns: [],
      sortableExclude: ['compName', 's_majority_shareholder'],
      cityHistory: {
        debtColumns: [provColumns, cityColumns, strictColumns],
      },
      updateMapData: {},
      editVisible: false,
      showPdf: false,
      pageparams: {},
    };
  },
  computed: {
    currentColumn() {
      const debtColumns = this.cityHistory.debtColumns;
      return debtColumns[this.historyIndex];
    },
    isCityInvest() {
      return this.typeChangebutton == '1';
    },
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
    buttonRights1() {
      const menulist = JSON.parse(localStorage.getItem('menu'));
      const rets = this.parseRightsData1(menulist, 0);
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
    ...mapActions(['getmodCreditSubjectNew', 'getFiltersNew', 'getMainColumnNew', 'updateMapValueNew', 'updateMapCityValueNew', 'updateMapDsitricValueNew', 'getMainInfo', 'getMainComment', 'requestProvinceDebtsNew', 'requestCountryDebtsNew', 'requestCityDebtsNew', 'requestDistrictDebtNew']),
    ...mapMutations(['clearNewChartImgs', 'setCreditColumns']),
    showDetail(data) {

    },
    async reportDateYearslist() {
      let params = {};
      params = {
        type: 35,
      };
      try {
        const res = await this.getFiltersNew(params);
        console.log('getFiltersNew', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.reportDateYears = res.data.data;
          this.reportSelected = this.reportDateYears[this.reportDateYears.length - 1].id;
          this.sendreportDate(this.reportSelected);
        }
      } catch (error) {
        console.log('dataUpdate', error);
      }
      // let params ={
      //   type: 33
      // }
    },
    sendClose() {
      this.editVisible = false;
    },
    async updateMainData(data) {
      // debugger
      this.curRow = data;
      this.ctDiodata = {};
      const res = await this.getMainInfo({ id: data.id });
      console.log('openDetail', res);
      if (res.status === 200 && res.data.status === '0000') {
        this.ctDiodata = res.data.data;
        this.ctDiodata.id = data.id;
        console.log('this.ctDiodata', this.ctDiodata);
      } else {
        this.ctDiodata = {};
      }
      this.editVisible = true;
    },
    async openDetail(row) {
      this.ctDiodata = {};
      this.rowData = row;
      const res = await this.getMainInfo({ id: row.id });
      console.log('openDetail', res);
      if (res.status === 200 && res.data.status === '0000') {
        this.ctDiodata = res.data.data;
        console.log('this.ctDiodata', this.ctDiodata);
      } else {
        this.ctDiodata = {};
      }
      this.showCTDeDio = true;
    },
    requestMainData() {
      //  debugger
      const moduleId = this.moduleId;
      const reportDate = this.dateValue;
      // 请求主体数据
      const rowData = this.curRow;
      const reqParam = {
        ids: [rowData.id],
        moduleId,
        reportDate,
        tradeType: 1,
      };
      const initData = {};
      this.getmodCreditSubjectNew(reqParam).then((result) => {
        debugger;
        console.log('get main data:', result);
        if (result.status === 200 && result.data.status == '0000') {
          const rows = result.data.data.rows || [];
          let cals = null;
          if (rows.length > 0) {
            cals = rows[0].cals || [];
          }
          cals.forEach((col) => {
            initData[col.fieldCode] = col.calValue;
          });
          initData.compName = rows[0].compName;
          initData.finalLevel = rows[0].finalLevel;
          initData.finalRemark = rows[0].finalRemark;
          console.log('levelData:', initData.levelData);
        }
        debugger;
        console.log('>>>>>>credit data:', initData);
        console.log('>>>>>>row data:', rowData);
        this.reEditData = { ...rowData, ...initData };
        console.log('>>>>>>row data:', this.reEditData);
        // this.outputVisible = true;
      }).catch((error) => {

      });
    },
    fillPercentBase(dataArray) {
      if (!dataArray || !Array.isArray(dataArray)) {
        return;
      }
      const keys = Object.keys(dataArray[0] || {});
      const percentBase = {};
      let maxValue = 0;
      for (const data of dataArray) {
        for (const key of keys) {
          if (isNaN(data[key])) {
            continue;
          }
          if (key === 'debtRate') {
            maxValue = Math.max(maxValue, data[key]);
          }
          percentBase[key] = Math.max(percentBase[key] || 0, data[key]);
        }
      }
      console.log('get fillPercentBase:', percentBase, ' maxValue：', maxValue);
      // this.chartOptions.visualMap.max = maxValue;
      this.chartOptions.visualMap.max = 800; // 爽哥要求改成800
      this.chinaMap.setOption(this.chartOptions);
      this.percentBase = percentBase;
    },
    onSort(column, prop, order) {
      console.log('on sort:', column, prop, order);
      const getByProvince = this.getByProvince;
      if (!getByProvince) {
        return;
      }
      const param = {
        isAsc: order ? order === 'ascending' : '',
        order: prop || '',
        getByProvince,
      };
      this.requestCityDebtsNew(param).then((result) => {
        if (!result) {
          this.$message.error('请求债务数据失败');
          return;
        }
        this.fillPercentBase(result);
        this.tableDatachart = result;
        this.tableLoading = false;
      }).catch((err) => {
        this.tableLoading = false;
        this.tableDatachart = [];
      });
    },
    onPrev() {
      //  debugger
      console.log(this.historyIndex);
      this.mapParams.districtVal = '';
      if (this.historyIndex == 1 || this.historyIndex == 0) {
        this.clearSearch = true; // 因为地图切换后手动自己选了地级市，再点击地图的左边按钮，地级市吧熊自动清除
        this.mapParams.cityVal = null;
      }
      this.switchMap('prev');
    },
    onNext() {
      this.mapParams.districtVal = '';
      this.switchMap('next');
    },
    switchMap(type) {
      let historyIndex = null;
      if (type === 'prev') {
        if (this.cityNameTT != '天津' && this.cityNameTT != '重庆' && this.cityNameTT != '北京') {
          historyIndex = --this.historyIndex;
        } else {
          historyIndex = 0;
          this.cityNameTT = '';
          // this.historyIndex = 0
          this.clearMapstatus();
          this.initChinaMap();
          // this.cityHistory = []
          //  this.chartOptions.series[0].mapType = 'china';
          //  this.chinaMap.setOption(this.chartOptions)
        }
      } else {
        historyIndex = ++this.historyIndex;
      }
      const dateValue = this.dateValue;
      const curDateValue = this.cityHistory[dateValue] || [];
      const curData = curDateValue[historyIndex];
      // debugger
      if (historyIndex === 0) {
        this.processProvDebts(curData);
      } else {
        this.processCityDebts(curData);
      }
    },
    maprowdblclick(row, column, event) {
      this.showMapUpdate = true;
      const obj = {
        ...row,
      };
      for (const item in obj) {
        if (obj[item] == null) {
          obj[item] = '';
        }
      }
      this.updateForm = { ...obj };
      // console.log('rowdblclick--row',row)
      // console.log('rowdblclick--column',column)
      // console.log('rowdblclick--event',event)
    },
    clearMapstatus() {
      this.backDisable = true;
      this.forwardDisable = true;
      mapDepth = 0;
      this.historyIndex = 0;
    },
    sendreportDate(val) {
      // debugger
      this.dateValue = val;
      this.historyIndex = 0;
      this.chinaMap = echarts.init(document.getElementById('chinamap'));
      this.initChinaMap();
    },
    processMapClick({ name, data }) {
      //  debugger
      this.updateMapData.name = name;
      this.updateMapData.data = data;
      this.mapParams.districtVal = '';
      console.log(data);
      // debugger
      if (!name) {
        this.$message.warning('暂无数据');
        reutrn;
      }
      if (this.cityNameTT !== '' && (this.cityNameTT == '天津' || this.cityNameTT == '重庆' || this.cityNameTT == '北京')) {
        this.$message.warning('没有更多的城市选择了');
        return false;
      }
      this.cityNameTT = name;


      this.tableLoading = true;
      const dateValue = this.dateValue;
      let historyIndex = this.historyIndex;
      if (historyIndex === 1) {
        this.forwardDisable = true;
      }
      const currentHistory = this.cityHistory[dateValue];
      if (currentHistory.length < 2) {
        currentHistory.push({});
      }
      if (historyIndex < currentHistory.length) {
        historyIndex = ++historyIndex > 2 ? 2 : historyIndex;
        this.historyIndex = historyIndex;
        mapDepth = historyIndex;
      }
      const currentData = currentHistory[historyIndex] || {};
      currentData.currentName = name;

      if (historyIndex === 1) {
        this.chartOptions.series[0].mapType = name;
        this.chinaMap.setOption(this.chartOptions);
      }
      let dataPromise = null;

      let reqApi = 'requestCityDebtsNew';
      const paramName = data && data.orgName;
      const curName = debtParamMap[historyIndex];
      this[curName] = paramName;
      const reqParam = {
        [curName]: paramName,
        reportDate: dateValue,
      };
      if (historyIndex === 2) {
        reqParam.province = this.province;
        reqApi = 'requestDistrictDebtNew';
      }
      if (name == '天津' || name == '重庆' || name == '北京') {
        this.historyIndex = 2;
        this.forwardDisable = true;
        reqParam.city = name;
        reqApi = 'requestDistrictDebtNew';
      }
      dataPromise = this[reqApi](reqParam);
      // }
      dataPromise.then((result) => {
        currentData[name] = result;
        currentHistory[historyIndex] = currentData;
        return currentData;
      }).then(this.processCityDebts).catch((err) => {
        this.tableLoading = false;
        this.tableDatachart = [];
      });
    },
    processCityDebts(data) {
      //  debugger
      console.log('processcitydebts:', data);
      const historyIndex = this.historyIndex;
      const currentName = data.currentName;
      // if(currentName!=='china')
      // {
      //     data = data[currentName]||data;
      // }
      data = data[currentName] || data;
      this.fillPercentBase(data);
      this.tableDatachart = data;
      this.tableLoading = false;
      if (historyIndex !== 2 && (this.cityNameTT != '天津' && this.cityNameTT != '重庆' && this.cityNameTT != '北京')) {
        const chartData = data.map(val => ({
          name: val.city,
          value: val.debtRate,
          orgName: val.city,
        }));
        this.chartOptions.series[0].data = chartData;
        if (currentName) {
          this.chartOptions.series[0].mapType = currentName;
        }
        this.chinaMap.setOption(this.chartOptions);
      } else if (this.cityNameTT == '天津' || this.cityNameTT == '重庆' || this.cityNameTT == '北京') {
        this.forwardDisable = true;
        //  this.historyIndex = 2
        const chartData = data.map(val => ({
          name: val.district,
          value: val.debtRate,
          orgName: val.city,
        }));
        this.chartOptions.series[0].data = chartData;
        if (currentName) {
          this.chartOptions.series[0].mapType = currentName;
        }
        this.chinaMap.setOption(this.chartOptions);
      }
      // 请求主体数据
      const fieldCodeValue = { s_region: this.province ? [this.province] : [] };
      let cityName;
      let provName = '';
      if (historyIndex === 2) {
        cityName = currentName;
      }
      if (historyIndex !== 0) {
        provName = this.province;
      }
      this.mapParams.cityVal = cityName || '';
      this.mapParams.provinceVal = provName || '';
    },
    processProvDebts(data) {
      // debugger
      console.log('processProvDebts:', data);
      const currentName = data.currentName;
      // if(currentName!=='china')
      // {
      //     data = data[currentName]||data;
      // }
      const historyIndex = this.historyIndex;
      data = data[currentName] || data;
      this.fillPercentBase(data);
      this.tableDatachart = data || [];
      const chartData = data.map((val) => {
        const provName = val.province;
        return {
          name: transformProvinceName(provName),
          value: val.debtRate,
          orgName: provName,
        };
      });
      this.chartOptions.series[0].data = chartData;
      if (currentName) {
        this.chartOptions.series[0].mapType = currentName;
      }
      this.chinaMap.setOption(this.chartOptions);
      // 请求主体数据
      let cityName;
      let provName = '';
      if (historyIndex === 2) {
        cityName = currentName;
      }
      if (historyIndex !== 0) {
        provName = this.province;
      }
      this.mapParams.cityVal = cityName || '';
      this.mapParams.provinceVal = provName || '';
    },
    initChinaMap() {
      // debugger
      const dateValue = this.dateValue;
      if (!dateValue) {
        return;
      }
      this.chinaMap.off('click');
      this.chinaMap.on('click', (val) => { this.processMapClick(val); });
      // 请求省份债务
      // let dataPromise = null;
      // const currentData = this.cityHistory[dateValue]||[];
      // if(currentData[0]){
      //     dataPromise = Promise.resolve(currentData[0]);
      // }else{
      //     dataPromise = this.requestProvinceDebts({reportDate:dateValue});
      // }
      const dataPromise = this.requestProvinceDebtsNew({ reportDate: dateValue });
      dataPromise.then((result) => {
        if (!result) {
          this.$message.error('请求债务数据失败');
          return null;
        }
        const dataItem = { currentName: 'china', china: [] };
        if (result.length) {
          if (!this.cityHistory[dateValue]) {
            this.$set(this.cityHistory, dateValue, []);
          }
          // result.currentName = 'china';
          dataItem.china = result;
          this.cityHistory[dateValue].push(dataItem);
        }
        return dataItem;
      }).then(this.processProvDebts).catch((err) => {});
    },
    updateMapdio() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          for (const item in this.updateForm) {
            if (this.updateForm[item] == '') {
              this.updateForm[item] = null;
            }
          }
          console.log(this.updateForm);
          if (this.updateForm.province && this.updateForm.city && this.updateForm.district) {
            const res = await this.updateMapDsitricValueNew({ ...this.updateForm });
            console.log(res);
            if (res.status === 200 && res.data.status === '0000') {
              this.$message.success('区县数据更新成功');
              this.updateProviceData();
              this.showMapUpdate = false;
            }
          } else if (this.updateForm.province && this.updateForm.city) {
            const res = await this.updateMapCityValueNew({ ...this.updateForm });
            console.log(res);
            if (res.status === 200 && res.data.status === '0000') {
              this.$message.success('市级数据更新成功');
              this.updateProviceData();
              this.showMapUpdate = false;
            }
          } else {
            const res = await this.updateMapValueNew({ ...this.updateForm });
            console.log(res);
            if (res.status === 200 && res.data.status === '0000') {
              this.$message.success('省级数据更新成功');
              this.initChinaMap();
              this.showMapUpdate = false;
            }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateProviceData() {
      console.log(this.updateMapData);
      const name = this.updateMapData.name;
      const data = this.updateMapData.data;
      this.mapParams.districtVal = '';
      console.log(data);
      // debugger
      if (!name) {
        this.$message.warning('暂无数据');
        reutrn;
      }
      if (this.cityNameTT !== '' && (this.cityNameTT == '天津' || this.cityNameTT == '重庆' || this.cityNameTT == '北京')) {
        this.$message.warning('没有更多的城市选择了');
        return false;
      }
      this.cityNameTT = name;


      this.tableLoading = true;
      const dateValue = this.dateValue;
      const historyIndex = this.historyIndex;
      if (historyIndex === 1) {
        this.forwardDisable = true;
      }
      const currentHistory = this.cityHistory[dateValue];
      // if(currentHistory.length < 2){
      //     currentHistory.push({});
      // }
      // if(historyIndex<currentHistory.length){
      //     historyIndex = ++historyIndex>2?2:historyIndex;
      //     this.historyIndex = historyIndex;
      //     mapDepth = historyIndex;
      // }
      const currentData = currentHistory[historyIndex] || {};
      currentData.currentName = name;

      if (historyIndex === 1) {
        this.chartOptions.series[0].mapType = name;
        this.chinaMap.setOption(this.chartOptions, true);
      }
      let dataPromise = null;
      // if(currentData[name]&&currentData[name].length>0){
      //     dataPromise =Promise.resolve(currentData[name]);
      // }else{
      let reqApi = 'requestCityDebtsNew';
      const paramName = data && data.orgName;
      const curName = debtParamMap[historyIndex];
      this[curName] = paramName;
      const reqParam = {
        [curName]: paramName,
        reportDate: dateValue,
      };
      if (historyIndex === 2) {
        reqParam.province = this.province;
        reqApi = 'requestDistrictDebtNew';
      }
      if (name == '天津' || name == '重庆' || name == '北京') {
        this.historyIndex = 2;
        this.forwardDisable = true;
        reqParam.city = name;
        reqApi = 'requestDistrictDebtNew';
      }
      dataPromise = this[reqApi](reqParam);
      // }
      dataPromise.then((result) => {
        currentData[name] = result;
        currentHistory[historyIndex] = currentData;
        return currentData;
      }).then(this.processCityDebts).catch((err) => {
        this.tableLoading = false;
        this.tableData = [];
      });
    },
    showMars(scope) {
      //  this.showMarsDio = true
      //  debugger

      this.marsLevel = scope.gradeLevel;
      console.log('scope++++++', scope);
      if (this.moduleId == 5035 || this.moduleId == 5035 || this.moduleId == 5036 || this.moduleId == 6001 || this.moduleId == 6002 || this.moduleId == 6003 || this.moduleId == 6004) {
        const {
          s_scale_level,
          s_industry_status,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_industry_layout,
        } = scope;
        this.levelData = [convertLevel(s_scale_level), convertLevel(s_industry_status), convertLevel(s_profitability), convertLevel(s_short_term_solvency), convertLevel(s_management_ability), convertLevel(s_industry_layout)];
      } else if (this.moduleId == 5053) {
        const {
          s_industry_status,
          s_asset_liability_capability,
          s_profitability,
          s_short_term_solvency,
          s_management_ability,
          s_soil_storage_layout,
        } = scope;
        this.levelData = [convertLevel(s_industry_status), convertLevel(s_asset_liability_capability), convertLevel(s_profitability), convertLevel(s_short_term_solvency), convertLevel(s_management_ability), convertLevel(s_soil_storage_layout)];
      } else if (this.moduleId == 5034) {
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
        this.levelData = [
          scoreMap[s_region_gdp],
          scoreMap[s_zone_superiority_level],
          scoreMap[s_government_debt_ratio],
          scoreMap[s_policy_support_level],
          scoreMap[s_project_subsidy_system_level],
          scoreMap[s_liquidity_of_assets_level],
          scoreMap[s_debttoassets],
          scoreMap[s_total_assets],
        ];
      }

      const show = this.levelData.every(item => item == 'undefined' || item == undefined);
      console.log(show);
      // debugger
      if (show) {
        this.$message.warning('此数据没有MARS评分图');
      } else {
        const arr = [];
        this.levelData.forEach((item) => {
          item = item == 'undefined' || item == undefined ? '20' : item;
          arr.push(item);
        });
        console.log(arr);
        this.showMarsDio = true;
        this.$nextTick(() => {
          this.chartOption.series[0].data[0].value = arr;
        });
      }
    },
    sendHide(val) {
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
    parseRightsData1(entry, codeIndex) {
      const resCode = permissionMap1.mainButton[codeIndex++];
      if (Array.isArray(entry)) {
        for (var item of entry) {
          if (item.resCode === resCode) {
            return this.parseRightsData1(item, 0);
          }
        }
      }
      const nextCode = permissionMap1.mainButton[codeIndex];
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
          return this.parseRightsData1(item, codeIndex);
        }
      }
      if (!found) {
        return [];
      }
    },
    applyFormat(row, column, cellValue) {
      console.log('rpw------------', row);

      const formatHandler = generateFormateHandler('credit-rating', column.property);
      return formatHandler(cellValue);
    },
    async rowdblclick(row, column, event) {
      this.rowData = row;
      const res = await this.getMainInfo({ id: row.id });
      console.log('showDetail', res);
      if (res.status === 200 && res.data.status === '0000') {
        this.tableDatadio.baseInfo = res.data.data;
        console.log('this.tableDatadio', this.tableDatadio);
      } else {
        this.tableDatadio.baseInfo = {};
      }
      const res2 = await this.getMainComment({ moduleId: this.moduleId, compName: row.compName });
      console.log('showDetail!!!!!!!!!!', res2);
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
      if (this.moduleId != '5034') {
        this.dialogVisible = true;
      } else {
        this.dialogVisible1 = true;
      }
    },
    getColumn() {
      const params = {
        isShow: 1,
        moduleId: this.moduleId,
        weight: -1,
        type: 2,
        pageNum: 1,
      };
      this.getMainColumnNew(params).then((res) => {
        console.log('getMainColumnNew', res);
        if (res.status === 200 && res.data.status === '0000') {
          const columns = res.data.data.map((col) => {
            col.sortable = this.sortableExclude.indexOf(col.fieldCode) < 0 ? 'custom' : false;
            if (col.fieldName !== '主营业务') {
              // col.width = Math.max(col.fieldName.length,4) * 17 + 120;
              // col.width = widthMap[col.fieldCode];
              // if(col.fieldName !== '控股股东性质'){
              //    col.width = Math.max(col.fieldName.length,4) * 17 + 80;
              // } else {
              //   col.width = "auto"
              // }
              // if(col.fieldName == '外部评级机构' || col.fieldName ==  '控股股东性质'){
              //    col.width = '180'
              //    col.align="center"
              // }
              if (!col.width) {
                col.width = Math.max(col.fieldName.length, 4) * 17 + 40;
                col.align = 'center';
              }
            } else {
              col.width = 220;
            }
            return col;
          });

          this.activtyColumns = [...this.fixedColumns, ...columns];


          //  this.setCreditColumns(columns);
          console.log('this.activtyColumns', this.activtyColumns);
        }
      });
    },
    getColumnDio() {
      const params = {
        moduleId: this.moduleId,
        weight: -1,
        type: 2,
        pageNum: 1,
      };
      this.getMainColumnNew(params).then((res) => {
        console.log('getMainColumnNew', res);
        if (res.status === 200 && res.data.status === '0000') {
          const columns = res.data.data.map((col) => {
            col.sortable = this.sortableExclude.indexOf(col.fieldCode) < 0 ? 'custom' : false;
            if (col.fieldName !== '主营业务') {
              // col.width = Math.max(col.fieldName.length,4) * 17 + 120;
              // col.width = widthMap[col.fieldCode];
              // if(col.fieldName !== '控股股东性质'){
              //    col.width = Math.max(col.fieldName.length,4) * 17 + 80;
              // } else {
              //   col.width = "auto"
              // }
              if (!col.width) {
                col.width = Math.max(col.fieldName.length, 4) * 17 + 80;
              }
            } else {
              col.width = 220;
            }
            return col;
          });

          // this.activtyColumns = [...this.fixedColumns,...columns]
          this.setCreditColumns(columns);
          // console.log('this.activtyColumns',this.activtyColumns)
        }
      });
    },
    sortColumn(column) {
      this.loading = true;
      console.log('colname:', column);
      const order = column.order;
      const sortParam = { ...this.baseParam };
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
      }
      this.sortparams = { ...sortParam };
      const params = {
        moduleId: this.moduleId,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        tradeType: 2,
        ...sortParam,
      };
      this.getmodCreditSubjectNew(params).then((res) => {
        console.log('getmodCreditSubjectNew', res);
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
    sendModuleId(val) {
      this.currentPage = 1;
      this.moduleId = val;
      console.log(val);
      // this.getColumn()
      this.getMainData({});
    },
    sendParams(val) {
      console.log(val);
      this.currentPage = 1;
      this.moduleId = val.moduleId;
      this.baseParam = val;
      this.pageparams = val;
      this.getMainData(val);
    //  let params = {
    //    ...val
    //  }
    },
    sendOtherMoudleId(val) {
      this.$message({
        message: '该公司名称为城投板块主题,请您去城投板块点击查询按钮进行操作',
        type: 'warning',
        duration: 0,
        offset: 80,
        showClose: true,
      });
      if (val.moduleId == 5034) {
        setTimeout(() => {
          this.typeChangebutton = '1';
          this.citComName = val.compNameLike;
        }, 2000);
      }
    },
    sendParamsUpdate(val) {
      this.currentPage = 1;
      this.moduleId = val.moduleId;
      this.getMainData({ ...this.sortparams, ...this.pageparams });
    },
    getMainData(otherparam) {
      this.loading = true;
      this.getColumn();
      const params = {
        moduleId: this.moduleId,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        tradeType: 2,
        ...otherparam,
      };
      this.getmodCreditSubjectNew(params).then((res) => {
        console.log('getmodCreditSubjectNew', res);
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
        this.calValue = this.tableData.map((curValue, index) => {
          const cals = curValue.cals || [];
          for (const cal of cals) {
            if (cal.fieldCode && cal.tradeType == '2') {
              curValue[cal.fieldCode] = cal.calValue || '';
            }
          }
          console.log('curValue', curValue);
          return curValue;
        });
      });
    },
    handleSizeChange(val) {
      // debugger
      console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      if (this.typeChangebutton == '1') {
        this.moduleId = '5034';
        // this.historyIndex = 0
        this.boxHeight = window.innerHeight - 260;
        // this.initChinaMap();
      } else {
        this.boxHeight = this.cardHeight;
        this.moduleId = '5053';
      }
      this.getMainData({ ...this.sortparams, ...this.pageparams });
    },
    handleCurrentChange(val) {
      // debugger
      console.log(this.mapParams);
      this.currentPage = val;
      console.log(this.current, val);
      if (this.typeChangebutton == '1') {
        this.moduleId = '5034';
        // this.historyIndex = 0
        this.boxHeight = window.innerHeight - 220;
        // this.initChinaMap();
      } else {
        this.boxHeight = this.cardHeight;
        this.moduleId = '5053';
      }

      //  this.getMainData({})
      this.getMainData({ ...this.sortparams, ...this.pageparams });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return 'warning-row';

      return '';
    },
  },
  created() {
    const isshow = this.buttonRights1.watch;

    console.log(isshow);
    if (!isshow) {
      this.$message.warning('没有该菜单');
      this.$router.push('/');
    }
    this.showPdf = this.buttonRights1.export_pdf;
    // alert(this.showPdf)
    this.fixedColumns = [
      {
        fieldCode: 'gradeLevel',
        fieldName: 'MARS评级',
        sortable: 'custom',
        width: 120,
      },
    ];

    // this.getColumn()
    this.getMainData({});

    // this.initChinaMap();
  },
  watch: {
    reportSelected(val) { // 报告期
      console.log(val);
      this.sendreportDate(val);
    },
    typeChangebutton(val) {
      // debugger
      if (val == '1') {
        this.moduleId = '5034';
        this.reportDateYearslist();
        this.historyIndex = 0;
        this.pageparams.moduleId = 5034;
        this.boxHeight = window.innerHeight - 260;
        this.initChinaMap();
      } else {
        this.boxHeight = this.cardHeight;
        this.moduleId = '5053';
        this.pageparams.moduleId = 5053;
      }

      this.getMainData({});
    },
    moduleId(val) {
      if (val == 5035 || val == 5036 || val == 6001 || val == 6002 || val == 6003 || val == 6004) {
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
      if (val == 5034) {
        this.chartOption.radar[0].indicator = [{
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
      if (val == 5053) {
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
    },
    dialogVisible(val) {
      if (!val) {
        this.clearNewChartImgs();
      }
    },
    historyIndex(val) {
      this.backDisable = false;
      this.forwardDisable = false;
      if (val === 0) {
        this.backDisable = true;
      }
      if (val === mapDepth) {
        this.forwardDisable = true;
      }
    },
  },
  mounted() {
    const that = this;
    setTimeout(() => {
      that.cardHeight = window.innerHeight - 305;
      that.boxHeight = that.cardHeight;
    }, 200);
    this.$winResize.add(() => {
      clearTimeout(this.delay);
      this.delay = setTimeout(() => {
        that.cardHeight = window.innerHeight - 305;
        that.boxHeight = that.cardHeight;
      }, 200);
    });
  },
  components: {
    commonSeacher,
    commonSeacherCt,
    detailDio,
    detailDioCity,
    Percentage,
    editCredit,
    Vchart: Echarts,
  },

};
</script>

<style lang="less" scoped>
  #creatingMainview{
    width: 98%;
    margin: 0 auto;
     .cardItem{
        width:204px;
        display: inline-block;
        margin-bottom: 10px;
        .title{
          width: 90%;
          position: relative;
          height: 22px;
          background: #DAEBFB;
          line-height: 22px;
          color: #76767B;
          text-align: center;
          font-size: 14px;
          z-index: 2;
        }
        .el-select{

          position: relative;
          z-index: 1;
        }
      }
    .trip-value{
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: inline-block;
        white-space: nowrap;
    }
    .tablecard{
      margin-top: 20px;
    }
    #chinamap{
        width:450px;
        height: 300px;
    }
    .chinaMap{
        display:flex;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        justify-content: space-between;
        margin: 10px auto;
        padding: 10px;
        box-sizing: border-box;
        background: #fff;
        .table{
            flex:1 1 auto;
            overflow: hidden;
        }
        .operate{
            display:flex;
            justify-content: space-around;
        }
    }
    .header {
        padding: 0;
        height: 35px;
        width: 100%;
        line-height: 35px;
        background: #DAEBFB;
        padding-left: 10px;
        box-sizing: border-box;
        color: #404141;
        font-size: 14px;
        font-weight: bold;
      }
    .typeChangebutton{
      width: 13%;
      float: left;
      height: 156px;
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      .cardItem{
        width:145px;
        margin-right: 40px;
        display: inline-block;
        margin-bottom: 10px;
        &:last-child{
          margin-right: 0;
        }
        .title{
          width: 100%;
          position: relative;
          height: 22px;
          background: #DAEBFB;
          line-height: 22px;
          color: #76767B;
          text-align: center;
          font-size: 14px;
          z-index: 2;
        }
        .el-select{
          position: relative;
          z-index: 1;
        }
    }
    }
    .chartWrap .echarts {
     margin: 0 auto;
     margin-left: 54px;
     margin-top: 20px;
      height: 320px;
    }
    .moduelName {
          text-align: left;
          width: 100%;
          text-indent: 20px;
          line-height: 35px;
          height: 35px;
          font-size: 15px;
          color: #666;
          background: #9BC2EB;
          margin-top: 20px;
      }
    #comment_ct{
      /*基础信息*/
          .baseInfo {
              width: 100%;
              margin: 0 auto;
          }

          .baseInfo td {
              font-size: 12px;
              padding: 0;
          }

          .baseInfo .tr0 td,
          .tr1 td,
          .baseInfo .tr2 td,
          .tr3 td {
              height: 40px;
          }
          
          .baseInfo .tr4 {
              height: 200px;
          }

          .baseInfo .tr4 td {
              height: 120px;
          }

          .baseInfo .tr5 {
              height: 190px;
          }
          .baseInfo .tr6 {
              td{
                &:nth-child(2){
                  padding: 0 5px;
                  box-sizing: border-box;
                  text-align: left;
                }
              }
          }

          .baseInfo .mainTable {
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              font-size: 16px;
              margin: 0 auto;
          }

          .baseInfo tr:nth-child(odd) td:nth-child(odd) {
              background: #DFEEFC;
              width: 70px;
              color: #666;
          }
          
          .childTable tr:nth-child(odd) td:nth-child(odd) {
              background: #DFEEFC;
              width: 120px;
              color: #666;
          }
        
          .baseInfo tr td:nth-child(odd) {
              color: #666;
          }

          .baseInfo tr td:nth-child(even) {
              color: #898989;
              width: 200px;
          }
          .baseInfo tr.tr1 td:nth-child(even) {
              color: #898989;
              width: 100px;
          }
          .baseInfo tr:nth-child(odd) td:nth-child(even) {
              background: #F3F9FF;
              font-size: 12px;
              color: #898989;

          }

          // .baseInfo tr.tr3 {
          //     border: 1px solid #979797;
          // }

          .baseInfo tr.tr4 {
              color: #898989;
          }

          .baseInfo .tr4 td {
              text-align: center;
          }

          .baseInfo .tr4 td:last-child {
              padding: 10px;
              box-sizing: border-box;
              text-align: left;
          }

          .baseInfo tr.tr5 {
              border: 1px solid #979797;
              height: 3.3%;
              margin-top: 10px;
          }

          .baseInfo .mainTable tbody>tr:last-child>td {
              background: transparent;
          }

          .baseInfo .mainTable tbody>tr.ctr6>td:last-child {
              background: #F3F9FF;
          }

          .baseInfo .childTable {
              width: 85%;
              height: 100%;
              margin-top: 30px;
              border-collapse: collapse;
              border: 1px solid #979797;
              background: #DFEEFC;
              text-align: center;
          }

          .baseInfo .childTable tr {
              border-top: 1px solid #979797;
              height: 35px;
              line-height: 35px;
          }

          .baseInfo .childTable .ctr0 {
              border-top: none;
          }

          .baseInfo .childTable td {
              width: 50%;
          }

          .chartWrap .echarts {
              width: 600px;
              height: 400px;
              margin: 0 auto;
          }
          .history {
              padding:10px;
              .attachInfo {
                  display: flex;

                  li {
                      a {
                          display: inline-block;
                          max-width: 300px;
                          text-decoration: none;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          overflow: hidden;
                      }
                  }

                  span {
                      margin-left: 20px;
                  }
              }
          }
          .history {
              textarea {
                  width: 100%;
                  height: 80px;
                  border: 1px solid #ddd;
                  background: #fff;
                  box-sizing: border-box;
              }
          }
          .histTitle{
              font-size: 16px;
              color: #303234;
          }

          /*财务*/
          .caiwu {
              width: 100%;
              margin: 0 auto;
          }

          .caiwu tr {
              width: 100%;
          }

          .caiwu tr th {
              width: 180px;
              text-align: left;
              line-height: 35px;
              height: 35px;
              font-size: 15px;
              color: #666;
              background: #9BC2EB;
          }

          .caiwu tr td {
              width: 23%;
              /* float: left; */
              height: 100%;
              text-align: center;
              line-height: 20px;
              height: 20px;
              padding:5px 0;
              font-size: 12px;
              color: #898989;
              &[colspan='3']{
                  text-align:left;
                  text-indent: 24px;
              }
          }

          .caiwu tr:nth-child(2n+1) {
              background: #F3F9FF;
          }

          .caiwu tr:nth-child(2n+1) td:nth-child(odd) {
              background: #DFEEFC;
          }

          .caiwu dtrl:nth-child(2n) {
              background: #fff;
          }
      }
      #comment_fin{
          /*基础信息*/
        .baseInfo {
            width: 85%;
            margin: 0 auto;
            th{
              width:33.333333333%;
            }
        }

          
        .history {
            padding:10px;
            .attachInfo {
                display: flex;

                li {
                    a {
                        display: inline-block;
                        max-width: 300px;
                        text-decoration: none;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }

                span {
                    margin-left: 20px;
                }
            }
        }
        .history {
            textarea {
                width: 100%;
                height: 80px;
                border: 1px solid #ddd;
                background: #fff;
                box-sizing: border-box;
            }
        }
        .histTitle{
            font-size: 16px;
            color: #303234;
        }

        /*财务*/
        .caiwu {
            width: 100%;
            margin: 0 auto;
        }

        .caiwu tr {
            width: 100%;
        }

        .caiwu tr th {
            
            text-align: center;
            line-height: 35px;
            height: 35px;
            font-size: 15px;
            color: #666;
            // background: #9BC2EB;
        }

        .caiwu tr td {
            
            /* float: left; */
            height: 100%;
            text-align: center;
            line-height: 20px;
            height: 20px;
            padding:5px 0;
            font-size: 12px;
            color: #898989;
            &:nth-child(2){
              padding: 0 5px;
              box-sizing: border-box;
              text-align: left;
            }
        }

        .caiwu tr:nth-child(2n+1) {
            background: #F3F9FF;
        }

        .caiwu tr:nth-child(2n+1) td:nth-child(odd) {
            background: #DFEEFC;
        }

        .caiwu dtrl:nth-child(2n) {
            background: #fff;
        }
    }
  }
</style>
