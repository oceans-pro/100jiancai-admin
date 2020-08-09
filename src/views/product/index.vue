<template>
  <div v-if="showApp" class="app-container">
    <el-alert title="左击（电脑端）/触按（手机端）图片进行修改" type="success" />
    <el-divider>
      <el-button
        size="small"
        round
        type="primary"
        plain
        style="width: 100%"
        @click="addOne()"
      >
        <i class="el-icon-circle-plus" />
        增加展示
      </el-button>
    </el-divider>
    <el-row :gutter="20" class="card-area">
      <el-col v-for="(product,index) in list" :key="index" :span="isMobile?24:12">
        <el-card class="margin-bottom-10">
          <section>
            <div class="left">
              <b>产品标题：</b>
              <el-input v-model="product.title" class="bottom-margin" />
              <b>展示类型：</b>
              <div>
                <el-radio-group v-model="product.type">
                  <el-radio-button label="1">客户案例</el-radio-button>
                  <el-radio-button label="2">公司设备</el-radio-button>
                </el-radio-group>
              </div>
              <b>展示顺序：</b>
              <div>
                <el-input-number
                  v-model="product.position"
                  style="width: 100%;"
                  :min="1"
                  :max="10"
                  label="顺序"
                />
              </div>
            </div>
            <div class="right margin-top-10">
              <label class="label">
                <input
                  type="file"
                  hidden
                  @change="handleUploadImage($event,index)"
                >
                <!-- 七牛云图片处理 -->
                <!-- https://developer.qiniu.com/dora/api/1279/basic-processing-images-imageview2 -->
                <el-image
                  :src="product.url|slim"
                  :alt="product.title||'潍坊百年建材'"
                  :style="isMobile?'width: 100%;':'height:250px;'"
                  :fit="isMobile?'fill':'contain'"
                  lazy
                  @click="fixElementUiImageBug"
                >
                  <div slot="error">
                    <span style="color: red">图片加载失败，请修改图片地址或删除该条项目</span>
                  </div>
                </el-image>
              </label>
              <div class="margin-bottom-10 margin-top-10">
                <el-button plain style="width: 100%;" type="success" @click="handleUpdate(product)">保存</el-button>
              </div>
              <div>
                <el-button plain style="width: 100%;" type="danger" @click="handleDelete(product.id)">删除</el-button>
              </div>
            </div>
          </section>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  /*+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
                                                   JS区域
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*/
  import {getAllProducts, postOneProduct, putOneProduct, deleteOneProduct} from '@/request/product'
  import {getUploadToken, uploadFile} from '@/request/file-upload'
  import {imageCdnConfig} from '@/const/secret'
  import {generateName} from '@/utils/generate-filename'
  import {narrowAndSlim} from '@/utils/qiniu-util'

  export default {
    name: 'Product',
    filters: {
      slim(url) {
        if (url.indexOf('base64') > 0) {
          return url
        } else {
          return narrowAndSlim(url)
        }
      },
    },
    data() {
      return {
        flag: '',
        showApp: false,
        dialogVisible: false,
        list: [],
        item: {
          position: 1,
        },
        rules: {
          title: [
            {required: true, message: '必须输入内容', trigger: 'blur'},
          ],
          url: [
            {required: true, message: '必须输入内容', trigger: 'blur'},
          ],
        },
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.device === 'mobile'
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getAllProducts().then(data => {
          this.showApp = true
          this.list = data
          this.dialogVisible = false
        })
      },
      handleDelete(id) {
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteOneProduct(id).then(_ => {
            this.fetchData()
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'})
        })
      },
      handleConfirm(item) {
        this.$refs['item'].validate((valid) => {
          if (valid) {
            postOneProduct(item).then(data => {
              this.fetchData()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      fixElementUiImageBug() {
        document.body.style.overflow = 'auto'
      },
      handleUploadImage(e, index) {
        this.list[index].url = require('@/assets/product/loading.gif')
        getUploadToken(imageCdnConfig.bucketPublic).then(token => {
          const file = e.target.files[0]
          const filename = generateName(file)
          uploadFile(file, filename, token)
            .then(data => {
              const ossKey = data.key
              const url = imageCdnConfig.imageHostPublic + '/' + ossKey
              this.list[index].url = url
            })
        })
      },
      handleUpdate(item) {
        if (item.id) {
          putOneProduct(item).then(_ => {
            this.fetchData()
          })
        } else {
          postOneProduct(item).then(_ => {
            this.fetchData()
          })
        }
      },
      addOne() {
        this.list.unshift({
          title: '请修改新增加的标题',
          type: 1,
          position: 1,
          url: require('@/assets/product/add-tip.png'),
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .file-container {
    position: relative;

    .file-input {
      position: absolute;
      cursor: pointer;
    }
  }

  .card-area {
    b {
      display: inline-block;
      margin: 10px 0;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .label {
        text-align: center;
      }
    }
  }
</style>
