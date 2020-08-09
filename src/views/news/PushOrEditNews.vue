<template>
  <div v-if="showApp" class="app-container">
    <el-form
      ref="formData"
      :model="formData"
      label-width="100px"
      label-position="top"
      :rules="rules"
    >

      <el-form-item label="时间" prop="date">
        <el-date-picker
          v-model="formData.date"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>

      <el-form-item label="摘要" prop="summary">
        <el-input v-model="formData.summary" type="textarea" placeholder="请输入摘要" />
      </el-form-item>

      <el-form-item label="标签（最多选择4项）" prop="tags">
        <el-checkbox-group
          v-model="formData.tags"
          :min="0"
          :max="4"
          border
        >
          <el-checkbox
            v-for="(tag,index) in totalTags"
            :key="index"
            :label="tag"
          >{{ JSON.parse(tag).value }}
          </el-checkbox>
          <el-button style="margin-left: 20px;" icon="el-icon-refresh" circle @click="refreshTags()" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="新闻地址" prop="link">
        <el-alert
          title="推荐使用外链的方式添加新闻，请复制文章的地址。"
          type="warning"
        />
        <div style="height: 10px" />
        <el-input v-model="formData.link" type="textarea" placeholder="请输入文章地址" />
      </el-form-item>

      <el-form-item label="图片地址" prop="img">
        <el-alert
          title="目前仅支持外链的方式添加缩略图，
          如果不填或图片地址失效会有默认的“每日新闻”默认海报。"
          type="warning"
        />
        <div style="height: 10px" />
        <el-input v-model="formData.img" type="textarea" placeholder="请输入图片地址：" />
      </el-form-item>

      <el-form-item v-if="formData.img" label="图片预览">
        <el-image :src="formData.img" style="width: 200px" />
      </el-form-item>

    </el-form>

    <el-button type="primary" style="width: 100%" @click="handleSubmit()">保存并上传</el-button>
  </div>
</template>

<script>

  import {getAllTags, getOneNews, postOneNews, putOneNews} from '@/request/news'

  export default {
    name: 'PushNews',
    data() {
      return {
        showApp: false,
        flag: '', // `edit` or `add`
        formData: {
          tags: [],
        },
        rules: {
          date: [
            {required: true, message: '必须输入内容', trigger: 'blur'},
          ],
          summary: [
            {required: true, message: '必须输入内容', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '必须输入内容', trigger: 'blur'},
          ],
          image: [
            {required: true, message: '必须输入内容', trigger: 'blur'},
          ],
          link: [
            {required: true, message: '必须输入内容', trigger: 'blur'},
          ],
        },
        totalTags: [],
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getAllTags().then(data => {
          this.totalTags = data.map(item => JSON.stringify(item))
          this.showApp = true
          if (this.$route.query.id) {
            this.flag = 'edit'
            getOneNews(this.$route.query.id).then(data => {
              // v-model="formData.tags" 和 v-for="(tag,index) in totalTags" 的数据源不一致的问题
              // js没有用于判断两个对象是否相等的 equals方法
              data.tags = data.tags.map(item => JSON.stringify(item))
              this.formData = data
            })
          } else {
            this.flag = 'add'
          }
        })
      },
      refreshTags() {
        getAllTags().then(data => {
          this.totalTags = data.map(item => JSON.stringify(item))
        })
      },
      handleSubmit() {
        const formData = JSON.parse(JSON.stringify(this.formData))
        formData.tags = formData.tags.map(item => JSON.parse(item))
        console.log(formData)
        if (this.flag === 'edit') {
          putOneNews(this.$route.query.id, formData)
            .then(_ => {
              this.fetchData()
              this.$router.push('/news/edit?time=' + new Date().getTime())
            })
        }
        if (this.flag === 'add') {
          postOneNews(formData).then(data => {
            this.fetchData()
            this.$router.push('/news/edit')
          })
        }
      },
    },
  }
</script>


