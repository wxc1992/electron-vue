<template>
      <el-card class="box-card"  style="width: 100%;">
        <div id="cardWrap" class="clearfix">
          <div class="fl"  style="width: 100%;text-align: center">
            <div class="cardItem"  style="width:100%;padding-top:23px;margin-bottom: 10px;">
                <el-autocomplete
                     style="width:100%;margin-top:-3px;width:592px;"
                    v-model="compName"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    clearable
                    @select="handleSelect">
                </el-autocomplete>
               <el-button type="primary" icon="el-icon-search"  size="small"  @click="sendParams" style="margin-top: -10px;"></el-button>
            </div>
            <div class="cardItem" style="margin-top: 20px;">
              <div class="title">行业</div>
                <el-select v-model="moduleId" clearable placeholder="请选择行业" style="width:100%;margin-top:-3px;" @change="industryChange">
                <el-option

                  v-for="item in industryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name+'?'+item.id">
                </el-option>
              </el-select>
            </div>
            <div class="cardItem">
              <!-- 产品需要修改的 -->
              <div class="title">德邦评级</div>
                <el-select v-model="companyLevel"  multiple collapse-tags placeholder="请选择" style="width:100%;margin-top:-3px;"  @change="companyLevelChange">
                <el-option v-for="item in searchOptions.level" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
              <el-button  size="small" style="width:120px;background: none;color:#007CD3;border: 1px solid #007CD3;font-size:14px;margin-top:-15px;" @click="clearParams">清空所有条件</el-button>
              <!-- <el-button size="small" style="width:120px;background:#007CD3;color:#fff;margin-left: 20px; font-size:14px;" @click="sendParams">查询</el-button> -->
              <el-button size="small" style="width:120px;background:#007CD3;color:#fff;margin-left: 20px; font-size:14px;margin-top:-15px;" @click="exportData">导出</el-button>
           </div>

          <!-- <div class="fr"  style="width: 40%;text-align: center">

          </div> -->
        </div>
    </el-card>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import searchList from '../search-list.js';
export default {
  props: ['type'],
  data() {
    return {
      options: [],
      industry: '',
      moduleId: '',
      typeValue: '',
      // moduleId: '钢铁?5035',爽哥要改的
      // typeValue:'钢铁',
      moduleValue: 5035,
      compName: '',
      industryList: [],
      searchOptions: {
        level: searchList.level,
        outerLevelList: searchList.outerLevelList,
        stockholder: searchList.stockholder,
        stockholderElectric: searchList.stockholderElectric,
        position: searchList.position,
      },
      compName: '',
      companyLevel: [],
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
    ...mapActions(['getFiltersNew', 'getlistByCompNameLike', 'getDeepSubject', 'exportDeepComment']),
    exportData() {
      const params = {
        type: this.moduleId.split('?')[0],
        compName: this.compName,
        companyLevel: this.companyLevel,
      };
      this.exportDeepComment(params).then((result) => {
        console.log(result);
        if (result.status == 200) {
          const fileName = decodeURI(decodeURI(result.headers['content-disposition'].split('=')[1]));
          this.common.excel(result.data, fileName);
        }
      }).catch((result) => {

      });
    },
    clearParams() {
      this.compName = '';
      this.companyLevel = [];
      this.fieldCodeValue = { ...this.BasefieldCodeValue };
      this.moduleId = '';
      const params = {
        moduleId: '',
        compName: this.compName,
        companyLevel: this.companyLevel,
      };
      // this.$emit('sendModuleId', '钢铁')
      this.$emit('sendParams', params);
    },
    handleSelect(item) {
      const mapinglist = JSON.parse(localStorage.getItem('mapping'));
      const needobj = mapinglist.filter(ele => ele.id == item.moduleId);
      console.log('needobj', needobj);
      // this.moduleId = needobj[0].name+'?'+ item.moduleId
    },
    sendParams() {
      // this.$message.warning('此搜索只是公司名称搜索按钮')
      this.moduleId = '';
      this.companyLevel = [];
      const params = {
        moduleId: '',
        compName: this.compName,
        companyLevel: this.companyLevel,
      };
      this.$emit('sendParams', params);
    },
    industryChange(val) {
      this.compName = '';
      this.typeValue = val.split('?')[0];
      this.moduleValue = val.split('?')[1];
      if (this.moduleValue == 5053) {
        this.fieldCodeValue.s_scale_level = [];
      } else {
        this.fieldCodeValue.s_industry_status = [];
      }
      const params = {
        type: this.typeValue,
        compName: this.compName,
        companyLevel: this.companyLevel,
      };
      this.$emit('sendParams', params);
    },
    companyLevelChange(val) {
      this.compName = '';
      const params = {
        type: this.typeValue,
        compName: this.compName,
        companyLevel: this.companyLevel,
      };
      this.$emit('sendParams', params);
    },
    async getIndustry() {
      let params = {};
      if (this.type == '2') {
        params = {

        };
        try {
          const res = await this.getDeepSubject(params);
          console.log('getDeepSubject', res);
          if (res.status === 200 && res.data.status === '0000') {
            this.industryList = res.data.data;
            localStorage.setItem('mapping', JSON.stringify(this.industryList));
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
      list = res.data.data;
      callback(list);
    },
  },
  watch: {
    moduleId(val) {
      console.log(val);
      this.typeValue = val.split('?')[0];
      this.moduleValue = val.split('?')[1];
      if (this.moduleValue == 5053) {
        this.fieldCodeValue.s_scale_level = [];
      } else {
        this.fieldCodeValue.s_industry_status = [];
      }
    },
    companyLevel(val) {
      this.typeValue = this.moduleId.split('?')[0];
      this.moduleValue = this.moduleId.split('?')[1];
      if (this.moduleValue == 5053) {
        this.fieldCodeValue.s_scale_level = [];
      } else {
        this.fieldCodeValue.s_industry_status = [];
      }
    },
    type(val) {
      this.getIndustry();
    },
    compName(val) {
      // if(val === ''){
      //   this.moduleId = ''
      //    let params = {
      //     type: '',
      //     compName: '',
      //     companyLevel: ''
      //   }
      //   this.$emit('sendParams',params)
      // }
    },
  },
  created() {
    // this.compName = ''
    // this.moduleId = 5035
    // this.companyLevel = []
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
