<template>
      <el-card class="box-card">
        <div id="cardWrap" class="clearfix">
          <div class="topWarp">
              <!-- <div  class="cardItem" >
                <div class="title">年份</div>
                <el-select v-model="reportSelected" placeholder="报告期"  style="width:100%;margin-top:-3px;">
                    <el-option v-for="item in reportDate" :key="item.id" :label="item.content" :value="item.id">
                    </el-option>
                </el-select>
              </div> -->
            <div class="cardItem">
              <div class="title">公司名称</div>
              <el-input v-model="compNameLike"  placeholder="公司名称"  style="width:100%;margin-top:-3px;"></el-input>
            </div>
            <div class="cardItem">
              <div class="title">MARS评级</div>
                <el-select v-model="gradeLevel" multiple collapse-tags placeholder="请选择" style="width:100%;margin-top:-3px; width: 100%;">
                <el-option v-for="item in searchOptions.level" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="cardItem">
              <div class="title">外部评级</div>
                <el-select v-model="fieldCodeValue.s_outer_level" multiple  collapse-tags placeholder="请选择" style="width:100%;margin-top:-3px;">
                <el-option
                  v-for="item in searchOptions.outerLevelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="cardItem">
              <div class="title">省份</div>
              <el-select v-model="searchOptions.provinceVal" filterable  placeholder="省份" @change="onChangeProvince" :clearable="true"   style="width:100%;margin-top:-3px;">
                <el-option v-for="item in searchOptions.province" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            </div>
            <div class="cardItem">
              <div class="title">地级市</div>
            <el-select v-model="searchOptions.cityVal" filterable  placeholder="地级市" @change="onChangeCity"  style="width:100%;margin-top:-3px;" clearable>
                <el-option v-for="item in searchOptions.cities" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            </div>
            <div class="cardItem">
              <div class="title">区县</div>
              <el-select v-model="searchOptions.districtVal" filterable  placeholder="区县"  style="width:100%;margin-top:-3px;" clearable>
                  <el-option v-for="item in searchOptions.district" :key="item" :label="item" :value="item">
                  </el-option>
              </el-select>
            </div>
         </div>
          <div style="margin-top:20px;width:100%;text-align: center">
            <el-button  size="small" style="width:120px;background: none;color:#007CD3;border: 1px solid #007CD3;font-size:14px;" @click="clearParams">清空所有条件</el-button>
            <el-button size="small" style="width:120px;background:#007CD3;color:#fff;margin-left: 20px; font-size:14px;" @click="sendParams">查询</el-button>
          </div>
        </div>
    </el-card>
</template>

