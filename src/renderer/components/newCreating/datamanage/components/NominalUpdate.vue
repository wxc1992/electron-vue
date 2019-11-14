<template>
  <div id="nomingUp" :style="{height:tableHeight+'px' }">
      <!-- <div class="clearfix">
          <div class="timeinput fl">
            <span class="title">开始时间</span>
            <el-date-picker
              :editable="false"
              style="width:150px"
              v-model="updateparams.startDate"
              :picker-options="pickerOptionsStart"
              size="mini"
              type="date"
              value-format="timestamp"
              format="yyyy-MM-dd"
              placeholder="选择开始日期"
              @change="changeEnd"/>
          </div>
          <div class="fl">
            <span class="title">结束时间</span>
              <el-date-picker
                :editable="false"
                style="width:150px"
                v-model="updateparams.endDate"
                :picker-options="pickerOptionsEnd"
                size="mini"
                type="date"
                value-format="timestamp"
                format="yyyy-MM-dd"
                placeholder="选择结束日期"
                @change="changeStart"/>
          </div>
          <div class="fl">
            <span class="title">更新方式</span>
            <el-select v-model="updateparams.updateType" clearable placeholder="请选择更新方式"  style="width:150px">
              <el-option
                v-for="item in updateTypelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="fl">
            <span class="title">报告期</span>
            <el-date-picker
              style="width:150px"
              v-model="updateparams.date"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择报告期">
            </el-date-picker>
          </div>
          <div>
            <div class="fl" style="clear:both;margin-top:10px">
              <span class="title">行业</span>
              <el-select v-model="updatetype.type" clearable placeholder="请选择行业"  style="width:150px" @change="typeChange">
                <el-option
                  v-for="item in industryList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id+'/'+item.name">
                </el-option>
              </el-select>
            </div>
            <div class="fl"  style="margin-top:10px">
              <span class="title">子行业</span>
              <el-select v-model="updatetype.secondType" clearable placeholder="请选择子行业"  style="width:150px"  @change="childtypeChange">
                <el-option
                  v-for="item in childIndustryList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div class="fl"  style="margin-top:10px;width:300px">
              <span class="title">主体公司</span>
              <el-autocomplete
                style="width:220px"
                v-model="updateparams.compName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
          </div>
      </div> -->
      <el-card class="box-card" style="width: 95%;height:400px;margin: 0 auto;text-align: center" ref='refTable'>
        <el-row>
          <el-col :span="24">
            <div  style="margin-top:10px;margin-bottom: 20px">
              <span class="title">行业</span>
              <el-select v-model="plateValue" clearable placeholder="请选择行业" >
                <el-option
                  v-for="item in industryList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>

        <el-button plain type="primary" @click="uploadFile(1)">导入</el-button>
      </el-card>

    <FileUpload ref="uploadFile" :visibility.sync="dialogVisible" :actionUrl="actiourl" :extraParams="extraParams" :uploadSuccess="uploadSuccess" :uploadError="uploadError"></FileUpload>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FileUpload from './file-upload.vue';
