<template>
<div class="newCredit" ref="refNew" v-loading="loading" element-loading-text="保存中..." :style="styleObj">
    <!-- <div class="top">
        <div>证券代码：<el-input v-model="inputs.code" placeholder="请输入证券代码" style="width:150px"></el-input>
        </div>
        <div>公司名称：<el-input v-model="inputs.compName" placeholder="请输入公司名称" style="width:150px"></el-input>
        </div>
        <el-button v-if="operateType===''" @click="requireWind" type="primary">拉取数据</el-button>
    </div> -->
    <div class="formFill">
         <div  id="comment_ct" style="width:95%;margin: 0 auto">
            <div class="baseInfo" >
            <div class="moduelName">基本信息</div>
            <table class="mainTable" align="center" >
                <tr>
                    <td style="height:40px;">公司全称</td>
                    <td  style="height:40px;" colspan="3"><el-input type="text" v-model="inputs.compName" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr class="tr0">
                    <td>第一大股东</td>
                    <td><el-input type="text" v-model="formData.s_name_of_major_shareholder_one" style="width:100%;height:100%;"></el-input></td>
                    <td style="height:40px;">参考外部城投评分</td>
                    <td style="height:40px;"><el-input type="text" v-model="formData.s_reference_score" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr class="tr1"  style="height:40px;">
                    <td>省</td>
                    <td><el-input type="text" v-model="formData.s_region" style="width:100%;height:100%;"></el-input></td>
                    <td>市</td>
                    <td><el-input type="text" v-model="formData.s_comp_level" style="width:100%;height:100%;"></el-input></td>
                    
                </tr>
                <tr class="tr2"  style="height:40px;">
                    <td>区县</td>
                    <td><el-input type="text" v-model="formData.s_district" style="width:100%;height:100%;"></el-input></td>
                    <td >实际控制人</td>
                    <td><el-input type="text" v-model="formData.s_actual_controller" style="width:100%;height:100%;"></el-input></td>
                    
                </tr>
                <tr class="tr6"  style="height:40px;">
                    <td style="height:40px;">董事长曾任职位</td>
                    <td style="height:40px;" colspan="3"><el-input type="text" v-model="formData.s_chairman_position" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr>
                    <td style="height:80px;">简介</td>
                    <td style="height:80px;" colspan="3"><el-input type="textarea" :rows="3" v-model="formData.s_brief" style="width:100%;height:100%;"></el-input></td>
                </tr>
                </table>
            </div>
            <div>
            <div class="moduelName">定量数据</div>
            <table class="caiwu">
                <tr>
                    <td>地区GDP(亿元)</td>
                    <td><el-input type="text" v-model="formData.s_region_gdp_fake" style="width:100%;height:100%;"></el-input></td>
                    <td>一般预算收入(亿元)</td>
                    <td><el-input type="text" v-model="formData.s_general_budget_revenue" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr>
                    <td>担保比率(%)</td>
                    <td><el-input type="text" v-model="formData.s_guarantee" style="width:100%;height:100%;"></el-input></td>
                    <td>资产总额(亿元)</td>
                    <td><el-input type="text" v-model="formData.s_total_assets" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr>
                    <td>营业收入(亿元)</td>
                    <td><el-input type="text" v-model="formData.s_operation_revenue" style="width:100%;height:100%;"></el-input></td>
                    <td>资产负债率 (%)</td>
                    <td><el-input type="text" v-model="formData.s_debttoassets" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr>
                    <td>已获利息倍数</td>
                    <td><el-input type="text" v-model="formData.s_interest_coverage" style="width:100%;height:100%;"></el-input></td>
                    <td>带息债务率(%)</td>
                    <td><el-input type="text" v-model="formData.s_interestdebt" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr>
                    <td>净资产</td>
                    <td ><el-input type="text" v-model="formData.s_net_asset" style="width:100%;height:100%;"></el-input></td>
                    <td>有息债务(亿元)</td>
                    <td ><el-input type="text" v-model="formData.s_interest_bearing_liabilities" style="width:100%;height:100%;"></el-input></td>
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
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="textarea" :rows="4" v-model="formData.s_zone_superiority" style="width:100%;height:100%;"></el-input></td>
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="text" v-model="formData.s_zone_superiority_level" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr>
                    <td>政策支持</td>
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="textarea" :rows="4" v-model="formData.s_policy_support" style="width:100%;height:100%;"></el-input></td>
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="text" v-model="formData.s_policy_support_level" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr>
                    <td>项目补助制度</td>
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="textarea" :rows="4" v-model="formData.s_project_subsidy_system" style="width:100%;height:100%;"></el-input></td>
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="text" v-model="formData.s_project_subsidy_system_level" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr>
                    <td>所运营项目质量</td>
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="textarea" :rows="4" v-model="formData.s_projects_quality" style="width:100%;height:100%;"></el-input></td>
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="text" v-model="formData.s_projects_quality_level" style="width:100%;height:100%;"></el-input></td>
                </tr>
                <tr>
                    <td>资产流动性</td>
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="textarea" :rows="4" v-model="formData.s_liquidity_of_assets" style="width:100%;height:100%;"></el-input></td>
                    <td style="padding: 10px 5px;box-sizing: border-box;"><el-input type="text" v-model="formData.s_liquidity_of_assets_level" style="width:100%;height:100%;"></el-input></td>
                </tr>
            </table>
        </div>
        <div class="save">
            <el-button @click="save" type="primary">保存</el-button>
        </div>
    </div>

