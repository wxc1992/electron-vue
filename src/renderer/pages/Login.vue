<template>
  <div id="login">
    <div class="login-page">
      <div
        class="pa"
        style="left:0; top:0; right:600px; bottom: 0; z-index: 0; background: #202e61;"
      ></div>
      <div class="pa" style="left:0; top:0; z-index: 100; right:600px; bottom: 0;">
        <img src="../assets/images/bg-opa.png" style="width:100%; height: 100%;">
      </div>
      <canvas id="canvasOne" style="position: absolute; z-index: 10; top: 0px; left:0px;"></canvas>
      <div class="web-title">
        <span>WELCOME</span>
        <h1>大类资产配置系统
          <br>
        </h1>
      </div>
      <div class="login-form">
        <div class="warning" v-show="showWarning">
          <p class="mess"></p>
        </div>
        <div class="box-title">
          <img src="../assets/images/logo.png" width="60">
        </div>
        <form v-if="longinTab==1" autocomplete="off" action method="post" id="login-form">
          <div class="login-title" style="margin-top: 10%;">请输入您的信息</div>
          <!-- <div class="logtext user mt20">
             <input type="text" id="companyCode"  v-model="deptCode" class="text" value=""  placeholder="请输入机构代码(非德邦用户必填)"/>
          </div> -->
          <div class="logtext user mt20">
            <input
              type="text"
              id="loginName"
              class="text"
              value
              placeholder="请输入邮箱/用户名"
              v-model="userName"
            >
          </div>
          <div class="logtext pass mt20">
            <input
              type="password"
              id="loginPwd"
              class="text password"
              value
              placeholder="请输入密码"
              v-model="password"
            >
          </div>
          <div id="logininput" class="logtext pass mt20" style="border:none">
            <el-input  onkeyup="value=value.replace(/[^\d\-]/g,'')" placeholder="请输入验证码" v-model="input4">
              <template slot="append">
                <div class="imgYAM">
                  <img :src="imgYZM" @click="imgchange()">
                </div>
              </template>
            </el-input>
            <!-- <input
              type="YZM"
              id="loginYZM"
              class="text password"
              value
              placeholder="请输入验证码"
              v-model="YZM"
            > -->
          </div>
          <div class="fl w mt20">
            <div id="slider1" class="slider" style="margin-left: 10%; display: none;"></div>
            <input type="hidden" id="logincheck" value="ok">
          </div>
          <div class="fl w mt10">
            <!-- <div class="login-checkbox-bar fr" style="float:left;margin-left:12%">
              <span class="forgetPassword" @click="forgetPassword">忘记密码?</span>
            </div> -->
            <div class="login-checkbox-bar fr" style="margin-right: 10%;">
              <span>
                <input type="checkbox" id="remenberUser" name="type" value="1" checked="checked">
                <label for="remenberUser">记住用户名</label>
              </span>
            </div>
            <a
              class="fr f12 lh20 none"
              style="color: #fff;margin-right: 10%;"
              href="javascript:void(0)"
              onclick="forgetPass()"
            >蹇樿瀵嗙爜</a>
          </div>
          <div class="btnDiv mt20">
            <input type="button" class="btn login-btn show-input" value="登录" @click="doLogin">
          </div>
          <span class="title-small mt50">
            Cloud&nbsp;&nbsp;Platform&nbsp;&nbsp;For&nbsp;&nbsp;
            <em>Asset-Backed&nbsp;&nbsp;Securitization</em>
          </span>
        </form>
        <el-form
          v-else-if="longinTab==2"
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="updataPWS"
        >
          <label
            style="display:block;font-size:22px;color:#BECCDF;margin:40px 0 40px 0;text-align:center"
          >邮箱验证</label>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm2.email" ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verificatioCode">
            <el-input  v-model="ruleForm2.verificatioCode">
              <el-button
                style="margin-right:-5px"
                slot="suffix"
                type="primary"
                :disabled="disabled"
                @click="sendcode"
              >{{btntxt}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <span class="goBacklog" @click="goBackLog">返回登录页</span>
          </el-form-item>
        </el-form>
        <div v-else-if="longinTab==3">
          <el-form
          :model="ruleForm3"
          status-icon
          :rules="rules3"
          ref="ruleForm3"
          label-width="100px"
          class="updataPWStow"
        >
          <label
            style="display:block;font-size:22px;color:#BECCDF;margin:40px 0 40px 0;text-align:center"
          >修改密码</label>
          <el-form-item label-width="130px" label="邮箱" prop="email">
            <el-input disabled type="email" v-model="ruleForm3.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label-width="130px" label="用户名" prop="userName">
            <el-input disabled v-model="ruleForm3.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label-width="130px" label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm3.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label-width="130px" label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm3.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label-width="130px">
            <el-button type="primary" @click="makeSure('ruleForm3')">确认修改</el-button>
            <span class="goBacklog" @click="goBackLog">返回登录页</span>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      const regex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$');

      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!regex.test(value)) {
        callback(new Error('密码长度至少8位，包含大小写字母、数字、特殊字符共4类中的3类'));
      } else {
        if (this.ruleForm3.checkPass !== '') {
          this.$refs.ruleForm3.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm3.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      input4: '',
      btntxt: '获取验证码',
      disabled: false,
      time: 0,
      ruleForm2: {
        email: '',
        verificatioCode: '',
      },

      rules2: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
        verificatioCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
        ],
      },
      ruleForm3: {
        userName: '',
        email: '',
        pass: '',
        checkPass: '',
      },
      rules3: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
      longinTab: 1,
      showWarning: false,
      userName: '',
      password: '',
      imgYZM: '',
      timestamp: '',
      keyCode: '',
      deptCode: '',
    };
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'getcheckCode',
      'getsendValidCode',
      'getupdatePwd',
      'getrandomCode',
      'getPwdKey',
    ]),
    async getKey() {
      const res = await this.getPwdKey();
      console.log('key', res.data.data);
      if (res.status === '0000') {
        res.data.data;
      }
      return res.data.data;
    },
    sendcode() {
      this.getsendValidCodeone();
    },
    timer() {
      if (this.ruleForm2.email) {
        if (this.time > 0) {
          this.time--;
          this.btntxt = `${this.time}s,后重新获取验证码`;
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.btntxt = '获取验证码';
          this.disabled = false;
        }
      } else {
        this.time = 0;
        this.btntxt = '获取验证码';
        this.disabled = false;
        this.$message.success('请输入邮箱');
      }
    },
    goBackLog() {
      this.longinTab = 1;
    },
    imgchange() {
      this.getrandomCodeone();
    },
    // 获取图片验证码
    async getrandomCodeone() {
      const res = await this.getrandomCode({
        sessionId: sessionStorage.getItem('sessionId'),
        timeid: this.timestamp,
      });
      const blob = res.data; // 返回的是一个blob对象
      this.imgYZM = window.URL.createObjectURL(blob); // 静态方法会创建一个 DOMString
    },
    // 验证验证码
    async getcheckCodeone() {
      const res = await this.getcheckCode({
        emailTo: this.ruleForm2.email,
        validCode: this.ruleForm2.verificatioCode,
      });
      if (res.data.status === '0000') {
        this.ruleForm3.userName = res.data.data.loginName;
        this.ruleForm3.email = res.data.data.email;
        this.$message.success('获取成功');
        this.$refs.ruleForm2.resetFields();
        this.longinTab = 3;
      }
      if (res.data.status === '0066') {
        console.log(res.data, 'klklkl');
        this.$message.success(res.data.data);
      }
    },
    // 发送验证码
    async getsendValidCodeone() {
      const res = await this.getsendValidCode({
        emailTo: this.ruleForm2.email,
      });
      if (res.data.status === '0000') {
        this.$message.success('验证码已发送道邮箱,请注意查收！');
        this.time = 60;
        this.disabled = true;
        this.timer();
      }
      if (res.data.status === '0066') {
        this.$message.success(res.data.data);
        return false;
      }
    },
    // 修改密码
    async getupdatePwdone() {
      const res = await this.getupdatePwd({
        email: this.ruleForm3.email,
        password: this.ruleForm3.pass,
      });
      if (res.data.status === '0000') {
        this.$message.success('更新成功');
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getcheckCodeone();
        } else {
          return false;
        }
      });
    },
    makeSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getupdatePwdone();
          this.longinTab = 1;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    forgetPassword() {
      this.longinTab = 2;
    },
    getMeiju() {
      const dataObjDatatoJson = this.common.get('meiju', '1000*60*60*24'); // 设置缓存的有效期
      console.log('data', dataObjDatatoJson);
      if (dataObjDatatoJson != '' && dataObjDatatoJson != null) {
        // console.log('data')
      } else {
        this.setMeiju();
      }
      // console.log('qqq',data.data)
    },
    async setMeiju() {
      const res = await this.getSelect();
      console.log(res.data.data);
      const result = res.data.data;
      this.common.set('meiju', result);
    },
    async doLogin() {
      if (this.userName == 'sysadmin') {
        this.deptCode = 'sys';
      } else {
        this.deptCode = '';
      }
      const param = {
        htmlName: this.userName,
        deptCode: this.deptCode,
        password: this.password,
        sessionId: sessionStorage.getItem('sessionId'),
        randomCode: this.input4,
      };
      // if(this.userName=="" || this.password== "" || this.deptCode=="" || this.input4 == ""){
      //   this.$message.warning('登录要素不能为空')
      //   return false
      // }
      this.keyCode = await this.getKey();
      const pwdKey = this.common.encrypt(JSON.stringify(param), this.keyCode);
      const result = await this.submitLogin({ a: pwdKey });
      const {
        status,
        data: {
          token, userName, id, loginName, deptCode,
        },
        msg,
      } = result.data;
      if (status === '0000') {
        this.$message({
          message: '恭喜登录成功',
          type: 'success',
          duration: 1000,
        });
        let dpcode = deptCode;
        if (dpcode == null) {
          dpcode = '';
        }
        localStorage.setItem('token', token);
        localStorage.setItem('departmentCode', dpcode);
        localStorage.setItem('username', userName);
        localStorage.setItem('userId', id);
        localStorage.setItem('loginname', loginName);
        localStorage.setItem('logoutValid', true);
        this.setMeiju();
        const res = await this.getMenuListByuserid(id);
        console.log(res, 'bnbnbnbbn');
        // console.log("鐢ㄦ埛鐨勬墍鏈夎彍鍗曟潈闄�", res.data.data);
        if (res.data.status === '0000') {
          localStorage.setItem('menu', JSON.stringify(res.data.data));
        }
        const sszArray = (res.data.data);
        const test = '/biaoHome';
        const vm = this;
        const r = recursion(sszArray, test);
        console.log(r, 'vpvopvopvo');
        if (r == test) {
          this.$router.push('/biaoHome');
        } else {
          console.log(r, test, 'kankan');
          this.$router.push('/home');
        }
        function recursion(sszArray, test) {
          let result = null;
          if (sszArray == null) {
            vm.$router.push('/home');
            return;
          }
          for (const i in sszArray) {
            if (result !== null) {
              break;
            }
            const item = sszArray[i];
            if ((item.url).split(';')[0] == test) {
              result = (item.url).split(';')[0];
              break;
            } else if (item.childs && item.childs.length > 0) {
              result = recursion(item.childs, test);
            }
          }
          return result;
        }
        // this.$router.push("/home");
        // location.reload()
      } else {
        this.getrandomCodeone();
        this.$message.error(msg);
      }
    },
    ...mapActions(['submitLogin', 'getMenuListByuserid', 'getSelect']),
  },
  created() {
    this.timestamp = (new Date()).getTime();
    const storage = window.sessionStorage;
    storage.setItem('sessionId', `Tebon_${this.timestamp}`);
    this.getrandomCodeone();
    this.setMeiju();
    this.getMeiju();
  },
  computed: {},
};
</script>
<style scoped lang="less">
.imgYAM{
  width: 100px;
  height: 38px;
  line-height: 38px;
  img{
    width: 100%;
    height: 38px;
    background-size: cover;

  }
}
.updataPWS {
  margin-top: 177px;
  .el-input {
    width: 80%;
  }
  .goBacklog {
    font-size: 12px;
    color: #beccdf;
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      color: crimson;
    }
  }
}
.updataPWStow {
  margin-top: 177px;
  .el-input {
    width: 80%;
  }
  .goBacklog {
    font-size: 12px;
    color: #beccdf;
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      color: crimson;
    }
  }
}
.forgetPassword {
  font-size: 16px;
  color: rgb(190, 204, 223);
  cursor: pointer;
  &:hover {
    color: red;
  }
}
#login {
  width: 100%;
  height: 100%;
}
.warning {
  position: absolute;
  left: 150px;
  top: 20px;
  background: #f89406
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=")
    no-repeat 15px center;
  p {
    width: 235px;
    height: 20px;
    color: #fff;
    padding: 15px 15px 15px 50px;
  }
}
.login-page {
  width: 100%;
  height: 100%;
  position: relative;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #fff inset;
}
body {
  padding: 0px;
  margin: 0;
  font-family: "瀵邦喛钂嬮梿鍛寸拨";
  background: #fff;
  position: relative;
}
.web-title {
  width: 600px;
  padding: 0;
  position: absolute;
  z-index: 100;
  left: 5%;
  top: 50px;
}
.web-title > span {
  font-size: 55px;
  color: #455ca0;
  font-family: Arial;
  float: left;
  width: 100%;
}
.web-title > h1 {
  font-size: 60px;
  color: #fff;
  line-height: 80px;
  float: left;
  width: 100%;
}
#myCanvas {
  overflow: hidden;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #000;
  opacity: 0.17;
  z-index: 10;
}
.header-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
}
.footer {
  text-align: center;
  color: #878787;
  font-size: 13px;
  float: left;
  width: 100%;
}
.login-bg {
  position: relative;
  width: 100%;
  float: left;
}
.login-bg .bg-img {
  width: 100%;
}
.abs-logo {
  position: relative;
  width: 100%;
  height: 102px;
  background: url(../assets/images/abs-logo.png) no-repeat center;
  margin-top: -50px;
  z-index: 1;
}
.login-bottom {
  position: relative;
  width: 100%;
  z-index: 0;
  background: #fff;
  padding-bottom: 20px;
}
.logo {
  margin: 40px 0 0 74px;
}
.website-title {
  width: 70%;
  max-width: 747px;
  min-width: 220px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 180px;
  /*background: url(../images/website-title.png) no-repeat center;
	background-size:100% auto;*/
}
.website-title img {
  width: 100%;
}
.login-box {
  position: absolute;
  background: #000;
  z-index: 1;
  opacity: 0.24;
  border-radius: 10px;
}
.login-form {
  position: absolute;
  z-index: 2;
  background: transparent;
  right: 0px;
  top: 0px;
  width: 600px;
}
.login-form div.box-title {
  padding: 10% 0 0 10%;
  font-size: 26px;
  color: #4d4a48;
  width: 100%;
  float: left;
  background: #55a8fd;
}
.login-form div.login-title {
  float: left;
  width: 100%;
  padding: 0;
  color: #aebac7;
  text-align: center;
  font-size: 18px;
  background: transparent;
}
.login-form div.logtext {
  float: left;
  background: #fff;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 10px;
  border: 1px solid #dfe2e5;
}
.login-form div.logtext.user {
  background: #fff url("../assets/images/user.png") no-repeat 5.5% center;
  background-size: auto 42%;
}
.login-form div.logtext.pass {
  background: #fff url("../assets/images/locked.png") no-repeat 5.5% center;
  background-size: auto 42%;
}
.login-form div.updatePwd {
  display: none;
}
.login-form div.btnDiv {
  float: left;
  width: 100%;
  text-align: center;
}
.login-form div.logtext .text {
  border: 0;
  vertical-align: middle;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
  height: 54px;
  float: right;
  width: 83%;
  margin: 0 10px 0 0;
  padding-left: 20px;
  color: #aebac7;
  background: none;
  outline: none;
  font-size: 16px;
  border-left: 1px solid #dfe2e5;
  border-radius: 0px 10px 10px 0;
}
.text::-webkit-input-placeholder {
  color: #aebac7;
}
.login-form div.logtext .text.active {
  color: #a0a0a0;
}

