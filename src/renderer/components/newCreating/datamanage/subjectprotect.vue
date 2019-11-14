<template>
  <div id="dataShowWWWW">
        <el-dialog title="数据更新" :visible.sync="dialogFormVisible" width="500px">
          <el-form  :model="formparams" :rules="rules" ref="formparams"  v-loading="dioloading">
            <el-form-item label="债券代码" :label-width="formLabelWidth"  prop="bondCode">
              <el-input style="width: 200px" clearable v-model="formparams.bondCode" placeholder="债券代码">
              </el-input>
            </el-form-item>
            <el-form-item label="公司名称" :label-width="formLabelWidth" prop="compName">
              <el-input style="width: 200px" clearable v-model="formparams.compName" placeholder="公司名称">
              </el-input>
              <el-button type="primary" @click="synchronousCompName">同 步</el-button>
            </el-form-item>
            <el-form-item label="统一社会信用代码" :label-width="formLabelWidth" prop="registerNumber">
               <el-input style="width: 200px" clearable v-model="formparams.registerNumber" placeholder="统一社会信用代码">
              </el-input>
            </el-form-item>
            <el-form-item label="行业" :label-width="formLabelWidth" prop="type">
                <el-select v-model="formparams.type" placeholder="请选择行业" style="width:200px;margin-top:-3px;" @change="industryChange">
                  <el-option
                    clearble
                    v-for="item in industryListDiotest"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id+'/'+item.name">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="子行业" :label-width="formLabelWidth" prop="secondType">
               <!-- <el-input style="width: 200px" clearable v-model="formparams.secondType" placeholder="子行业">
              </el-input> -->
               <el-select v-model="formparams.secondType" clearable placeholder="请选择行业"  style="width:150px" @change="childtypeChangedio">
                <el-option
                  v-for="item in childIndustryListDiotest"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateData">确 定</el-button>
          </div>
        </el-dialog>
        <div  class="clearfix">
          <div class="fl" style="clear:both;margin-top:10px">
            <span class="title">行业</span>
            <el-select v-model="updatetype.type" clearable placeholder="请选择行业"  style="width:150px" @change="typeChange($event,0)">
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
            <el-select v-model="updatetype.secondType" clearable placeholder="请选择子行业"  style="width:150px"  @change="childtypeChange($event,0)">
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
              clearable
              @select="handleSelect($event,0)"
            ></el-autocomplete>
          </div>
           <div style="margin-top: 10px;" class="fl">
            <el-button size="small" type="primary" @click="doseacher">查询</el-button>
            <el-button size="small"  type="primary"  @click="addSubject({},1)">增加</el-button>
          </div>
        </div>

    <div style="margin-top: 10px;">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        :height="tableHeight"
        ref="refTable"
        style="width: 100%">
        <el-table-column
          prop="type"
          label="板块"
          width="80">
        </el-table-column>
        <el-table-column
          prop="secondType"
           width="120"
          label="二级板块">
        </el-table-column>
        <el-table-column
          prop="bondCode"
          label="债券代码">
        </el-table-column>
        <el-table-column
          prop="registerNumber"
          label="统一社会信用代码">
        </el-table-column>
        <el-table-column
          prop="compName"
          label="公司名称">
        </el-table-column>
        <el-table-column
          width="220"
          fixed="right"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="deleteSubject(scope.row.id)">删除</el-button>
            <el-button size="mini" @click="addSubject(scope.row,2)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30,60, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
