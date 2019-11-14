<template>
  <el-card id="whiteName" :style="{'height': cardHeight+ 'px'}">
    <div>
        <div>
          <el-button  size="small" style="margin-right:10px;" @click="newTarget = true" class="fl">新增名单</el-button>
          <!-- <el-button type="danger" size="small" style="margin-right:10px;" class="fr" @click="deleteFile(checkedName)">删除指标收藏</el-button> -->
          <div v-show="newTarget" class="fl">
            <el-radio v-model="showradio" label=""></el-radio>
              <el-input
                style="width:200px"
                placeholder="请输入指标收藏名称"
                v-model="tagetName"
                clearable>
              </el-input>
              <el-button  size="small" style="margin-right:10px;" @click="saveTarget">保存新增</el-button>
              <el-button  size="small" @click="newTarget = false">取消新增</el-button>
          </div>
        </div>
        <div style="margin-top: 10px;margin-bottom: 10px;" class="checkedlist">
             <span class="spansss">准入名单：</span>
             <el-select v-model="checkedName" placeholder="请选择准入白名单" @change="selectChange">
              <el-option
                v-for="item in targetList"
                :key="item.id"
                :label="item.key"
                :value="item.id">
              </el-option>
            </el-select>
        </div>
    </div>
    <el-table
       :row-class-name="tableRowClassName"
       :data="tabledata"
         v-loading="loading"
         :height="cardHeight-130"
        style="width: 100%">
      <el-table-column
        prop="type"
        label="行业">
      </el-table-column>
      <el-table-column
        prop="compName"
        label="主体">
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="添加人员">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="添加时间">
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
const permissionMap = {
  mainButton: ['ss_all', 'ssg3.0'],
};
export default {
  data() {
    return {
      newTarget: false,
      loading: false,
      checkedName: '',
      targetList: [],
      tabledata: [],
      showradio: '',
      cardHeight: 0,
      tagetName: '',
      pageSize: 20,
      currentPage: 1,
      total: 0,
    };
  },
  methods: {
    ...mapActions(['getRosterList', 'getRosterTable', 'addRoster']),
    saveTarget() {
      const params = {
        name: this.tagetName,
      };
      this.addRoster(params).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.status === '0000') {
          this.$message.success('新增白名单成功');
          this.newTarget = false;
          this.getRosterData();
        } else if (res.data.status === '0066') {
          this.$message.error('此白名单已经存在');
        } else {
          this.$message.error('新增失败');
        }
      }).catch((error) => {
      });
    },
    selectChange(val) {
      this.currentPage = 1;
      this.checkedName = +val;
      this.getRosterTableData();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.currentPage = 1;
      this.getRosterTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(this.current, val);
      this.getRosterTableData();
    },
    getRosterData() {
      this.getRosterList().then((res) => {
        console.log('getRosterList', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.targetList = res.data.data;
          this.checkedName = +res.data.data[0].id;
          this.getRosterTableData();
        }
      });
    },
    getRosterTableData() {
      this.loading = true;
      const params = {
        id: +this.checkedName,
        current: this.currentPage,
        pageSize: this.pageSize,
      };
      this.getRosterTable(params).then((res) => {
        console.log('getRosterList', res);
        if (res.status === 200 && res.data.status === '0000') {
          this.tabledata = res.data.data.records;
          this.total = res.data.data.total;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        } else {
          this.$message.error('数据获取失败');
          setTimeout(() => {
            this.loading = false;
          }, 1000);
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
  mounted() {
    const that = this;
    setTimeout(() => {
      that.cardHeight = window.innerHeight - 125;
    }, 200);
    this.$winResize.add(() => {
      clearTimeout(this.delay);
      this.delay = setTimeout(() => {
        that.cardHeight = window.innerHeight - 125;
      }, 200);
    });
  },
  created() {
    const isshow = this.buttonRights.creating_white;
    console.log(isshow);
    if (!isshow) {
      this.$message.warning('没有该菜单');
      this.$router.push('/');
    }
    this.getRosterData();
  },
};
</script>

<style scoped lang="less">
  #whiteName{
    width: 80%;
    margin: 0 auto;
    .spansss{
      margin-left: 15px;
      display: inline-block;
      font-size: 13px;
      color: #606266;
    }
  }
</style>
