<template>
      <el-card class="box-card" style="width: 100%;">
        <div id="cardWrap" class="clearfix">
           <div class="fl"  style="width:100%;text-align: center">
              <div class="cardItem" style="width:100%;padding-top:23px;margin-bottom: 10px;">
                  <el-autocomplete
                      style="width:100%;margin-top:-3px;width:592px;"
                      v-model="compNameLike"
                      :fetch-suggestions="querySearchAsync"
                      placeholder="请输入公司"
                      clearable
                      @select="handleSelect">
                  </el-autocomplete>
                  <el-button type="primary" icon="el-icon-search"  size="small"  @click="sendParams" style="margin-top: -10px;"></el-button>
                </div>
                <div class="cardItem" style="margin-top: 20px;">
                    <div class="title">行业</div>
                      <el-select v-model="moduleId" placeholder="请选择行业" style="width:100%;margin-top:-3px;" @change="industryChange">
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
                  <div class="title">MARS评级</div>
                    <el-select v-model="finalLevels" multiple  collapse-tags placeholder="请选择" style="width:100%;margin-top:-3px;"  @change="FinalChange">
                      <el-option v-for="item in searchOptions.level" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                  <el-button  size="small" style="width:120px;background: none;color:#007CD3;border: 1px solid #007CD3;font-size:14px;" @click="clearParams">清空所有条件</el-button>
                  <el-button size="small" style="width:120px;background:#007CD3;color:#fff;margin-left: 20px; font-size:14px;margin-top:-15px;" @click="exportExcel">导出</el-button>
              <div class="cardItem" v-show="type!=='1' && type!=='2'">
                <div class="title">外部评级</div>
                  <el-select v-model="fieldCodeValue.s_outer_level" multiple  placeholder="请选择" style="width:100%;margin-top:-3px;">
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
                  <el-select v-model="fieldCodeValue.s_majority_shareholder" multiple  placeholder="请选择" style="width:100%;margin-top:-3px;">
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
                  <el-select v-model="fieldCodeValue.s_scale_level" placeholder="请选择" multiple  style="width:100%;margin-top:-3px;">
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
                  <el-select v-model="fieldCodeValue.s_industry_status" multiple  placeholder="请选择" style="width:100%;margin-top:-3px;">
                  <el-option
                    v-for="item in searchOptions.position"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
          </div>
          <!-- <div class="fr" style="width: 40%;text-align: center">
            <div class="cardItem" style="width:100%;padding-top:23px;">
              <el-autocomplete
                  style="width:100%;margin-top:-3px;width:220px"
                  v-model="compNameLike"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  clearable
                  @select="handleSelect">
              </el-autocomplete>
              <el-button type="primary" icon="el-icon-search"  size="small"  @click="sendParams"></el-button>
            </div>
            <div>

            </div>
          </div> -->
        </div>
        <!-- <div style="margin-top:20px;width:100%;text-align: center"> -->
            <!-- <el-button size="small" style="width:120px;background:#007CD3;color:#fff;margin-left: 20px; font-size:14px;" @click="sendParams">查询</el-button> -->

          <!-- </div> -->
    </el-card>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import searchList from '../search-list.js';
