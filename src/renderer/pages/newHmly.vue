<template>
  <el-container id="newhome">
    <el-dialog
      title="修改密码"
      :visible.sync="pwsdialogVisible"
      width="50%"
      >
      <div>
          <div style="width: 500px;margin-top:20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
              <el-form-item label="用户名">
                <el-input v-model="ruleForm.loginName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label-width="80px" label="旧密码" prop="oldUserPwd">
                <el-input type="password" v-model="ruleForm.oldUserPwd" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label-width="80px" label="新密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pwsdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="意见反馈" :visible.sync="feedbackdialogVisible" width="30%">
        <div>
          <label for>提出人</label>
          <el-input v-model="renName" placeholder="请输入提出人"></el-input>
        </div>
        <div>
          <label for>联系方式</label>
          <el-input v-model="ihpon" placeholder="请输入联系方式"></el-input>
        </div>
        <div>
          <label for>意见反馈</label>
          <el-input type="textarea" :rows="2" placeholder="请输入意见" v-model="yijian"></el-input>
        </div>
        <div>
          <label for>上传附件</label>
          <el-upload
            ref="upload"
            :headers="header"
            class="upload-demo"
            action="/sso/feedBack/send"
            :file-list="fileList"
            :http-request="uploadFiles"
            :auto-upload="false"
            :on-change='filechange'
          >
            <el-button icon="el-icon-upload2" size="mini" type="primary" circle></el-button>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="feedbackdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="uplodesure">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="提示"
      center
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :show-close='false'
      :visible.sync="dialogVisible"
      width="30%"
      >
      <div style="text-align: center">
        <span style="font-size:20px;color:red" >登录信息已过期，请重新登录！</span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="otherout">确 定</el-button>
      </span>
    </el-dialog>
    <el-header style="height:55px">
      <div class="header clearfix">
          <div class="logo">
            <img src="../assets/images/logo.png" alt="logo">
            <span>大类资产配置系统</span>
          </div>
          <ul class="items">
              <li :class="$route.path == '/home' || $route.path == '/'?'active':''">
                <div>
                   <router-link to='/home'>首页</router-link>
                </div>
              </li>
              <li
                v-for="(item, index) in headerList"
                :key="item.appCode"
                :class="item.appCode===appCode?'active':''"
                v-if="index<=6">
                <!-- 这样的话菜单就不会因为g权限的问题产生显示错误的问题 -->
                <div v-if="item.appCode == 'sd'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'ssg'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode)">{{item.title}}</a>
                </div>
                 <div v-if="item.appCode == 'ssa_new'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode,item)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'ssg3.0'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode =='ssa'">
                  <a @click="$router.push('/newHome')">{{item.title}}</a>
                </div>
                <div v-if="item.appCode =='ssz'">
                  <a
                    @click="onClick(item.childs[0].childs[0].url.split(';')[0],item.appCode)"
                  >{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'ssonew'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode,item)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'ssdc'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'jjxd'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode,item)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'ai_fu'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode,item)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'zcpz'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode,item)">{{item.title}}</a>
                </div>

                <div v-if="item.appCode == 'ssfund'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode,item)">{{item.title}}</a>
                </div>
                 <div v-if="item.appCode == 'ss_more'">
                  <a @click="moremenu">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'scgz'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'scgzNew'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode,item)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'ssdc2.0'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode,item)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'ssg3.0'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'ai_fu'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'da_biao'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode)">{{item.title}}</a>
                </div>
                <div v-if="item.appCode == 'fpgl'">
                  <a @click="onClick(item.url.split(';')[0],item.appCode,item)">{{item.title}}</a>
                </div>
              </li>
              <!-- <li v-if="headerList.length>5">
                <div>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      更多
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(item, index) in headerList"
                        v-if="index>5"
                        :key="item.appCode"
                      >
                        <div v-if="item.appCode == 'sd'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode == 'ssg'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode == 'ssg3.0'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode =='ssa'">
                          <a
                            style="width:100%;display:block;"
                            @click="$router.push('/newHome')"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode =='ssz'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.childs[0].childs[0].url.split(';')[0],item.appCode)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode == 'ssonew'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode,item)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode == 'ssdc'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode == 'jjxd'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode,item)"
                          >{{item.title}}</a>
                        </div>
                         <div v-if="item.appCode == 'ai_fu'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode,item)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode == 'da_biao'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode,item)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode == 'zcpz'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode,item)"
                          >{{item.title}}</a>
                        </div>

                        <div v-if="item.appCode == 'ssfund'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode,item)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode == 'scgz'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode)"
                          >{{item.title}}</a>
                        </div>
                        <div v-if="item.appCode == 'ssdc2.0'">
                          <a
                            style="width:100%;display:block;"
                            @click="onClick(item.url.split(';')[0],item.appCode,item)"
                          >{{item.title}}</a>
                        </div>
                         <div v-if="item.appCode == 'ssg3.0'">
                          <a @click="onClick(item.url.split(';')[0],item.appCode)">{{item.title}}</a>
                        </div>

                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </li> -->
              <!-- <li :class="moremenuflag==true?'active':''" @click="moremenu">
                 <a >更多</a>
              </li> -->
              <!-- <li>
                <div>
                   <router-link to='/home'>投资分析系统</router-link>
                </div>
              </li> -->
          </ul>
          <!-- <div class="search fr">
              <input class="text" type="text">
              <input class="button" type="button">
          </div> -->
          <!-- <div class="status"> -->
              <!-- <div class="unreadMsg icon"></div>
              <div class="qrCode icon"></div> -->
              <!-- <img src="../../assets/images/headpic.jpg" class="headPic"> -->
          <!-- </div> -->

        <div class="user-head">
          <!-- <a href="javascript:;" class="setting"></a> -->
          <div>
            <i  class="big">
            <img style="vertical-align: middle;" src="../assets/images/tou.png" alt="">
            </i>
            <span class="user-name">{{username}}</span> &nbsp;|&nbsp;
            <span class="status" style="cursor:pointer" @click="loginout">退出</span>
          </div>
        </div>
        <div>
          <el-dropdown trigger="hover" class='openla' >
            <span class="el-dropdown-link userinfo-inner"><i class="fa fa-bars"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item ><span @click="feedback">意见反馈</span></el-dropdown-item>
              <el-dropdown-item><span  @click="xiugai">修改密码</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

           <!-- <i @click="feedback" class="el-icon-s-operation openla"></i> -->
           <!-- <img style="position: relative;" src="../assets/images/headpic.jpg" class="head-pic"> -->
        </div>
      </div>
    </el-header>
     <div v-if="showImg" style="width: 100%;text-align: center;height: 100%">
      <img src="../../../static/files/homebg.png" alt width="100%" height="100%">
    </div>
    <div  :style="objstyle">
          <router-view></router-view>
    </div>
  </el-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