// import moment from 'moment'
const maps = {
  5034: '城投',
  5035: '钢铁',
  5036: '有色',
  5053: '地产',
  6001: '化工',
  6002: '煤炭',
  6003: '电力',
  6004: '轻工',
  6005: '建工',
  6006: '多元金融',
};
export default {
  components: {
    FileUpload,
  },
  data() {
    return {
      //  // 限制开始时间
      // pickerOptionsStart: {},
      // pickerOptionsEnd: {},
      // // startDate: '', // 预算开始时间
      // // endDate: '', // 预算结束时间
      // pageSize: 10,
      // currentPage: 1,
      // tableHeight: 0,
      // loading: false,
      // total: 0,
      // updateparams: {
      //   updateType: '',
      //   startDate: '',
      //   endDate: '',
      //   date: '',
      //   compName: ''
      // },
      // updatetype: {
      //   type: '',
      //   secondType: '',
      // },
      // updateTypelist: [
      //   {value: 0, label: '季报更新'},
      //   {value: 1, label: '年报更新'}
      // ],
      plateValue: '',
      industryList: [],
      // childIndustryList: [],
      actiourl: '/dsmssec/manual/importSubjectData',
      dialogVisible: false,
      extraParams: null,
      tableHeight: 0,
    };
  },
  mounted() {
    this.getIndustry();
    const that = this;
    setTimeout(() => {
      const refTable = that.$refs.refTable;
      if (!refTable) {
        return;
      }
      const tableTop = this.$refs.refTable.$el.getBoundingClientRect().top;
      const winHeight = window.innerHeight;
      this.tableHeight = winHeight - tableTop - 25;
    }, 200);
    this.$winResize.add(() => {
      clearTimeout(that.delay);
      that.delay = setTimeout(() => {
        const refTable = that.$refs.refTable;
        if (!refTable) {
          return;
        }
        const tableTop = that.$refs.refTable.$el.getBoundingClientRect().top;
        const winHeight = window.innerHeight;
        this.tableHeight = winHeight - tableTop - 25;
      }, 200);
    });
  },
  methods: {
    ...mapActions(['getDeepSubject', 'getmodCreditSubject']),
    uploadFile(type) {
      if (!this.plateValue) {
        this.$message({
          message: '请先选择行业',
          type: 'warning',
        });
        return;
      }
      this.extraParams = {
        moduleId: this.plateValue,
      };
      this.dialogVisible = true;
      try {
        this.$refs.uploadFile.clearFiles();
      } catch (err) {

      }
    },
    uploadSuccess(response, file, fileList) {
      if (response.status !== '0000') {
        if (response.status === '9998') {
          this.$message.error('权限过期，请重新登录');
          this.$router.replace('/login');
          return;
        }
        this.$message.error('导入文件失败');
      } else {
        this.$message({
          message: '导入文件成功',
          type: 'success',
        });
      }
      this.dialogVisible = false;
    },
    uploadError(err, file, fileList) {
      this.$message.error('导入文件失败:', err);
    },
    async getIndustry() {
      const params = {

      };
      try {
        const res = await this.getDeepSubject(params);
        console.log('dataUpdate', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.industryList = res.data.data;
        }
      } catch (error) {
        console.log('dataUpdate', error);
      }
    },
    // typeChange(val){
    //    console.log('typeChange',val)
    //    let id = val.split('/')[0]
    //    let params = {
    //        parentId: id
    //      }
    //      this.getFilters(params).then(res=>{
    //        console.log('getFilters', res)
    //         if(res.status === '0000'){
    //           if(!typeof res.data  == 'array'){
    //             this.childIndustryList = []
    //             this.updatetype.secondType = ''
    //           } else {
    //               this.childIndustryList = res.data
    //               this.updatetype.secondType = ''
    //           }
    //         }
    //      })
    // },
    // async querySearchAsync(queryString, callback) {
    //     const param = {
    //     name: queryString
    //   }
    // const res = await this.getmodCreditSubject(param)
    //   console.log(res)
    //   let list =[]
    //   list = res.data.data
    //   callback(list)
    // },
    // childtypeChange(val){
    //   console.log('childtypeChange',val)
    //  },
    //  handleSelect(item) {
    //     console.log(item);
    //     let name = maps[item.moduleId]
    //     this.updatetype.type = item.moduleId+ '/'+name
    //     this.typeChange(this.updatetype.type)
    //   },
    //   changeStart() {
    //   if (!this.updateparams.endDate) {
    //     this.pickerOptionsStart = {
    //       disabledDate: {}
    //     }
    //     return
    //   }
    //   this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
    //     // 可通过箭头函数的方式访问到this
    //     disabledDate: (time) => {
    //       var times = ''
    //       times = time.getTime() > this.updateparams.endDate
    //       return times
    //     }
    //   })
    // },
    // // 开始时间 控制结束时间
    // changeEnd() {
    //   if (!this.updateparams.startDate) {
    //     this.pickerOptionsEnd = {
    //       disabledDate: {}
    //     }
    //     return
    //   }
    //   this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
    //     disabledDate: (time) => {
    //       return time.getTime() < this.updateparams.startDate
    //     }
    //   })
    // },
  },

};
</script>

<style lang="less" scoped>
  #nomingUp{
    height: 100%;
    width: 100%;
    .title{
      font-size: 13px;
      color: #606060;
      // width: 60px;
      display: inline-block;
      text-align: right;
      margin-right:2px;
    }

    .fl{
      width: 230px;
      margin-left: 0;
    }
  }
</style>
