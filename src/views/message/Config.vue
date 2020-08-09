<template>
  <div class="app-container">
    <el-form label-position="top">
      <el-form-item label="通知策略">
        <div>
          <el-radio v-model="radio" :label="0">不发送邮件</el-radio>
          <el-radio v-model="radio" :label="1">向某一角色发送邮件</el-radio>
        </div>
      </el-form-item>

      <el-form-item v-if="radio===1" label="选择角色">
        <el-select v-model="messageRoleId" placeholder="请选择角色" @change="handleSelectChange()">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-if="radio===1" label="邮箱预览">
        <div style="text-align: center"><i v-show="showLoading" style="font-size:xx-large " class="el-icon-loading" />
        </div>
        <div v-for="(mail,index) in mails" :key="index">{{ mail }}</div>
      </el-form-item>
    </el-form>

    <div>
      <el-button style="width: 100%;" type="primary" @click="handleSave">保存</el-button>
    </div>


  </div>
</template>

<script>
  import {getAllRoles} from '@/request/auth'
  import {getMailsByRoleId, getMessageConfig, putMessageConfig} from '@/request/message'

  export default {
    name: 'Config',
    data() {
      return {
        radio: 1,
        messageRoleId: 0,
        roles: [],
        mails: [],
        showLoading: false,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getMessageConfig().then(data => {
          this.radio = data['noticeType']
          this.messageRoleId = data['roleId']
          getMailsByRoleId(this.messageRoleId).then(data => {
            this.mails = data
          })
        })
        getAllRoles().then(data => {
          this.roles = data
        })
      },
      handleSave() {
        const data = {noticeType: this.radio, roleId: this.messageRoleId}
        putMessageConfig(data)
      },
      handleSelectChange() {
        this.showLoading = true
        this.mails = []
        getMailsByRoleId(this.messageRoleId).then(data => {
          this.mails = data
          this.showLoading = false
        })
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
