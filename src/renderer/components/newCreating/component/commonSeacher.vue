<template>
      <el-card class="box-card" style="width: 100%;">
        <div id="cardWrap" class="clearfix">
          <div class="cardItem">
            <div class="title">行业</div>
              <el-select v-model="moduleId" placeholder="请选择行业" style="width:90%;margin-top:-3px;" @change="industryChange">
              <el-option
                clearble
                v-for="item in industryList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
           <div class="cardItem">
            <div class="title">公司名称</div>
            <el-autocomplete
                style="width:90%;margin-top:-3px;"
                v-model="compNameLike"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                clearable
                @select="handleSelect">
            </el-autocomplete>
          </div>
          <div class="cardItem">
            <div class="title">MARS评级</div>
              <el-select v-model="gradeLevel" multiple collapse-tags placeholder="请选择" style="width:90%;margin-top:-3px;">
              <el-option v-for="item in searchOptions.level" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="cardItem" v-show="type!=='1' && type!=='2'">
            <div class="title">外部评级</div>
              <el-select v-model="fieldCodeValue.s_outer_level" multiple collapse-tags placeholder="请选择" style="width:90%;margin-top:-3px;">
              <el-option
                v-for="item in searchOptions.outerLevelList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="cardItem" v-show="type!=='1' && type!=='2'">
            <div class="title">控股股东性质</div>
              <el-select v-model="fieldCodeValue.s_majority_shareholder" collapse-tags multiple  placeholder="请选择" style="width:90%;margin-top:-3px;">
              <el-option
                v-for="item in searchOptions.stockholder"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="cardItem" v-show="moduleId != 5053 && type!=='1' && type!=='2'" >
            <div class="title">规模水平</div>
              <el-select v-model="fieldCodeValue.s_scale_level" placeholder="请选择" collapse-tags multiple  style="width:90%;margin-top:-3px;">
              <el-option
                v-for="item in searchOptions.position"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="cardItem"  v-show="moduleId == 5053 && type!=='1' && type!=='2'" >
            <div class="title">行业地位</div>
              <el-select v-model="fieldCodeValue.s_industry_status" multiple collapse-tags placeholder="请选择" style="width:90%;margin-top:-3px;">
              <el-option
                v-for="item in searchOptions.position"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
//   '5034': '城投',
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
  props: ['type', 'showCt'],
  data() {
    return {
      options: [],
      industry: '',
      moduleId: null,
      compNameLike: '',
      industryList: [],
      searchOptions: {
        level: searchList.level,
        outerLevelList: searchList.outerLevelList,
        stockholder: searchList.stockholder,
        stockholderElectric: searchList.stockholderElectric,
        position: searchList.position,
      },
      compNameLike: '',
      gradeLevel: [],
      fieldCodeValue: {
        s_industry_status: [],
        s_majority_shareholder: [],
        s_outer_level: [],
        s_scale_level: [],
      },
      BasefieldCodeValue: {
        s_industry_status: [],
        s_majority_shareholder: [],
        s_outer_level: [],
        s_scale_level: [],
      },
    };
  },
  methods: {
    ...mapActions(['getFiltersNew', 'getlistByCompNameLike', 'getDeepSubject']),
    clearParams() {
      this.compNameLike = '';
      this.gradeLevel = [];
      this.fieldCodeValue = { ...this.BasefieldCodeValue };
      this.$emit('sendModuleId', +this.moduleId);
    },
    handleSelect(item) {
      console.log(item);
      this.moduleId = item.moduleId;
      if (this.moduleId == 5034) {
        this.$emit('sendOtherMoudleId', { moduleId: 5034, compNameLike: item.value });
        return;
      }
      const params = {
        moduleId: this.moduleId,
        compNameLike: this.compNameLike,
        gradeLevel: this.gradeLevel,
        fieldCodeValue: this.fieldCodeValue,
      };
      this.$emit('sendParams', params);
    },
    sendParams() {
      const params = {
        moduleId: this.moduleId,
        compNameLike: this.compNameLike,
        finalLevels: this.gradeLevel,
        fieldCodeValue: this.fieldCodeValue,
      };
      this.$emit('sendParams', params);
    },
    industryChange(val) {
      // debugger
      localStorage.removeItem('modulId');
      // // this.$emit('sendModuleId', +val)
      //  let params = {
      //   moduleId: +val,
      //   compNameLike: this.compNameLike,
      //   gradeLevel: this.gradeLevel,
      //   fieldCodeValue: this.fieldCodeValue
      // }
      // this.$emit('sendParams',params)
    },
    async getIndustry() {
      //  debugger
      let params = {};
      if (this.type == '2') {
        params = {

        };
        try {
          const res = await this.getDeepSubject(params);
          console.log('getDeepSubject', res);
          if (res.status === 200 && res.data.status === '0000') {
            this.industryList = res.data.data;
            localStorage.setItem('mapping', JSON.stringify(res.data.data));
            if (!this.showCt) {
              this.industryList = this.industryList.filter(item => item.id != 5034);
            } else {
              this.industryList = res.data.data;
            }
          }
        } catch (error) {
          console.log('dataUpdate', error);
        }
      } else {
        params = {
          type: 33,
        };
        try {
          const res = await this.getFiltersNew(params);

          console.log('getFiltersNew', res);
          if (res.status === 200 && res.data.status === '0000') {
            this.industryList = res.data.data;
            if (!this.showCt) {
              this.industryList = this.industryList.filter(item => item.id != 5034);
              this.moduleId = 5053;
              // debugger
            } else {
              // debugger
              this.industryList = res.data.data;
              this.moduleId = 5034;
            }
          }
        } catch (error) {
          console.log('dataUpdate', error);
        }
      }
      // let params ={
      //   type: 33
      // }
    },
    async querySearchAsync(queryString, callback) {
      const param = {
        name: queryString,
      };
      const res = await this.getlistByCompNameLike(param);
      console.log(res);
      let list = [];
      // res.data.data.forEach(item => {
      //   item.value = item.compName
      // });
      list = res.data.data;
      callback(list);
    },
  },
  watch: {
    moduleId(val) {
      if (val == 5053) {
        this.fieldCodeValue.s_scale_level = [];
      } else {
        this.fieldCodeValue.s_industry_status = [];
      }
      const params = {
        moduleId: +val,
        compNameLike: this.compNameLike,
        gradeLevel: this.gradeLevel,
        fieldCodeValue: this.fieldCodeValue,
      };
      this.$emit('sendParams', params);
    },
    type(val) {
      this.getIndustry();
    },
    compNameLike(val) {
      if (val === '') {
        this.moduleId = 5053;
        const params = {
          moduleId: this.moduleId,
          compNameLike: this.compNameLike,
          gradeLevel: this.gradeLevel,
          fieldCodeValue: this.fieldCodeValue,
        };
        this.$emit('sendParams', params);
      }
    },
  },
  created() {
    // this.compNameLike = ''
    // this.moduleId = 5035
    // this.gradeLevel = []
    // this.fieldCodeValue = this.BasefieldCodeValue
    this.getIndustry();
  },
};
</script>

<style lang="less" scoped>
  .box-card{
    box-sizing: border-box;
    #cardWrap{
      width: 100%;
      //  text-align: center;
      .cardItem{
        width:16%;
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
    }
  }
</style>