const permissionMap = {
  mainButton: ['ss_all'],
};
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value == this.ruleForm.oldUserPwd) {
        callback(new Error('新密码和旧密码一致!'));
      } else {
        callback();
      }
    };
    return {
      sso_pwd_watch: false,
      keyCode: '',
      ruleForm: {
        loginName: localStorage.getItem('loginname'),
        oldUserPwd: '',
        password: '',
      },
      rules: {
        oldUserPwd: [
          {
            trigger: 'bulr',
            required: true,
            message: '请输入您的旧密码的密码',
          },
        ],
        password: [
          { validator: validatePass, trigger: 'blur', required: true },
          {
            pattern: '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$',
            trigger: 'change',
            message: '密码长度至少8位，包含大小写字母、数字、特殊字符共4类中的3类',
          },
        ],
      },


      pwsdialogVisible: false,
      headerList: [],
      dialogVisible: false,
      header: '',
      tokenll: '',
      username: '',
      yijian: '',
      ihpon: '',
      renName: '',
      isacitve: false,
      appCode: '',
      showImg: '',
      newMenu: [],
      fileList: [],
      fileobj: [],
      feedbackdialogVisible: false,
      objstyle: {
        height: '100%',
        width: '100%',
        margin: '0 auto',
        background: '#EFF4F9',

      },
      objstylebase: {
        height: '100%',
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden',
        background: '#EFF4F9',
      },
      objstyle2: {
        height: '100%',
        width: '100%',
        margin: '0 auto',
        'overflow-y': 'scroll',
        'overflow-x': 'hidden',
        background: '#EFF4F9',
      },
      timer: null,
      moremenuflag: false,

    };
  },
  computed: {
    ...mapGetters(['getSysrightsNew']),
    buttonRights() {
      const entry = this.getUserRights;
      const mainButtons = rightsMap.mainButton;
      const rets = this.parseRightsData(entry, 0);
      const ret = {};
      if (rets instanceof Array) {
        rets.forEach((val) => {
          ret[val.resCode] = true;
        });
      }
      console.log('get ret of button rights:', ret);
      return ret;
    },

    Allmenu() {
      return JSON.parse(localStorage.getItem('menu'));
    },
  },
  methods: {
    ...mapActions([
      'getTopLeftMenu',
      'getUserInfoByToken',
      'getMenuListByuserid',
      'getSelect',
      'logout',
      'queryOaUserInfo',
      'feedBacksend',
      'allcheck',
      'updatePWD', 'getPwdKey',
    ]),
    async getKey() {
      const res = await this.getPwdKey();
      console.log('key', res);
      let code = '';
      if (res.data.status === '0000') {
        code = res.data.data;
      } else {
        this.$message.error('获取keycode失败');
        code = '';
      }
      return code;
    },
    update() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const param = {
            loginName: this.ruleForm.loginName,
            oldUserPwd: this.ruleForm.oldUserPwd,
            password: this.ruleForm.password,
          };
          this.keyCode = await this.getKey();
          console.log('this.keyCode', this.keyCode);
          const pwdKey = this.common.encrypt(JSON.stringify(param), this.keyCode); // 加密param
          console.log('keyoe', pwdKey);
          const res = await this.updatePWD(pwdKey);
          console.log('update', res);
          if (res.status == '0000') {
            this.pwsdialogVisible = false;
            this.$message.success('修改密码成功,即将跳转到登录页面');
            const that = this;
            setTimeout(() => {
              localStorage.clear();
              that.$router.push('/login');
            }, 2000);
          } else {
            this.pwsdialogVisible = false;
            this.$message.error(res.msg);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async getUseright() {
      // debugger
      const departdata = this.getSysrightsNew;
      console.log('departdata', departdata);
      if (departdata.childs.length > 0) {
        const roledata = departdata.childs.filter(item => item.title === '系统管理');
        const departdatalist = roledata[0].childs.filter(item => item.title === '修改密码');
        // this.sys_user_add = departdatalist[0].childs.some( item =>item.resCode === 'sys_user_add')
        // this.sys_user_del = departdatalist[0].childs.some( item =>item.resCode === 'sys_user_del')
        // this.sys_user_upd = departdatalist[0].childs.some( item =>item.resCode === 'sys_user_upd')
        this.sso_pwd_watch = departdatalist[0].childs.some(item => item.resCode === 'sso_pwd_watch');


        if (this.sso_pwd_watch == false) {
          console.log('this.sso_pwd_watch', this.sso_pwd_watch);
          this.$router.push('/home');
        }
      } else {
        this.$router.push('/home');
      }
    },

    clearUserInfo() {
      localStorage.clear();
      this.$router.push('/login');
      // location.reload()
    },
    uploadFiles(params) {
      const _file = params.file;
      const newdata = new FormData();
      newdata.append('file', _file);
      newdata.append('introducer', this.renName);
      newdata.append('linkMethod', this.ihpon);
      newdata.append('opinion', this.yijian);
      if (!this.yijian) {
        this.$message.error('请输入反馈意见');
        return false;
      }
      this.feedBacksend(newdata).then((res) => {
        if (res.data.status == '0000') {
          this.$message.success('您的意见已成功反馈');
          this.setupdata();
          this.feedbackdialogVisible = false;
        } else {
          this.$message.error('您的意见反馈失败');
          this.setupdata();
          this.feedbackdialogVisible = false;
        }
      });
    },
    filechange(file, fileList) {
      console.log(file, fileList, 'vmvmvmv');
      this.fileobj = fileList;
    },
    uplodesure() {
      if (!this.yijian) {
        this.$message.error('请输入反馈意见');
        return false;
      } else if (this.fileobj.length <= 0 && this.yijian) {
        const newdata = new FormData();
        newdata.append('introducer', this.renName);
        newdata.append('linkMethod', this.ihpon);
        newdata.append('opinion', this.yijian);

        this.feedBacksend(newdata).then((res) => {
          if (res.data.status == '0000') {
            this.$message.success('您的意见已成功反馈');
            this.setupdata();
            this.feedbackdialogVisible = false;
          } else {
            this.$message.error('您的意见反馈失败');
            this.setupdata();
            this.feedbackdialogVisible = false;
          }
        });
      }
      this.$refs.upload.submit();
      this.setupdata();
    },
    setupdata() {
      (this.renName = ''),
      (this.ihpon = ''),
      (this.yijian = ''),
      (this.fileList = []);
      this.fileobj = [];
    },
    feedback() {
      this.feedbackdialogVisible = true;
    },
    xiugai() {
      this.pwsdialogVisible = true;
    },
    loginout() {
      this.$confirm(`${this.username}，您确定退出么?`, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.logout({ token: this.tokenll })
            .then((result) => {
              window.clearTimeout(this.timer);
              this.clearUserInfo();
            })
            .catch((error) => {
              this.clearUserInfo();
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '退出取消',
            duration: 1000,
          });
        });
    },
    parseRightsData(entry, codeIndex) {
      const resCode = permissionMap.mainButton[codeIndex++];
      if (Array.isArray(entry)) {
        for (const item of entry) {
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
      for (const item of children) {
        if (nextCode === item.resCode) {
          found = true;
          return this.parseRightsData(item, codeIndex);
        }
      }
      if (!found) {
        return [];
      }
    },
    getAppCodeFromRouter() {
      for (const match of this.$route.matched) {
        if (match.meta && match.meta.appCode) {
          return match.meta.appCode;
        }
      }
    },
    moremenu() {
      this.$router.push('/moreMenu');
      this.moremenuflag = true;
    },
    onClick(url, appCode, item) {
      this.moremenuflag = false;
      let urllink = '';
      console.log(url, 'hjhjh');
      console.log(item, 'hjhjhitemitemitemitem');
      let childUrl = '';

      if (item) {
        childUrl = item.childs[0].url.split(';')[0];

        if (childUrl == '/fundmoney' || childUrl == '/ETFfund') {
          childUrl = item.childs[0].childs[0].url.split(';')[0]; // 如果二级菜单下面还有child 且child类型不是按钮 呢么继续往下获取菜单里面的第一个有权限的菜单
        }
        if (childUrl == '/invoiceMnue/examinationMnue') {
          childUrl = item.childs[0].childs[0].url.split(';')[0]; // 如果二级菜单下面还有child 且child类型不是按钮 呢么继续往下获取菜单里面的第一个有权限的菜单
        }
        if (url == '/marketTrackingnew') {
          childUrl = item.childs[0].childs[0].url.split(';')[0]; // 如果二级菜单下面还有child 且child类型不是按钮 呢么继续往下获取菜单里面的第一个有权限的菜单
        }
      //  if( url=='/iasnew'){

      //  }
      }
      if (url.childs && url.childs.length > 0) {
        const urllink = `/dc2${url.childs[0].childs[0].url.split(';')[0]}`;
        console.log(urllink);
        this.$router.push(urllink);
        this.appCode = appCode;
      } else {
        urllink = url;
        console.log(urllink, '123456789');
      }
      console.log('urllink', urllink);
      console.log('childUrl', childUrl);
      if (appCode == 'sd') {
        window.open(url + this.tokenll);
      }
      if (appCode !== 'sd') { // 跳转的不是水滴系统
        if (urllink == '/newSSG') { // 设置信评的首页的默认
          this.$router.push(`${urllink}/newSSGhome`);
        } else if (urllink == '/dc2') {
          this.$router.push(`/dc2${childUrl}`);
        } else if (urllink == '/fundmanagementNew') { // 设置基金管理的默认菜单
          this.$router.push(`/fundmanagementNew${childUrl}`);
        } else if (urllink == '/zcpz') {
          const vv = `/zcpz${childUrl}`;
          this.$router.push(vv);
        } else if (urllink == '/invoiceMnue') {
          const vv = childUrl;
          this.$router.push(vv);
        } else if (urllink == '/fundmenuorderNew') {
          this.$router.push('/fundorderHome');
        } else if (urllink == '/aiHome') {
          this.$router.push('/aitext');
        } else if (urllink == '/biaoHome') {
          this.$router.push('/biaoHome');
        } else if (urllink == '/sysNew') {
          const vv = `/sysNew${childUrl}`;
          this.$router.push(vv);
        } else if (urllink == '/marketTrackingnew') {
          const vv = `/marketTrackingnew${childUrl}`;
          this.$router.push(vv);
        } else if (urllink == '/iasnew') {
          const vv = `/iasnew${childUrl}`;
          this.$router.push(vv);
        } else {
          this.$router.push(urllink);
        }
        // console.log('urllink', urllink)

        this.appCode = appCode;
      }
    },
    getallcheck() {
      this.allcheck().then((res) => {
        if (res.status == '0000') {
        } else if (res.status == '00099') {
          this.dialogVisible = true;
        }
      });
    },
    otherout() {
      this.logout({ token: this.tokenll })
        .then((result) => {
          if (result.status === '0066') {
            window.location.reload();
          }
          this.clearUserInfo();
        })
        .catch((error) => {
          this.clearUserInfo();
        });
    },
  },
  watch: {
    $route(to, from) {
      this.moremenuflag = false;
      console.log('Newhome route to:', to);
      console.log('Newhome route from:', from);
      this.appCode = this.getAppCodeFromRouter();
      if (to.path === '/home') {
        this.showImg = true;
      } else {
        this.showImg = false;
      }
      if (to.path == '/zcpz/assetMaintenance' || to.path == '/zcpz/assetAnalysis') {
        this.objstyle = this.objstyle2;
      } else if (to.path == '/fundchoose' || to.path == '/tradingaccount' || to.path == '/tradingaccountone' || to.path == '/transactiondetails' || to.path == '/holdingssubsidiary' || to.path == '/ordermanagement'
      || to.path == '/transactiondetails' || to.path == '/holdingssubsidiary' || to.path == '/consignmentFund'
      ) {
        this.objstyle = this.objstyle2;
      } else if (to.path == '/aitext' || to.path == '/moreMenu') {
        this.objstyle = this.objstyle2;
      } else if (to.path == '/moreMenu') {
        this.objstyle = this.objstyle2;
        this.moremenuflag = true;
      } else {
        this.objstyle = this.objstylebase;
        this.moremenuflag = false;
      }
      console.log('val', this.showImg);
    },
  },
  mounted() {
    // this.getUseright()
    this.timer = setInterval(() => {
      this.getallcheck();
    }, 10000);
    const logoutValid = localStorage && localStorage.getItem('logoutValid');
    this.logoutValid = logoutValid === 'true';
  },
  created() {
    this.header = { Authorization: localStorage.getItem('token') };
    this.tokenll = localStorage.getItem('token');
    const menuelist = JSON.parse(localStorage.getItem('menu')) || [];

    this.username = localStorage.getItem('username');
    this.appCode = this.getAppCodeFromRouter();
    this.headerList = this.parseRightsData(menuelist, 0);
    // if(this.headerList.length == 0){
    //   this.$router.push('/home')
    //   this.$message.warning('当前菜单下没有数据')
    // }
    console.log('this.headerList', this.headerList);
    if (this.$route.path === '/home') {
      this.showImg = true;
    } else {
      this.showImg = false;
    }
    if (this.$route.path == '/moreMenu') {
      this.moremenuflag = true;
    } else {
      this.moremenuflag = false;
    }
    console.log('rrrrrrrrrrrrrrrrrrrrrrrrrr', this.$route);
    if (this.$route.path == '/assetMaintenance' || this.$route.path == '/assetAnalysis' || this.$route.path == '/moreMenu') {
      // debugger
      this.objstyle = this.objstyle2;
    } else {
      this.objstyle = this.objstylebase;
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component instance via `vm`
      console.log('beforerouteenter in home:', vm.$route);
      const token = vm.$route.query.token;
      // 处理oa跳转
      const queryParam = vm.$route.query;
      let userInfoPromise = null;
      let redirect = '/home';
      if (queryParam.oa_user && queryParam.oa_sign) {
        // params.oa_user = decodeURIComponent(params.oa_user);
        redirect = JSON.parse(queryParam.oa_user).redirect;
        localStorage.clear();
        userInfoPromise = vm.queryOaUserInfo(queryParam);
      }
      if (token) {
        localStorage.clear();
        userInfoPromise = vm.getUserInfoByToken({
          data: {
            token,
          },
          config: {
            headers: {
              Authorization: token,
            },
          },
        });
      }
      if (userInfoPromise) {
        // if(vm.tokenll){
        //     //退出之前的用户登录
        //     vm.logout({token:vm.tokenll}).then(result=>{
        //         if(result.status === '0000'){
        //         }
        //     }).catch(error=>{});
        // }
        userInfoPromise
          .then((result) => {
            console.log('get user info by token:', result);
            if (result.status !== '0000') {
              throw { msg: '获取用户信息失败', status: '-1000' };
            }
            const {
              token, userName, loginName, id,
            } = result.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', userName);
            localStorage.setItem('userId', id);
            localStorage.setItem('loginname', loginName);
            vm.username = userName;
            vm.logoutValid = false;
            vm.appCode = vm.getAppCodeFromRouter();
            return vm.getMenuListByuserid(id);
          })
          .then(
            (result) => {
              if (result.data.status === '0000') {
                localStorage.setItem('menu', JSON.stringify(result.data.data));
                localStorage.setItem('logoutValid', false);
                vm.headerList = result.data.data || [];
              }
              return vm.getSelect();
            },
            (error) => {
              // vm.$message.error('获取用户信息失败');
              throw { msg: '获取用户信息失败', status: '-1000' };
            },
          )
          .then((result) => {
            console.log('get list data from home:', result);
            const data = result.data.data;
            vm.common.set('meiju', data);
            window.location.href = redirect;
          })
          .catch((error) => {
            // vm.$message.error('登录失败请重新登录');
            if (error.status === '-1000') {
              vm.$message.error(error.msg);
              vm.$router.push('/login');
            } else {
              vm.$router.push('/home');
            }
          });
      }
    });
  },
  destroyed() {
    if (this.timer) { // 如果定时器在运行则关闭
      clearInterval(this.timer);
    }
  },

};
</script>


