<template>
  <div v-permission="['chatLog:mod']" class="app-container">
    <div>
      <el-button type="danger" plain style="width: 100%;" @click="handleDeleteAllOperationLog()">清空全部操作日志</el-button>
    </div>
    <div style="height: 10px;" />
    <div>
      <el-button type="danger" plain style="width: 100%;" @click="handleDeleteAllChatMsgLog">清空全部聊天记录</el-button>
    </div>
  </div>
</template>

<script>
  import {deleteAllChatMsgLog, deleteAllOperationLog} from '@/request/log'
  export default {
    name: 'Delete',
    methods: {
      handleDeleteAllOperationLog() {
        this.confirm()
          .then(_ => {
            deleteAllOperationLog()
          })
      },
      handleDeleteAllChatMsgLog() {
        this.confirm()
          .then(_ => {
            deleteAllChatMsgLog()
          })
      },
      confirm() {
        return new Promise(resolve => {
          this.$confirm('此操作将永久所有记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            resolve()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
        })
      },
    },
  }
</script>
