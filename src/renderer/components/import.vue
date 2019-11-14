<template>
    <div class="import">
        <div class="head">
            <span class="title">导入</span>
            <a href="javascript:;" class="close" @click="closeWindow"></a>
        </div>
        <div class="body">
            <p>将按模版格式制作的台账文件导入到账户</p>
            <div class="template">
                <button>台账模板</button>
                <a href="javascript:;" class="setting" @click="showSetting"></a>
                <div class="hoverup" v-show="showRules">
                    <p>重新导入文件的替换规则：</p>
                    <div>
                        <input type="radio" id="complete-replace" name="replace">
                        <label for="complete-replace">完全替换</label>
                    </div>
                    <div>
                        <input type="radio" id="increment-replace" name="replace">
                        <label for="increment-replace">增量更新</label>
                        <span>保存已导入的数据</span>
                    </div>
                </div>
            </div>
            <div class="choose">
                <label for="account">账户：</label>
                <select name="" id="account">
                    <option value="" selected disabled>请选择账户</option>
                </select>
                <label for="param-setting">本地文件：</label>
                <input type="file" id="param-setting"  multiple @change="selectFiles($event)">
                <table>
                    <tr>
                        <th>序号</th>
                        <th>文件名</th>
                        <th>大小</th>
                        <th>导入进度</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(file,index) in files" :key="index">
                        <td>{{index}}</td>
                        <td>{{file.name}}</td>
                        <td>{{file.size}}</td>
                        <td>
                            <progress :value="file.progress" max="100"></progress>
                        </td>
                        <td>{{mapStatus(index)}}</td>
                        <td><button class="import-button" @click="singleImport(index)">导入</button>
                            <button class="delete" @click="deleteFile(index)">删除</button>
                        </td>
                    </tr>
                </table>
            </div>
            <span class="file-account">文件个数：{{count}}/{{files.length}}</span>
            <label for="progress">导入进度：</label>
            <progress :value="count" :max="files.length"></progress>
            <button @click="importAll">全部导入</button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
const mapObj = {
  '-1': '上传失败',
  0: '未上传',
  1: '上传中',
  2: '上传成功',
};
export default {
  data() {
    return {
      showRules: false,
      files: '',
      curIndex: 0,
      count: 0,
    };
  },
  props: [
    'closeWindow',
  ],
  methods: {
    updateStatus(fileId, status) {
      const file = this.files[fileId];
      this.files.splice(fileId, 1, Object.assign(file, { status }));
    },
    updateProgress(fileId, progress) {
      const file = this.files[fileId];
      this.files.splice(fileId, 1, Object.assign(file, { progress }));
    },
    deleteFile(fileId) {
      this.files.splice(fileId, 1);
    },
    selectFiles(event) {
      console.log('select files', event.target.files);
      this.count = 0;
      const fileList = new Array(...event.target.files);
      fileList.map((file) => {
        file.status = '0'; file.progress = '0';
      });
      this.files = fileList;
    },
    showSetting() {
      this.showRules = !this.showRules;
    },
    singleImport(fileId) {
      this.curIndex = fileId;
      const file = this.files[fileId];
      const config = {
        onUploadProgress: (event) => {
          console.log('get progress:', event);
          const loaded = (event.loaded / event.total) * 100;
          this.updateProgress(fileId, loaded);
        },
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      this.updateStatus(fileId, 1);
      return this.importFile({ file, config })
        .then((result) => {
          console.log('upload file ok,', file.name, this.curIndex, result);
          this.count++;
          this.updateStatus(fileId, '2');
        })
        .catch((error) => {
          console.log('upload file failed:', error);
          this.updateStatus(fileId, '-1');
          this.updateProgress(fileId, '0');
        });
    },
    importAll() {
      this.files.forEach((file, index) => {
        this.singleImport(index);
      });
    },
    ...mapActions(['importFile']),
  },
  computed: {
    mapStatus() {
      return function (fileId) {
        const status = this.files[fileId].status;
        return mapObj[status];
      };
    },
  },
};
</script>
<style scoped lang="less">
.import {
  width: 860px;
  background: #fff;
  padding-bottom: 47px;
}
.head {
  height: 50px;
  position: relative;
  line-height: 50px;
  background: #ececec;
  padding: 0 29px;
  font-size: 18px;
  color: #3d3d3d;
  font-family: PingFangSC-Semibold;
  letter-spacing: 0.34px;
  text-align: left;
}
.close{
    background:url(../assets/images/close-small.png) no-repeat;
    float:right;
    width:12px;
    margin-top: 19px;
    height:12px;
}
.body {
  margin: 0 52px;
  margin-top: 37px;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: #969696;
  letter-spacing: 0.3px;
  #account {
    width: 185px;
    height: 26px;
    margin-right: 24px;
  }
  #param-setting {
    // width:88px;
    // height:26px;
    // background: #448EFE;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    font-family: PingFangSC-Semibold;
  }
  & > button {
    width: 105px;
    height: 26px;
    border-radius: 4px;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0.27px;
    text-indent: 18px;
    background: url(../assets/images/icon_import.png) #448efe no-repeat 10px
      center;
  }
  #progress {
    height: 26px;
    width: 185px;
    margin-right: 14px;
  }
}
.template {
  position: relative;
  float: right;
  button {
    text-align: center;
    background: #408bff;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    width: 95px;
    height: 26px;
  }
  .setting {
    background: url(../assets/images/setting.png) no-repeat;
    width: 26px;
    height: 26px;
    float: right;
    margin-left: 20px;
  }
  .file-account {
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #969696;
    letter-spacing: 0.3px;
    margin-right: 3px;
  }
  .hoverup {
    width: 194px;
    line-height: 20px;
    height: 70px;
    position: absolute;
    font-size: 12px;
    padding: 10px;
    right: 53px;
    p {
      font-family: PingFangSC-Regular;
      color: #408bff;
      letter-spacing: 0.23px;
    }
    background: #ffffff;
    border: 1px solid #ebebeb;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.09);
    label {
      font-family: PingFangSC-Regular;
      color: #969696;
      letter-spacing: 0;
      text-shadow: 0 4px 11px rgba(127, 167, 240, 0.42);
    }
    input {
      vertical-align: middle;
    }
    span {
      font-family: PingFangSC-Regular;
      color: #b3b1b1;
      letter-spacing: 0;
      text-shadow: 0 4px 11px rgba(127, 167, 240, 0.42);
    }
  }
}
.choose {
  clear: right;
  margin-bottom: 20px;
  table {
    margin-top: 19px;
    width: 679px;
    border-collapse: collapse;
    font-size: 14px;
    th {
      height: 26px;
      border: 1px solid #d8d8d8;
    }
    th:first-child {
      width: 62px;
    }
    th:nth-child(2) {
      width: 120px;
    }
    th:nth-child(3) {
      width: 73px;
    }
     th:nth-child(5) {
      width: 73px;
    }
    td {
      text-align: center;
      height: 26px;
    }
  }
  button {
    text-align: center;
    background: #408bff;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    color: #ffffff;
    letter-spacing: 0;
    border: none;
    height: 24px;
    width: 32px;
  }
}
</style>

