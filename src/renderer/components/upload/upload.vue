<template>
<el-dialog title="文件上传" :visible="visibility" width="500px" center @close="close">
    <div style="margin-bottom:20px;">
      <el-select v-model="selectval" placeholder="请选择账户" @change="sendCount">
        <el-option
          v-for="item in datasource"
          :key="item.accountId"
          :label="item.accountName"
          :value="item.accountId">
        </el-option>
      </el-select>
    </div>
    <!-- <el-upload class="upload" ref="upload" drag :action="actionUrl" :data="extraParams" :on-success="uploadSuccess" :on-error="uploadError" :auto-upload="false" accept=".xls,xlsx" :beforeUpload="beforeUpload" :on-exceed="fileExceed" :headers="header">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击导入</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过500kb</div>
    </el-upload> -->
      <el-upload
        class="upload"
        ref="upload"
        :action="actionUrl"
        accept=".xls,xlsx"
        :data="extraParams"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :beforeUpload="beforeUpload"
        :on-progress="uploadExcelProcess"
        :on-exceed="fileExceed"
        :headers="header"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取估值表</el-button>
      </el-upload>
      <p style="margin-top:10px;" v-if="videoFlag == true">上传中请稍等...</p>
      <!-- <el-progress v-if="videoFlag == true" type="line" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">上传</el-button>
         <el-button @click="close" type="info">取 消</el-button>
        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">上传</el-button> -->
      </span>
</el-dialog>
</template>
<script>
export default {
  data() {
    return {
      header: {},
      selectval: '',
    };
  },
  props: ['visibility', 'videoFlag', 'actionUrl', 'videoUploadPercent', 'extraParams', 'uploadSuccess', 'uploadError', 'fileExceed', 'datasource', 'beforeUpload', 'uploadExcelProcess'],
  created() {
    this.header = { Authorization: localStorage.getItem('token') };
  },
  methods: {
    submit() {
      this.$refs.upload.submit();
    },
    sendCount() {
      console.log(this.selectval);
      this.$emit('countId', this.selectval);
    },
    close() {
      this.$emit('closeDialog');
    },
    clearFiles() {
      this.$refs.upload.clearFiles();
    },
  },
  computed: {
  },
};
</script>
<style scoped>

</style>

