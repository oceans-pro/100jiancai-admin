<template>
  <div v-if="showApp" class="app-container">
    <el-alert v-if="$store.getters.device==='mobile'" title="建议使用电脑端进行查看或编辑" type="warning" />
    <!--********************************************* 数据列表 ***********************************************-->
    <el-table
      :data="list"
      style="width: 100%;"
    >

      <el-table-column
        prop="username"
        label="操作者"
        width="110"
      />

      <el-table-column
        prop="ip"
        label="ip地址"
        width="120"
      />


      <el-table-column
        prop="visitTime"
        label="访问时间"
        width="165"
      />

      <el-table-column
        prop="executionTime"
        label="耗时(ms)"
        width="80"
      />

      <el-table-column
        prop="uri"
        label="访问路径"
        width="200"
      />

      <el-table-column
        prop="method"
        label="调用方法"
        width="200"
      />

      <el-table-column
        prop="data"
        label="数据"
        width="800"
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
  import {getDatetimeString} from '@/utils/date-time-util'
  import {getPageOperationLog} from '@/request/log'

  export default {
    name: 'OperationLog',
    data() {
      return {
        showApp: false,
        list: [],
        currentPage: 1,
        pageSize: 6,
        total: 0,
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
        getPageOperationLog(num, this.pageSize).then(data => {
          this.showApp = true
          this.list = data['content']
          this.list.forEach(item => {
            item['visitTime'] = getDatetimeString(new Date(item['visitTime']))
          })
          this.total = data['totalElements']
        })
      },
      handleCurrentChange(e) {
        this.currentPage = e
        this.fetchData(this.currentPage)
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
