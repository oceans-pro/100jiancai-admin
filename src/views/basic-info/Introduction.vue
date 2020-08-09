<template>
  <div v-if="showApp" class="app-container">
    <el-alert class="margin-bottom-10" type="warning">暂时不支持空格，请选择白色字体代替空格...</el-alert>
    <vue-editor v-model="html" :editor-toolbar="customToolbar" />
    <el-button type="primary" style="width: 100%;" class="margin-top-10" @click="handlePut">修改公司介绍</el-button>
  </div>
</template>

<script>
  import {getTheCompanyIntroduction, putTheCompanyIntroduction} from '@/request/company-info'

  export default {
    name: 'Introduction',
    data() {
      return {
        showApp: false,
        html: '<h1>Some initial html</h1>',
        customToolbar: [ // 从源码中找到如何配置
          ['bold', 'italic', 'underline', 'strike'],
          [{
            color: [],
          }, {
            background: [],
          }],
        ],
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getTheCompanyIntroduction().then(data => {
          this.showApp = true
          this.html = data['html']
        })
      },
      handlePut() {
        putTheCompanyIntroduction(this.html)
      },
    },
  }
</script>