.login-form div.btnDiv .btn {
  width: 229px;
  height: 70px;
  vertical-align: top;
  text-align: center;
  color: #fff;
  font-size: 18px;
  line-height: 52px;
  cursor: pointer;
  /*background:#4d8fcd;*/
  background: url("../assets/images/btn-bule.png") no-repeat center;
  background-size: auto 100%;
  outline: none;
  padding: 0 0 8px;
  margin-top: 15px;
}
.btn:hover {
  /*background:#3f98fc;
	border-color:#3f98fc;*/
  color: #fff;
}
.btn-content {
  margin-top: 15px !important;
}
.btn-forbiddern,
.btn-unforbiddern,
.btn-del,
.btn-resetPwd {
  margin: 0px 10px !important;
  padding: 5px 10px;
}
.model {
  width: 80%;
  height: auto;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.model > li {
  width: 25%;
  font-size: 25px;
  font-family: "寰敓鏂ゆ嫹閿熻剼鐚存嫹";
  color: #333;
  text-align: center;
  float: left;
}
.model > li.line {
  background: url(../assets/images/line-dev.png) no-repeat left center;
}
.model > li > span {
  display: block;
  width: 90px;
  height: 76px;
  margin: 0 auto;
  background: url(../assets/images/index-icon.png) no-repeat;
}
.model > li > span.user {
  background-position: 14px 0;
}
.model > li > span.product {
  background-position: -60px 0;
}
.model > li > span.car {
  background-position: -149px 0;
}
.model > li > span.test {
  background-position: -244px 0;
}

@media screen and (max-height: 900px) {
  .login-bg {
    height: 550px;
  }
  .website-title {
    margin-top: 100px;
  }
}

@media screen and (max-height: 768px) {
  .login-bg {
    height: 500px;
  }
  .website-title {
    margin-top: 50px;
  }
}

@media screen and (max-height: 600px) {
  .login-bg {
    height: 450px;
  }
  .website-title {
    margin-top: 20px;
  }
}

@media screen and (max-width: 800px) {
  .model > li {
    width: 50%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .model > li:nth-child(odd) {
    background: none;
  }
}

@media screen and (max-width: 500px) {
  .login div {
    width: 100%;
  }
  .model > li {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .model > li.line {
    background: none;
  }
}

/*濠婃垵濮╂宀冪槈閻拷*/
.ui-slider-wrap {
  background: #e8e8e8;
  position: relative;
}

.ui-slider-wrap .ui-slider-bg {
  width: 0;
}

.ui-slider-wrap .ui-slider-btn {
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
  text-align: center;
  border: 1px solid #ccc;
  background: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.ui-slider-wrap .ui-slider-btn {
  background: #fff url(../assets/images/slider.png) no-repeat center;
}

.ui-slider-wrap .ui-slider-btn.success {
  background-image: url(../assets/images/check_alt.png);
  background-size: 16px 16px;
}

.ui-slider-wrap .ui-slider-text {
  width: 100%;
  height: 100%;
  font-family: "瀵邦喛钂嬮梿鍛寸拨";
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  color: #666;
}

.ui-slider-wrap .ui-slider-no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

/*鐎涙ぞ缍嬮崶鐐垼閻ㄥ垻ss*/

/* .iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */

.icon-check:before {
  content: "\e645";
}

.icon-close:before {
  content: "\e646";
}

.icon-right:before {
  content: "\e6a3";
}

.icon-refresh:before {
  content: "\e6a4";
}

.login-checkbox-bar {
}
.login-checkbox-bar > span {
  float: left;
}
.login-checkbox-bar > span > label {
  float: left;
  font-size: 16px;
  font-weight: normal;
  color: #bec8d2;
  padding-left: 20px;
  margin-left: -20px;
  background: url("../assets/images/login-checkbox.png") no-repeat left center;
  background-size: 16px 16px;
}
.login-checkbox-bar > span > input {
  opacity: 0;
  float: left;
  width: 16px;
  height: 16px;
  margin: 3px 3px 3px 2px;
  padding: 0;
}
.login-checkbox-bar > span > input:checked + label {
  background: url("../assets/images/login-checkbox-checked.png") no-repeat left
    center;
  background-size: 16px 16px;
}

.title-small {
  width: 100%;
  float: left;
  font-size: 14px;
  color: #aebac7;
  text-align: center;
}
.title-small em {
  color: #56a9fe;
}
.pa {
  position: absolute;
}
.mt25 {
  margin-top: 25px;
}
.mt20 {
  margin-top: 20px;
}
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
.mt10 {
  margin-top: 10px;
}
.mt50 {
  margin-top: 50px;
}
.fl {
  float: left;
}
.fr {
  float: right;
  display: inline;
}
.w {
  width: 100%;
}
</style>

