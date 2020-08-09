<template>
  <div class="app-container">
    <el-alert type="success" class="margin-bottom-10 margin-top-10">
      点击图片左侧可以预览大图，点击图片右侧可以删除轮播图
    </el-alert>
    <el-upload
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-remove="beforeRemove"
      multiple
      :limit="99"
      :on-exceed="handleExceed"
      action="#"
      list-type="picture-card"
      :auto-upload="true"
      :http-request="handleRequest"
      :show-file-list="true"
      :file-list="fileList"
      :before-upload="beforeUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2MB</div>
    </el-upload>
    <div style="height: 20px;" />

    <el-link type="primary" underline href="https://www.bejson.com/ui/compress_img/" target="_blank">
      图片太大？试试在线压缩图片（点我）
    </el-link>


    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {uploadFile, getUploadToken} from '@/request/file-upload'
  import {postOneCarousel, getAllCarousel, deleteOneByName} from '@/request/company-info'
  import {imageCdnConfig} from '@/const/secret'
  import {generateName} from '@/utils/generate-filename'
  import {thumbAndSlim, thumbAndSlimReverse} from '@/utils/qiniu-util'

  export default {
    name: 'Carousel',
    inject: ['reload'],
    data() {
      return {
        fileList: [],
        thumbFileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        meetCondition: true,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                       请求相关
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
      fetchData() {
        getAllCarousel().then(data => {
          this.fileList = data
          this.thumbFileList = this.fileList.map(item => {
            item.url = thumbAndSlim(item.url)
            return item
          })
        })
      },
      handleRequest(e) {
        getUploadToken(imageCdnConfig.bucketPublic)
          .then(token => {
            const file = e.file
            const urlFriendlyName = generateName(file)
            uploadFile(e.file, urlFriendlyName, token)
              .then(data => {
                const ossKey = data.key
                const url = imageCdnConfig.imageHostPublic + '/' + ossKey
                postOneCarousel(ossKey, url)
                  .then(_ => {
                    // location.reload() // 刷新浏览器
                    // this.$router.go(0) // 刷新浏览器
                    this.reload()
                  })
                  .catch(_ => {
                    this.$message.error('保存到本地数据库失败，请检查服务器')
                  })
              })
              .catch(err => {
                console.error(err)
              })
          })
          .catch(_ => {
            this.$message.error('获取Token失败，请联系管理员')
          })
      },
      /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                     交互相关
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
      handleChange(file, fileList) {
        console.info('debug: handleChange')
      },
      handleRemove(file) {
        console.log('debug: handleRemove')
        deleteOneByName(file.name)
          .then(_ => {
            this.reload()
          })
      },
      beforeUpload(file) {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传轮播图只能是 JPG 格式!')
          this.meetCondition = false
        } else if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
          this.meetCondition = false
        } else {
          this.meetCondition = true
        }
        return isJPG && isLt2M
      },
      handlePreview(file) {
        console.log('debug: handlePreview')
        this.dialogImageUrl = thumbAndSlimReverse(file.url)
        this.dialogVisible = true
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制最多选择 8 个轮播图，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        if (this.meetCondition === false) {
          console.log('debug: 不满足不要提醒')
          return
        }
        return this.$confirm(`此操作将永久删除${file.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
      },
    },
  }
</script>

<style lang="scss">
  .el-message-box { // consider pc and mobile
    max-width: 500px;
    width: 80%;
  }
</style>