<style lang="less" scoped>
#newhome{
  width:100%;
  height: 100%;

  .header{
      display:flex;
      // padding:0 10px;
      height:55px;
      color:#fff;
      overflow: hidden;
      background:#104972;
      align-items: center;
      .logo{
          font-size:12px;
          width: 130px;
          text-align: center;
          img{
            width: 30px;
            line-height: 20px;
          }
          span{
            display: block;
            font-size: 14px;
          }
      }

  }
  .el-dropdown-item {
      .el-dropdown-menu__item {
        a {
          display: block;
          width: 100%;
        }
      }
    }
    .el-dropdown-link {
      padding: 0 10px;
      cursor: pointer;
      font-family:'微软雅黑';
      color: #fff;
      font-size: 16px;
    }
    .el-icon-arrow-down {
      font-size: 14px;
    }
    .logo {
      float: left;
      // width: 110px;
      margin-left: 20px;
      margin-right: 40px;

      img {
        vertical-align: middle;
        // background: #408bff;
        width: 28px;
      }
    }

    .page-header {
      background: #3492f3;
      height: 60px;
      line-height: 60px;
      z-index: 1000;
      position: fixed;
      left: 0;
      color: #fff;
      top: 0;

      width: 100%;
      // min-width: 1100px;
      box-shadow: 1px 1px 2px #666;
    }

    .items{
        list-style:none;
        display: flex;
        // margin-left:100px;
        flex:auto;
        justify-content: flex-start;
        li{

            text-align: center;
            height: 55px;
            line-height: 55px;
            cursor: pointer;
            &:hover{
                background:#1283D5;
            }
            &.active{
              background:#1283D5;
            }
            div{
               width: 100%;
                height: 100%;
            }
            a{
                font-family: '微软雅黑';
                padding: 0 20px;
                height: 100%;
                display: inline-block;
                font-size: 16px;
                color: #FFFFFF;
                text-decoration: none;
            }
        }
    }
    .head-pic {
        position: relative;
        float: left;
        height: 50px;
        width: 50px;
        border-radius: 34px;
        margin-left: 15px;
        margin-top: 5px;
      }
      .setting {
        background: url(../assets/images/setting.png) no-repeat;
        width: 26px;
        height: 26px;
        float: left;
        margin-top: 22px;
      }
    .user-head {
      float: right;
      height: 55px;
      text-align: center;
      position: relative;
      margin-right: 10px;
      span {
        line-height: 20px;
        font-size: 14px;
      }



      .user-name,
      .status {
        line-height: 32px;
        display: inline-block;
        font-size: 13px;
      }

      .status {
        color: #fff;
      }

      div {
        float: left;
        margin-top: 10px;
      }
      .iconimg {
        position: absolute;
        transform: scale(0.8, 0.8);
        right: -5px;
        cursor: pointer;
      }
    }
    .big{
      transform: scale(1.2,1.2);
      // vertical-align: middle;
      margin-right: 10px;
    }
    .openla{
      // margin-left: 10px;
      margin-top: -1px;

    }
}

</style>
