<template>
  <div v-if="showApp" class="app-container">
    <el-alert
      class="alert"
      :title="'上次修改的时间为：'+formData.datetime"
      type="info"
      effect="dark"
      show-icon
    />
    <div style="height: 10px" /> <!-- html is better than css -->
    <el-form
      ref="formData"
      :model="formData"
      label-width="50px"
      class="demo-formData"
    >
      <el-form-item label="地址" prop="address">
        <el-input v-model="formData.address" />
      </el-form-item>
      <el-form-item label="微信" prop="name">
        <el-input v-model="formData.wechat" />
      </el-form-item>
      <el-form-item label="手机" prop="mobilePhone">
        <el-input v-model="formData.mobilePhone" />
      </el-form-item>
      <el-form-item label="座机" prop="telephone">
        <el-input v-model="formData.telephone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="formData.mail" />
      </el-form-item>
      <el-form-item label="QQ" prop="QQ">
        <el-input v-model="formData.qq" />
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%;" size="large" type="primary" @click="submitForm()">保存联系方式</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getOneCompanyContact, postOneCompanyContact} from '@/request/company-info'

  export default {
    name: 'Contact',
    data() {
      return {
        showApp : false,
        formData: {
          wechat: '',
          mobilePhone: '',
          telephone: '',
          qq: '',
          mail: '',
          address: '',
          datetime: '',
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      submitForm() {
        postOneCompanyContact(this.formData).then(data => {
          this.fetchData()
        })
      },
      fetchData() {
        getOneCompanyContact()
          .then(data => {
            this.formData = data
            this.showApp = true
          })
      },
    },
  }
</script>

<style scoped lang="scss">
  .container {
    width: 40%;

    .alert {
      margin: 10px 0px;
    }
  }
</style>
