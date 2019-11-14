<template>
  <div id="applyComment">
    <!-- <addcomment :rosterlist="rosterlist" @sendHide="sendHide" :rowData="rowData"  :addComment="addComment"></addcomment> -->
     <el-dialog title="新增主体" :visible.sync="dialogFormVisible" width="500px" @close="cancelUpdate">
        <el-form  :model="formparams" :rules="rules" ref="formparams"  v-loading="dioloading">
          <el-form-item label="债券代码" :label-width="formLabelWidth"  prop="bondCode">
            <el-input style="width: 200px" clearable v-model="formparams.bondCode" placeholder="债券代码">
            </el-input>
          </el-form-item>
          <el-form-item label="公司名称" :label-width="formLabelWidth" prop="compName">
            <el-input style="width: 200px" clearable v-model="formparams.compName" placeholder="公司名称">
            </el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码" :label-width="formLabelWidth" prop="registerNumber">
              <el-input style="width: 200px" clearable v-model="formparams.registerNumber" placeholder="统一社会信用代码">
            </el-input>
          </el-form-item>
          <el-form-item label="行业" :label-width="formLabelWidth" prop="type">
               <el-select v-model="formparams.type" placeholder="请选择行业" style="width:200px;margin-top:-3px;" @change="industryChange">
                <el-option
                  clearble
                  v-for="item in industryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id+'/'+item.name">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="子行业" :label-width="formLabelWidth" prop="secondType">
              <el-select v-model="formparams.secondType" clearable placeholder="请选择行业"  style="width:150px" @change="childtypeChange">
              <el-option
                v-for="item in childIndustryList"
                :key="item.value"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="updateData">确 定</el-button>
        </div>
    </el-dialog>
    <el-card class="box-card-header">
         <div class="cardItem">
          <div class="title">待处理主体</div>
          <el-autocomplete
              style="width:100%;margin-top:-3px;"
              v-model="seacherParams.compName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入待处理主体"
              clearable
              @select="handleSelect">
          </el-autocomplete>
        </div>
        <div class="cardItem">
          <div class="title">申请状态</div>
            <el-select v-model="seacherParams.status" clearable placeholder="请选择申请状态" style="width:100%;margin-top:-3px;">
            <el-option
              label="无"
              value=0>
            </el-option>
            <el-option
              label="已接受"
              value=1>
            </el-option>
            <el-option
              label="已拒绝"
              value=2>
            </el-option>
          </el-select>
        </div>
         <div class="cardItem">
          <div class="title">是否已有维护主体</div>
            <el-select v-model="seacherParams.haveSubject" clearable placeholder="请选择申请状态" style="width:100%;margin-top:-3px;">
              <el-option
                  label="是"
                  :value='flag'>
                </el-option>
                <el-option
                  label="否"
                  :value='!flag'>
                </el-option>
          </el-select>
        </div>
         <div class="cardItem">
          <div class="title">是否已点评</div>
            <el-select v-model="seacherParams.haveLevel" clearable placeholder="请选择申请状态" style="width:100%;margin-top:-3px;">
             <el-option
              label="是"
              :value='flag'>
            </el-option>
            <el-option
              label="否"
              :value='!flag'>
            </el-option>
          </el-select>
        </div>
         <div style="margin-top:20px;width:100%;text-align: center">
          <!-- <el-button  style="width:120px;background: none;color:#007CD3;border: 1px solid #007CD3;font-size:14px;" @click="clearParams">清空所有条件</el-button> -->
          <el-button size="small" style="width:120px;background:#007CD3;color:#fff;margin-left: 20px; font-size:14px;" @click="doseacher">查询</el-button>
        </div>
    </el-card>
     <el-card class="box-card-bottom" :style="{height: cardHeight+ 'px'}">
        <el-table
          :row-class-name="tableRowClassName"
          :data="tableData"
          v-loading="loading"
          :height="cardHeight-80"
          style="width: 100%">
          <el-table-column
            type="index"
            label="+"
            fixed
            width="50">
          </el-table-column>
          <el-table-column
            label="申请人"
             prop="userName">
          </el-table-column>
         <el-table-column
            label="待审核主体"
             width="220"
            prop="compName">
          </el-table-column>
          <el-table-column
            label="申请时间"
            prop="addTime">
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status">
             <template slot-scope="scope">
              {{scope.row.status|filterStatus}}
            </template>
          </el-table-column>
          <el-table-column
            label="是否已有主体"
            align="center"
            prop="haveSubject">
            <template slot-scope="scope">
              {{scope.row.haveSubject== true?'是':'否'}}
            </template>
          </el-table-column>
           <el-table-column
            label="是否已有点评"
             align="center"
            prop="haveLevel">
             <template slot-scope="scope">
              {{scope.row.haveLevel== true?'是':'否'}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            width="200">
            <template slot-scope="scope" >
              <el-button size="mini" plain @click="agree(scope.row)" v-show="scope.row.status ==0">接受</el-button>
              <el-button size="mini" plain @click="reject(scope.row)" v-show="scope.row.status ==0">拒绝</el-button>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import addcomment from './applyAdd.vue';
export default {
  components: {
    addcomment,
  },
  data() {
    return {
      cardHeight: window.innerHeight - 298,
      dioloading: false,
      rowData: {},
      rosterlist: [],
      seacherParams: {
        status: '',
        compName: '',
        haveLevel: '',
        haveSubject: '',
      },
      addComment: false,
      pageSize: 20,
      currentPage: 1,
      total: 0,
      tableData: [],
      flag: true,
      loading: false,
      formLabelWidth: '130px',
      formparams: {
        bondCode: '',
        compName: '',
        registerNumber: '',
        secondType: '',
        type: '',
      },
      formparamsBase: {
        bondCode: '',
        compName: '',
        registerNumber: '',
        secondType: '',
        type: '',
      },
      industryList: [],
      childIndustryList: [],
      childIndustryListDio: [],
      rules: {
        type: [
          { required: true, message: '请选择行业', trigger: 'change' },
        ],
        bondCode: [
          { required: true, message: '请输入债券代码', trigger: 'blur' },
        ],
        compName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
        ],
      },
      dialogFormVisible: false,
    };
  },
  filters: {
    filterStatus(val) {
      let value = null;
      if (val == '0') {
        value = '无';
      } else if (val == '1') {
        value = '已接受';
      } else if (val == '2') {
        value = '已拒绝';
      }
      return value;
    },
  },
  methods: {
    ...mapActions(['getApplyLevel', 'updateApplyLevel', 'getNewrosterList', 'getDeepSubject', 'getFiltersNew', 'updateNewsubjectMain', 'getlistByCompNameLike', 'addSubjectPermission']),
    sendHide(val) {
      this.addComment = val;
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
    industryChange(val) {
      const id = val.split('/')[0];
      this.formparams.type = val.split('/')[1];
      const params = {
        parentId: id,
      };
      this.getFiltersNew(params).then((res) => {
        console.log('getFilters', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.childIndustryList = res.data.data;
          this.formparams.secondType = '';
        }
      });
    },
    childtypeChange(val) {

    },
    cancelUpdate() {
      this.formparams = { ...this.formparamsBase };
      this.dialogFormVisible = false;
    },
    updateData() {
      this.$refs.formparams.validate((valid) => {
        if (valid) {
          this.dioloading = true;
          const param = {
            ...this.formparams,
          };
          console.log('this.formparams1111111111', param);
          this.updateNewsubjectMain(param).then((res) => {
            console.log('updateNewsubjectMain', res);
            if (res.status === 200) {
              this.$message.success('新增主体数据成功,请去新增点评页面录入点评');
              this.formparams = { ...this.formparamsBase };
              this.currentPage = 1;
              this.formparams = { ...this.formparamsBase };
              const params = {
                id: this.rowData.id,
                haveSubject: true,
              };
              this.updateApplyLevel(params).then((res) => {
                console.log('updateData', res);
                if (res.status == 200 && res.data.status == '0000') {
                  this.$message.success('更新状态成功');
                  this.getMainData();
                }
              });
              this.dioloading = false;
              this.dialogFormVisible = false;
              // this.getMainData()
            } else {
              this.$message.error('新增失败');
              this.dioloading = false;
            }
          });
        } else {
          this.$message.error('操作失败');
          return false;
        }
      });
    },
    getroster() {
      this.getNewrosterList().then((res) => {
        console.log('getNewrosterListQQQQQQQQQQQQQQQQ', res);
        if (res.status === 200 && res.data.status == '0000') {
          if (res.data.data.length > 0) {
            this.rosterlist = res.data.data;
          } else {
            // this.$message.warning('准入白名单为空')
            this.rosterlist = [];
          }
        }
      });
    },

    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getMainData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMainData();
    },
    doseacher() {
      this.currentPage = 1;
      this.getMainData();
    },
    agree(data) {
      console.log('agree  haveLevel  haveSubject', data);
      if (data.haveLevel) {
        if (data.haveLevel && data.haveSubject) {
          const params = {
            userId: data.userId,
            type: data.type,
            compName: data.compName,
          };
          console.log('params', params);
          this.addSubjectPermission(params).then((res) => {
            if (res.status == 200 && res.data.status == '0000') {
              this.$message.success('赋权成功');
              const params = {
                status: '1',
                id: data.id,
              };
              this.updateApplyLevel(params).then((res) => {
                console.log('reject', res);
                if (res.status == 200 && res.data.status == '0000') {
                  this.$message.success('更新状态成功');
                  this.getMainData();
                }
              });
            } else if (res.data.status == '00221') {
              this.$message.error(res.data.msg);
              const params = {
                status: '1',
                id: data.id,
              };
              this.updateApplyLevel(params).then((res) => {
                console.log('reject', res);
                if (res.status == 200 && res.data.status == '0000') {
                  // this.$message.success('更新状态成功')
                  this.getMainData();
                }
              });
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          const params = {
            status: '1',
            id: data.id,
          };
          this.updateApplyLevel(params).then((res) => {
            console.log('reject', res);
            if (res.status == 200 && res.data.status == '0000') {
              this.$message.success('更新状态成功');
              this.getMainData();
            }
          });
        }
      } else {
        // this.$message.success('无点评')
        this.rowData = data;
        if (data.haveSubject) {
          this.$message.warning('请去新增点评的界面录入点评');
        } else {
          this.formparams.compName = data.compName;
          this.dialogFormVisible = true;
        }
      }
    },
    reject(data) {
      console.log('reject  haveLevel  haveSubject', data);
      const params = {
        status: '2',
        id: data.id,
      };
      this.updateApplyLevel(params).then((res) => {
        console.log('reject', res);
        if (res.status == 200 && res.data.status == '0000') {
          this.$message.success('更新状态成功');
          this.getMainData();
        }
      });
    },
    getMainData() {
      this.loading = true;
      const params = {
        ...this.seacherParams,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
      };
      this.getApplyLevel(params).then((res) => {
        console.log('getApplyLevel', res);
        if (res.status == 200 && res.data.status == '0000') {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return 'warning-row';

      return '';
    },
    handleSelect(item) {
      console.log(item);
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
  created() {
    this.getMainData();
    this.getIndustry();
  },
  mounted() {
    this.getroster();
  },
};
</script>

<style scoped lang="less">
  #applyComment{
    width: 100%;
    height: 100%;
    margin-top: 20px;
    .box-card-header{
      height: 150px;
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
    .box-card-bottom{
      margin-top: 20px;
    }
  }
</style>
