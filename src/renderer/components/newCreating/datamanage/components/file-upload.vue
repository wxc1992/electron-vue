<template>
<el-dialog title="文件上传" :visible="visibility" width="500px" center @close="close" v-loading="loading">
    <el-upload class="upload" ref="upload" drag :action="actionUrl" :data="extraParams" :on-success="onUploadSuccess" :on-error="onUploadError" :auto-upload="false" accept=".doc,.xls,.ppt,.docx,.xlsx,.pptx,.pdf,.html,.txt,.java" :on-exceed="fileExceed" :headers="header">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过100M</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">上 传</el-button>
        </span>
</el-dialog>
</template>
<script>
export default {
  data() {
    return {
      header: {},
      loading: false,
    };
  },
  props: ['visibility', 'actionUrl', 'extraParams', 'uploadSuccess', 'uploadError', 'fileExceed'],
  created() {
    this.header = { Authorization: localStorage.getItem('token') };
  },
  methods: {
    submit() {
      this.loading = true;
      this.$refs.upload.submit();
    },
    onUploadError() {
      this.loading = false;
      this.uploadError(...arguments);
    },
    onUploadSuccess() {
      this.loading = false;
      this.uploadSuccess(...arguments);
    },
    close() {
      this.$emit('closeDialog');
      this.$emit('update:visibility', false);
      this.loading = false;
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

