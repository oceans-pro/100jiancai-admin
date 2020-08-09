<template>
  <div v-if="showApp" class="app-container">
    <el-alert v-if="$store.getters.device==='mobile'" title="建议使用电脑端进行查看或编辑" type="warning" />
    <!--********************************************* 数据列表 ***********************************************-->
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="datetime"
        label="时间"
        width="170"
      />

      <el-table-column
        prop="username"
        label="用户名"
        width="100"
      />

      <el-table-column
        prop="nickname"
        label="昵称"
        width="250"
      />


      <el-table-column
        prop="word"
        min-width="350px"
        label="聊天内容"
      />
    </el-table>
    <!--********************************************* 分页 ***********************************************-->
    <div style="height: 10px" />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      :page-count="3"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  import {getPageChatMsgLog} from '@/request/log'

  export default {
    name: 'ChatLog',
    data() {
      return {
        showApp: false,
        list: [],
        currentPage: 0,
        pageSize: 12,
        total: 1000,
        dataList: [{
          datetime: '',
          city: '',
        }],
      }
    },
    created() {
      this.fetchData(0)
    },
    methods: {
      fetchData(num) {
        getPageChatMsgLog(num, this.pageSize).then(data => {
          this.showApp = true
          this.list = data.content
          this.total = data['totalElements']
        })
      },
      handleCurrentChange(e) {
        this.currentPage = e
        this.fetchData(this.currentPage - 1)
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