</div>
</template>

<script>
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';
const windFieldMap = {};
const rightsMap = {
  mainButton: ['ssg3.0', 'credit-main'],
};
export default {
  data() {
    return {
      inputs: {
        compName: '',
      },
      loading: false,
      styleObj: {
        height: 'auto',
      },
    };
  },
  props: ['tabData', 'ctDiodata', 'reportDate', 'moduleId'],
  created() {
    // this.requestColumns();
  },
  mounted() {
    const isshow = this.buttonRights['credit-new'];
    if (!isshow) {
      // this.$router.push('/home');
      return;
    }
    const that = this;
    const tableTop = this.$refs.refNew.getBoundingClientRect().top;
    const winHeight = window.innerHeight;
    this.styleObj.height = `${winHeight - tableTop}px`;
    this.$winResize.add(() => {
      clearTimeout(this.delay);
      this.delay = setTimeout(() => {
        const winHeight = window.innerHeight;
        that.styleObj.height = `${winHeight - tableTop}px`;
      }, 200);
    });
  },
  methods: {
    ...mapActions(['getMainColumnNew', 'getWindData', 'saveCreditDataNew', 'auditCreditData']),
    save() {
      this.loading = true;
      // const filter = this.getCreditFilter;
      const moduleId = this.moduleId;
      const reportDate = this.dateValue;
      const inputs = this.inputs;

      const id = this.ctDiodata.id;
      const modCreditSubject = {
        moduleId,
        id,
        compName: inputs.compName,
        cals: { ...this.formData },

      };
      this.saveCreditDataNew({
        ...modCreditSubject,
      }).then((result) => {
        console.log('save result:', result);
        this.loading = false;
        if (result.status === '0000') {
          this.$message({
            message: '保存成功',
            type: 'success',
          });
          this.$emit('sendClose', false);
          this.$emit('sendParamsUpdate', { moduleId: 5034 });
          return;
        }
        this.$message({
          message: '保存失败',
          type: 'warning',
        });
      });
    },
    parseRightsData(entry, codeIndex) {
      const resCode = rightsMap.mainButton[codeIndex++];
      const nextCode = rightsMap.mainButton[codeIndex];
      if (!nextCode) {
        return entry.childs || [];
      }
      const children = entry.childs || [];
      if (children.length === 0) {
        return [];
      }
      let found = false;
      for (const item of children) {
        if (nextCode === item.resCode) {
          found = true;
          return this.parseRightsData(item, codeIndex);
        }
      }
      if (!found) {
        return [];
      }
    },
  },
  computed: {
    ...mapGetters(['getCreditColumns', 'getUserRights']),
    formData() {
      this.inputs.compName = this.ctDiodata.compName;
      return this.ctDiodata.cals;
    },
    buttonRights() {
      const entry = this.getUserRights;
      const mainButtons = rightsMap.mainButton;
      const rets = this.parseRightsData(entry, 0);
      const ret = {};
      if (rets instanceof Array) {
        rets.forEach((val) => {
          ret[val.resCode] = true;
        });
      }
      console.log('get ret of button rights:', ret);
      return ret;
    },

    operateType() {
      return this.tabData && this.tabData.type || '';
    },
  },

};
</script>

<style scoped lang="less">
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
              height: 40px;
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
</style>
