<template>
  <div v-if="showApp" class="app-container">
    <el-alert
      v-show="FLAG_EDIT"
      title="按回车或者鼠标点击空白处以增加新的标签"
      type="info"
      center
      show-icon
    />

    <div style="height: 10px" />
    <el-tag
      v-for="tag in tags"
      :key="tag.value"
      closable
      @close="handleClose(tag.id,tag.value)"
    >
      {{ tag.value }}
    </el-tag>

    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>

  </div>
</template>

<script>
  import {getAllTags, postOneTag, deleteOneTag} from '@/request/news'

  export default {
    name: 'Tags',
    data() {
      return {
        showApp:false,
        tags: [{id: null, value: null}],
        inputVisible: false,
        inputValue: '',
        FLAG_EDIT: false,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getAllTags().then(data => {
          this.showApp = true
          this.tags = data
        })
      },

      handleClose(id, value) {
        this.$confirm(`此操作将<strong style="color: red">永久删除</strong>
                       <strong style="color: #409EFF">${value}标签</strong>
                       及<strong style="color: red">该标签下属的新闻</strong>, 是否继续 ?`,
                      '提示',
                      {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true,
                        type: 'warning',
                      })
          .then(() => {
            deleteOneTag(id).then(_ => {
              this.fetchData()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },

      showInput() {
        this.inputVisible = true
        this.FLAG_EDIT = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm() {
        this.FLAG_EDIT = false
        const inputValue = this.inputValue
        if (inputValue) {
          postOneTag(inputValue).then(_ => {
            this.fetchData()
          })
        }
        this.inputVisible = false
        this.inputValue = ''
      },
    },
  }
</script>

<style scoped>
  .el-tag  {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