const maps = {
  5034: '城投',
  5035: '钢铁',
  5036: '有色',
  5053: '地产',
  6001: '化工',
  6002: '煤炭',
  6003: '电力',
};
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
      finalLevels: [],
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
    ...mapActions(['getFiltersNew', 'getlistByCompNameLike', 'getDeepSubject', 'exporMarspinf']),
    clearParams() {
      this.compNameLike = '';
      this.finalLevels = [];
      this.moduleId = '';
      this.fieldCodeValue = { ...this.BasefieldCodeValue };
      const params = {
        moduleId: this.moduleId,
        compNameLike: this.compNameLike,
        finalLevels: this.finalLevels,
        fieldCodeValue: this.fieldCodeValue,
      };
      this.$emit('sendParams', params);
    },
    exportExcel() {
      const params = {
        type: this.moduleId,
        compNameLike: this.compNameLike,
        finalLevels: this.finalLevels,
      };
      this.exporMarspinf(params).then((result) => {
        console.log(result);
        if (result.status == 200) {
          const fileName = decodeURI(decodeURI(result.headers['content-disposition'].split('=')[1]));
          this.common.excel(result.data, fileName);
        }
      }).catch((result) => {

      });
    },
    handleSelect(item) {
      console.log(item);

      this.compNameLike = item.value;
      // this.moduleId = item.moduleId
      const params = {
        moduleId: this.moduleId,
        compNameLike: this.compNameLike,
        finalLevels: this.finalLevels,
        fieldCodeValue: this.fieldCodeValue,
      };
      // this.$emit('sendParams',params)
    },
    sendParams() {
      localStorage.removeItem('modulId');
      // this.$message.warning('此搜索只是公司名称搜索按钮')
      this.finalLevels = [];
      this.moduleId = '';
      const params = {
        moduleId: '',
        compNameLike: this.compNameLike,
        finalLevels: [],
        fieldCodeValue: this.fieldCodeValue,
      };
      this.$emit('sendParams', params);
    },
    industryChange(val) {
      // debugger
      this.compNameLike = '';
      localStorage.removeItem('modulId');
      if (val == 5053) {
        this.fieldCodeValue.s_scale_level = [];
      } else {
        this.fieldCodeValue.s_industry_status = [];
      }
      if (this.moduleId == '') {
        this.moduleId = '';
      }
      // this.$emit('sendModuleId', +val)
      const params = {
        moduleId: this.moduleId,
        compNameLike: this.compNameLike,
        finalLevels: this.finalLevels,
        fieldCodeValue: this.fieldCodeValue,
      };
      this.$emit('sendParams', params);
    },
    FinalChange(val) {
      this.compNameLike = '';
      if (val == 5053) {
        this.fieldCodeValue.s_scale_level = [];
      } else {
        this.fieldCodeValue.s_industry_status = [];
      }
      const params = {
        moduleId: this.moduleId,
        compNameLike: this.compNameLike,
        finalLevels: this.finalLevels,
        fieldCodeValue: this.fieldCodeValue,
      };
      this.$emit('sendParams', params);
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
              // this.moduleId = 5035
              // debugger
            } else {
              // debugger
              this.industryList = res.data.data;
              // this.moduleId = +localStorage.getItem('modulId') || 5034
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
      if (this.moduleId == '') {
        this.moduleId = '';
      }

      // let params = {
      //   moduleId: this.moduleId,
      //   compNameLike: this.compNameLike,
      //   finalLevels: this.finalLevels,
      //   fieldCodeValue: this.fieldCodeValue
      // }
      // if( this.moduleId != ''){
      //    this.$emit('sendParams',params)
      // }
    },
    finalLevels(val) {
      // this.compNameLike = ''
      if (this.moduleId == 5053) {
        this.fieldCodeValue.s_scale_level = [];
      } else {
        this.fieldCodeValue.s_industry_status = [];
      }
      // let params = {
      //   moduleId: this.moduleId,
      //   compNameLike: this.compNameLike,
      //   finalLevels: this.finalLevels,
      //   fieldCodeValue: this.fieldCodeValue
      // }
      //  if( this.finalLevels != '' || this.compNameLike == ''){
      //    this.$emit('sendParams',params)
      // }
    },
    type(val) {
      this.getIndustry();
    },
    compNameLike(val) {
      // if(val === ''){
      //   this.moduleId = ''
      //    let params = {
      //     moduleId: this.moduleId,
      //     compNameLike: this.compNameLike,
      //     finalLevels: this.finalLevels,
      //     fieldCodeValue: this.fieldCodeValue
      //   }
      //   this.$emit('sendParams',params)
      // }
    },
  },
  created() {
    // this.compNameLike = ''
    // this.moduleId = 5035
    // this.finalLevels = []
    // this.fieldCodeValue = this.BasefieldCodeValue
    this.getIndustry();
    const val = localStorage.getItem('modulId');
    console.log("localStorage.getItem('modulId')", val);
    if (localStorage.getItem('modulId') !== null) {
      // debugger
      this.moduleId = +localStorage.getItem('modulId');
      const params = {
        moduleId: this.moduleId,
        compNameLike: this.compNameLike,
        finalLevels: this.finalLevels,
        fieldCodeValue: this.fieldCodeValue,
      };
      this.$emit('sendParams', params);
    } else {
      this.moduleId = '';
    }
  },
};
</script>

<style lang="less" scoped>
  .box-card{
    box-sizing: border-box;
    #cardWrap{
       width: 100%;
      //  text-align: center;
      margin: 0 auto;
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
  }
</style>
