<template>
  <div id="dataShowMa">
    <el-dialog title="数据更新" :visible.sync="dialogFormVisible" width="40%">
      <el-form  :model="formparams" :rules="rules" ref="formparams">
        <el-form-item label="更新类型" :label-width="formLabelWidth"  prop="dataType">
          <el-select v-model="formparams.dataType" placeholder="请选择更新类型">
            <el-option label="模型数据类型" value="0"></el-option>
            <el-option label="财务数据类型" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更新方式" :label-width="formLabelWidth" prop="updateType">
          <el-select v-model="formparams.updateType" clearable placeholder="请选择更新方式">
            <el-option
              v-for="item in updateTypelist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告期" :label-width="formLabelWidth" prop="date">
          <el-date-picker
           style="width:190px"
            v-model="formparams.date"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择报告期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="行业" :label-width="formLabelWidth">
          <el-select v-model="formType.type" clearable placeholder="请选择行业"  style="width:150px" @change="typeChange($event,1)">
              <el-option
                v-for="item in industryList"
                :key="item.value"
                :label="item.name"
                :value="item.id+'/'+item.name">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="子行业" :label-width="formLabelWidth">
          <el-select v-model="formType.secondType" clearable placeholder="请选择行业"  style="width:150px" @change="childtypeChange($event,1)">
              <el-option
                v-for="item in childIndustryListDio"
                :key="item.value"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="主体" :label-width="formLabelWidth">
         <el-autocomplete
              style="width:220px"
              v-model="formparams.compName"
              :fetch-suggestions="querySearchAsync2"
              clearable
              placeholder="请输入内容"
              @select="handleSelect($event,1)"
            ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
    <div class="clearfix">
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
        <div class="clearfix">
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
        </div>
    </div>
    <div style="margin-top: 10px;">
      <el-button size="small" type="primary" @click="doseacher">查询</el-button>
      <el-button size="small" type="primary" @click="showUpdate">更新</el-button>
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
          prop="updateDate"
          label="更新时间"
          width="180">
          <template slot-scope="scope">
            {{scope.row.updateDate |dateFormate}}
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="date"
          label="更新类型"
          width="180">
        </el-table-column> -->
        <el-table-column
          prop="updateType"
          label="更新方式">
          <template slot-scope="scope">
            {{scope.row.updateType==1?'年报更新':'季报更新'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="reportDate"
          label="报告期">
        </el-table-column>
        <el-table-column
          prop="type"
          label="行业">
        </el-table-column>
        <el-table-column
          prop="secondType"
          label="子行业">
        </el-table-column>
        <el-table-column
          prop="compName"
          width="200px"
          label="主体">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="操作员">
        </el-table-column>
        <el-table-column
          prop="updateStatus"
          label="更新状态">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30,60, 100]"
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
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  data() {
    return {
      // 限制开始时间
      pickerOptionsStart: {},
      pickerOptionsEnd: {},
      // startDate: '', // 预算开始时间
      // endDate: '', // 预算结束时间
      pageSize: 10,
      currentPage: 1,
      tableHeight: 0,
      loading: false,
      total: 0,
      updateparams: {
        updateType: '',
        startDate: '',
        endDate: '',
        date: '',
        compName: '',
      },
      updatetype: {
        type: '',
        secondType: '',
      },
      formLabelWidth: '120px',
      formparams: {
        updateType: '',
        dataType: '',
        date: '',
        compName: '',
      },
      formType: {
        type: '',
        secondType: '',
      },
      tableData: [],
      updateTypelist: [
        { value: 0, label: '季报更新' },
        { value: 1, label: '年报更新' },
      ],
      subjectlist: [],
      dialogFormVisible: false,
      industryList: [],
      childIndustryList: [],
      childIndustryListDio: [],
      rules: {
        dataType: [
          { required: true, message: '请选择请选择更新类型', trigger: 'change' },
        ],
        updateType: [
          { required: true, message: '请选择请选择更新方式', trigger: 'change' },
        ],
        date: [
          { required: true, message: '请选择报告期', trigger: 'change' },
        ],

      },


    };
  },
  mounted() {
    const isshow = this.buttonRights.show_permission1;
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
    ...mapActions(['getDeepSubject', 'getFiltersNew', 'newUpdateData', 'getdsmsLoglistupdate', 'getmodCreditSubject']),
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
    updateData() {
      this.$refs.formparams.validate(async (valid) => {
        if (valid) {
          // debugger

          let type = this.formType.type;
          if (type == '') {
            this.$message.warning('请选择行业或者填写公司主体积');
            return;
          }
          if (type !== '') {
            type = type.split('/')[1];
          } else {
            type = '';
          }
          const params = {
            ...this.formparams,
            type,
            secondType: this.formType.secondType,
          };
          const res = await this.newUpdateData(params);
          console.log('newUpdateData', res);
          if (res.status === 200 && res.data.code !== -1) {
            this.$message.success('数据更新成功');
            this.$refs.formparams.resetFields();
            this.dialogFormVisible = false;
          } else if (res.data.code == -1) {
            this.$message.error(res.data.message);
          } else {
            this.$message.error('数据更新失败');
          }
        } else {
          this.$message.warning('请填写必要参数');
          return false;
        }
      });
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
      const res = await this.getdsmsLoglistupdate(params);
      console.log('loaddingLog', res);
      if (res.status === 200) {
        this.tableData = res.data.list;
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
    changeStart() {
      if (!this.updateparams.endDate) {
        this.pickerOptionsStart = {
          disabledDate: {},
        };
        return;
      }
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        // 可通过箭头函数的方式访问到this
        disabledDate: (time) => {
          let times = '';
          times = time.getTime() > this.updateparams.endDate;
          return times;
        },
      });
    },
    // 开始时间 控制结束时间
    changeEnd() {
      if (!this.updateparams.startDate) {
        this.pickerOptionsEnd = {
          disabledDate: {},
        };
        return;
      }
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: time => time.getTime() < this.updateparams.startDate,
      });
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
    createStateFilter(queryString) {
      return state => (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
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
  #dataShowMa{

    .title{
      font-size: 13px;
      color: #606060;
      width: 60px;
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