const permissionMap = {
  mainButton: ['ss_all', 'ssg3.0', 'show_permission'],
};
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
  filters: {
    dateFormate(value) {
      return moment(value).format('YYYY-MM-DD');
    },
  },
  data() {
    return {
      // 限制开始时间
      pageSize: 20,
      currentPage: 1,
      tableHeight: 0,
      loading: false,
      total: 0,
      updateparams: {
        compName: '',
      },
      dioloading: false,
      updatetype: {
        type: '',
        secondType: '',
      },
      updateFormType: '',
      formLabelWidth: '140px',
      formType: {
        type: '',
        secondType: '',
      },
      rules: {
        type: [
          { required: true, message: '请输入行业名称', trigger: 'change' },
        ],
        bondCode: [
          { required: true, message: '请输入债券代码', trigger: 'blur' },
        ],
        compName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
        ],
      },
      tableData: [],
      subjectlist: [],
      dialogFormVisible: false,
      industryList: [],
      childIndustryList: [],
      childIndustryListDio: [],
      childIndustryListDiotest: [],
      industryListDiotest: [],
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
    };
  },
  mounted() {
    const isshow = this.buttonRights.show_permission3;
    console.log(isshow);
    if (!isshow) {
      this.$message.warning('没有该菜单');
      this.$router.push('/');
    }
    this.getLoglist();
    this.getIndustry();
    const that = this;
    setTimeout(() => {
      const refTable = that.$refs.refTable;
      if (!refTable) {
        return;
      }
      const tableTop = this.$refs.refTable.$el.getBoundingClientRect().top;
      const winHeight = window.innerHeight;
      this.tableHeight = winHeight - tableTop - 55;
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
        this.tableHeight = winHeight - tableTop - 55;
      }, 200);
    });
  },
  methods: {
    // 结束时间限制开始时间
    ...mapActions(['getDeepSubject', 'getFiltersNew', 'getNewsubjectMain', 'updateNewsubjectMain', 'getmodCreditSubject', 'deleteNewsubjectMain', 'synchronousComp']),
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
    doseacher() {
      this.currentPage = 1;
      this.getLoglist();
    },
    synchronousCompName() {
      const params = {
        code: this.formparams.bondCode,
      };
      this.synchronousComp(params).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.formparams.compName = res.data.name;
        }
      });
    },
    updateData() {
      this.$refs.formparams.validate((valid) => {
        if (valid) {
          this.dioloading = true;
          if (this.formparams.type.indexOf('/') > -1) {
            this.formparams.type = this.formparams.type.split('/')[1];
          } else {
            this.formparams.type = this.formparams.type;
          }
          const param = {
            ...this.formparams,
          };
          console.log('this.formparams1111111111', param);
          this.updateNewsubjectMain(param).then((res) => {
            console.log('updateNewsubjectMain', res);
            if (res.status === 200) {
              if (this.updateFormType == 1) {
                this.$message.success('新增成功');
                this.dioloading = false;
              } else {
                this.$message.success('编辑成功');
                this.dioloading = false;
              }
              this.currentPage = 1;
              this.formparams = { ...this.formparamsBase };
              this.dialogFormVisible = false;
              this.getLoglist();
            } else if (this.updateFormType == 1) {
              this.$message.error('新增失败');
              this.dioloading = false;
            } else {
              this.$message.error('编辑失败');
              this.dioloading = false;
            }
          });
        } else {
          this.$message.error('操作失败');
          return false;
        }
      });
    },
    addSubject(data, type) {
      this.updateFormType = type;
      this.dialogFormVisible = true;
      this.industryListDiotest = this.industryList;
      console.log(data);
      if (type == 1) {
        this.formparams = { ...this.formparamsBase };
      } else {
        this.formparams = { ...data };
      }
    },
    deleteSubject(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.deleteNewsubjectMain({ id: +id }).then((res) => {
          if (res.status == 200) {
            if (this.tableData.length === 1) {
              this.currentPage--;
            }
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          }
          this.getLoglist();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    industryChange(val) {
      console.log(val);
      const params = {
        parentId: val.split('/')[0],
      };
      this.getFiltersNew(params).then((res) => {
        console.log('getFilters', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.childIndustryListDiotest = res.data.data;
        }
      });
    },
    childtypeChangedio() {

    },
    typeChange(val, type) {
      console.log('typeChange', val);
      const id = val.split('/')[0];
      const params = {
        parentId: id,
      };
      this.getFiltersNew(params).then((res) => {
        console.log('getFilters', res);
        if (res.status === 200 && res.data.status === '0000') {
          if (type == 0) {
            if (!typeof res.data.data == 'array') {
              this.childIndustryList = [];
              this.updatetype.secondType = '';
            } else {
              this.childIndustryList = res.data.data;
              this.updatetype.secondType = '';
            }
          } else if (!typeof res.data.data == 'array') {
            this.childIndustryListDio = [];
            this.formType.secondType = '';
          } else {
            this.childIndustryListDio = res.data.data;
            this.updatetype.secondType = '';
          }
        }
      });

      console.log('typeChange', type);
    },
    childtypeChange(val, type) {
      console.log('childtypeChange', val);
      console.log('childtypeChange', type);
    },
    async getLoglist() {
      this.loading = true;
      let type = this.updatetype.type;
      if (type !== '') {
        type = type.split('/')[1];
      } else {
        type = '';
      }
      const params = {
        ...this.updateparams,
        type,
        secondType: this.updatetype.secondType,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      const res = await this.getNewsubjectMain(params);
      console.log('getNewsubjectMain', res);
      if (res.status === 200) {
        this.tableData = res.data.records;
        this.total = res.data.total;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      } else {
        this.tableData = [];
        this.total = 0;
        this.$message.error('获取数据失败');
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      this.getLoglist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.current, val);
      this.getLoglist();
    },
    async querySearchAsync(queryString, callback) {
      const param = {
        name: queryString,
      };
      const res = await this.getmodCreditSubject(param);
      console.log(res);
      let list = [];
      list = res.data.data;
      callback(list);
    },
    async querySearchAsync2(queryString, callback) {
      const param = {
        name: queryString,
      };
      const res = await this.getmodCreditSubject(param);
      console.log(res);
      let list = [];
      list = res.data.data;
      callback(list);
    },
    handleSelect(item, type) {
      console.log(item);
      console.log(type);
      if (type === 0) {
        const name = maps[item.moduleId];
        this.updatetype.type = `${item.moduleId}/${name}`;
        this.typeChange(this.updatetype.type, 0);
      } else {
        debugger;
        const name = maps[item.moduleId];
        this.formType.type = `${item.moduleId}/${name}`;
        this.typeChange(this.formType.type, 1);
      }
    },
    showUpdate() {
      this.dialogFormVisible = true;
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
  },
};
</script>

<style scoped lang="less">
  #dataShowWWWW{

    .title{
      font-size: 13px;
      color: #606060;
      width: 60px;
      display: inline-block;
      text-align: right;
      margin-right:2px;
    }
    .el-form-item{
      // margin-bottom: 10px;
    }
    .fl{
      width: 230px;
      margin-left: 0;
    }

  }

</style>