<script>
import moment from 'moment';
// const maps= {
//   '5035': '钢铁',
//   '5036': '有色',
//   '5053': '地产',
//   '6001': '化工',
//   '6002': '煤炭',
//   '6003': '电力'
// }
import { mapActions } from 'vuex';
import searchList from '../search-list.js';
export default {
  props: ['mapParams', 'clearSearch', 'citComName'],
  data() {
    return {
      options: [],
      industry: '',
      moduleId: 5034,
      compNameLike: '',
      industryList: [],
      reportDate: [],
      reportSelected: '',
      searchOptions: {
        level: searchList.level,
        outerLevelList: searchList.outerLevelList,
        stockholder: searchList.stockholder,
        stockholderElectric: searchList.stockholderElectric,
        position: searchList.position,
        province: [],
        provinceVal: '',
        cities: [],
        cityVal: '',
        district: [],
        districtVal: '',
      },
      searchOptionsBase: {
        level: searchList.level,
        outerLevelList: searchList.outerLevelList,
        stockholder: searchList.stockholder,
        stockholderElectric: searchList.stockholderElectric,
        position: searchList.position,
        province: [],
        provinceVal: '',
        cities: [],
        cityVal: '',
        district: [],
        districtVal: '',
      },
      compNameLike: '',
      gradeLevel: [],
      fieldCodeValue: {
        s_industry_status: [],
        s_majority_shareholder: [],
        s_outer_level: [],
        s_scale_level: [],
        s_region: [],
        s_comp_level: [],
      },
      BasefieldCodeValue: {
        s_industry_status: [],
        s_majority_shareholder: [],
        s_outer_level: [],
        s_scale_level: [],
        s_region: [],
        s_comp_level: [],
      },
    };
  },
  methods: {
    ...mapActions(['getFiltersNew', 'getlistByCompNameLike', 'getDeepSubject', 'getProvinceNew', 'getCityByProvinceNew', 'getDistrictByCityNew']),
    clearParams() {
      this.searchOptions = this.searchOptionsBase;
      this.compNameLike = '';
      this.fieldCodeValue = { ...this.BasefieldCodeValue };
      this.$emit('sendModuleId', +this.moduleId);
    },
    sendParams() {
      if (this.searchOptions.provinceVal.length > 0) {
        this.fieldCodeValue.s_region = [this.searchOptions.provinceVal];
      } else {
        this.fieldCodeValue.s_region = [];
      }
      if (this.searchOptions.cityVal.length > 0) {
        this.fieldCodeValue.s_comp_level = this.searchOptions.cityVal instanceof Array ? this.searchOptions.cityVal : [this.searchOptions.cityVal];
      } else {
        this.fieldCodeValue.s_comp_level = [];
      }
      const params = {
        moduleId: this.moduleId,
        compNameLike: this.compNameLike,
        finalLevels: this.gradeLevel,
        fieldCodeValue: this.fieldCodeValue,
        // ...searchOptions
      };

      this.$emit('sendParams', params);
    },
    //  async getIndustry(){
    //    let params = {}
    //     params ={
    //         type: 35
    //       }
    //       try {
    //         let res =await this.getFiltersNew(params)
    //         console.log('getFiltersNew',res)
    //         if(res.status=== 200 && res.data.status === '0000'){
    //           this.reportDate = res.data.data
    //            this.reportSelected = this.reportDate[this.reportDate.length-1].id;
    //            this.$emit('sendreportDate', this.reportSelected)
    //         }
    //       } catch (error) {
    //         console.log('dataUpdate',error)
    //       }
    //   // let params ={
    //   //   type: 33
    //   // }

    // },
    onChangeProvince(option) {
      this.searchOptions.districtVal = '';
      this.getCityByProvinceNew({
        province: option,
      }).then((result) => {
        if (result.status === '0000') {
          const cityData = result.data || [];
          this.searchOptions.cities = cityData;
          // this.searchOptions.cityVal = [cityData[0]];
        }
      });
    },
    onChangeCity(city) {
      // debugger
      this.searchOptions.districtVal = '';
      console.log('onChangeCity', city);
      if (!city) {
        return;
      }
      const reportDate = +this.reportSelected;
      this.getDistrictByCityNew({ city, reportDate }).then((result) => {
        console.log('get district:', result);
        this.searchOptions.district = result || [];
        // this.searchOptions.districtVal = result[0]||'';
      });
    },
  },
  watch: {
    // reportSelected(val){ //报告期
    // console.log(val)
    //   this.$emit('sendreportDate', val)
    // },
    'mapParams.provinceVal': function (val) {
      // debugger
      console.log('mapParams.provinceVal', val);
      this.searchOptions.provinceVal = val;
      this.onChangeProvince(val);
      this.sendParams();
    },
    'mapParams.districtVal': function (val) {
      // debugger
      console.log('mapParams.districtVal', val);
    },
    'mapParams.cityVal': function (val) {
      // debugger
      console.log('mapParams.cityVal', val);
      this.searchOptions.cityVal = val;
      this.onChangeCity(val);
      this.sendParams();
    },
    clearSearch(val) {
      if (val) {
        //  debugger
        console.log('this.mapParams.cityVal', this.mapParams.cityVal);
        this.searchOptions.cityVal = this.mapParams.cityVal;
        this.onChangeCity(this.mapParams.cityVal);
        this.sendParams();
      }
    },
  },
  created() {
    this.compNameLike = this.citComName;
    this.getProvinceNew().then((result) => {
      if (result.status === '0000') {
        const provinceData = result.data || [];
        this.searchOptions.province = provinceData;
      }
    }).catch((error) => {

    });
  },
};
</script>

<style lang="less" scoped>
  .box-card{
    box-sizing: border-box;
    #cardWrap{
       width: 100%;
      //  text-align: center;
      .topWarp{
         width: 100%;
          display: flex;
          justify-content: space-between;
          .cardItem{
            width:15%;
            display: inline-block;
            margin-bottom: 10px;
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

    }
  }
</style>
