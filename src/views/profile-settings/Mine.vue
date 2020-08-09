<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="40px">


      <el-form-item label="用户">
        <el-input :value="form.username" disabled />
      </el-form-item>

      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>

      <el-form-item label="头像">
        <div class="avatar-group">
          <el-input v-model="form.avatar" />
          <el-upload
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :auto-upload="true"
            :http-request="handleRequest"
          >
            <el-image
              v-if="form.avatar"
              style="width: 40px;height: 40px;border-radius: 10px;"
              :src="form.avatar"
              class="avatar"
            >
              <div slot="error">
                <i style="color: red;font-size: 40px" class="el-icon-error" />
              </div>
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item label="手机">
        <el-input v-model="form.phone" />
      </el-form-item>

      <el-form-item label="角色">
        <el-input :value="form.roles|flatten" disabled />
      </el-form-item>

      <el-form-item label="介绍">
        <el-input v-model="form.introduction" type="textarea" />
      </el-form-item>

    </el-form>
    <!--********************************************* 操作 ***********************************************-->
    <div>
      <el-button type="primary" style="width: 100%" @click="handleSave()">保存修改</el-button>
    </div>
    <div style="height: 10px" />
    <div>
      <el-button type="danger" style="width: 100%" @click="showChangePasswordPanel=true">修改密码</el-button>
    </div>
    <!--********************************************* 修改密码面板 ***********************************************-->
    <el-dialog title="修改密码面板" :visible.sync="showChangePasswordPanel" :width="isMobile?'80%':'50%'">
      <el-form
        ref="passwordForm"
        :model="passwordForm"
        :rules="passwordRules"
        label-position="top"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input v-model="passwordForm.oldPass" type="password" autocomplete="off">
            <svg-icon v-show="oldPassCorrect" slot="suffix" icon-class="success" />
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="passwordForm.newPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input v-model="passwordForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleChangePassword('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {checkPass, putUserInfo, updatePass} from '@/request/auth'
  import {getUploadToken, uploadFile} from '@/request/file-upload'
  import {imageCdnConfig} from '@/const/secret'

  export default {
    name: 'UserInfo',
    filters: {
      flatten(list) {
        return list.map(role => role.roleName).join(',')
      },
    },
    data() {
      return {
        form: {
          username: '',
          nickName: '',
          email: '',
          phone: '',
          introduction: '',
          roles: [],
          avatar: '',
        },
        showChangePasswordPanel: false,
        passwordForm: {
          oldPass: '',
          newPass: '',
          checkPass: '',
        },
        passwordRules: {
          oldPass: [
            {required: true, message: '内容不得为空', trigger: 'blur'},
            {validator: this.validateOldPass, trigger: 'blur'},
          ],
          newPass: [
            {required: true, message: '内容不得为空', trigger: 'blur'},
            {validator: this.validatePass, trigger: 'blur'},
          ],
          checkPass: [
            {required: true, message: '内容不得为空', trigger: 'blur'},
            {validator: this.validPassAgain, trigger: 'blur'},
          ],
        },
        oldPassCorrect: false,
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.device === 'mobile'
      },
    },
    created() {
      this.form = this.$store.getters.userInfo
    },
    methods: {
      handleSave() {
        putUserInfo(this.form).then(_ => {
          this.$store.dispatch('user/getInfo')
        })
      },
      handleRequest(e) {
        getUploadToken(imageCdnConfig.bucketAdmin)
          .then(token => {
            uploadFile(e.file, null, token)
              .then(res => {
                const url = imageCdnConfig.imageHostAdmin + '/' + res.key
                this.form.avatar = url
              })
              .catch(err => {
                console.error(err)
              })
          })
      },
      handleChangePassword() {
        this.$refs['passwordForm'].validate((valid) => {
          if (valid) {
            updatePass(this.form.username, this.passwordForm.oldPass, this.passwordForm.newPass)
              .then(_ => {
                this.showChangePasswordPanel = false
                this.oldPassCorrect = false
                this.passwordForm = {}
                this.$store.dispatch('user/RESET_COOKIES').then(_ => {
                  this.$router.replace('/login')
                })
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      beforeAvatarUpload(file) {
        const isJpgOrGif = (file.type === 'image/jpeg' || file.type === 'image/gif')
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJpgOrGif) {
          this.$message.error('上传头像图片只能是 JPG或gif 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJpgOrGif && isLt2M
      },

      validateOldPass(rule, value, callback) {
        checkPass(this.$store.getters.username, value).then(data => {
          if (data) {
            this.oldPassCorrect = data
            callback()
          } else {
            callback(new Error('原密码输入错误！请重新输入'))
          }
        })
      },
      validatePass(rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.passwordForm.checkPass !== '') {
            this.$refs.passwordForm.validateField('checkPass')
          }
          callback()
        }
      },
      validPassAgain(rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.passwordForm.newPass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .avatar-group {
    display: flex;
  }
</style>
