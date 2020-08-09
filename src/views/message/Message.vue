<template>
  <div v-if="showApp" class="app-container">
    <!--********************************************* 主体 ***********************************************-->
    <section v-for="(item,index) in dataList" :key="item.id">
      <el-card v-loading="loading[index]" class="box-card" shadow="hover">
        <div slot="header">
          <span style="line-height: 32px;font-weight: bold;font-size: x-large;">{{ item.title }}</span>
          <el-button
            plain
            type="text"
            style="float: right;color: red;"
            @click="handleDelete(item.id,index)"
          >
            删除
          </el-button>
        </div>
        <div>
          {{ item.content }}
        </div>
        <div style="height: 5px;" />
        <div style="font-size: smaller;color:#999999;padding-top: 10px;">
          <span style="float: left;"> {{ item.datetime.substring(0,10) }}</span>
          <span style="float: left;margin-left: 5px">{{ item.city }}</span>
          <span style="float: left;margin-left: 5px">ip: {{ item.ip }}</span>
        </div>
      </el-card>
      <div style="height: 20px" />
    </section>
    <!--********************************************* 分页 ***********************************************-->
    <div style="height: 10px" />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      :page-count="5"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  import {deleteOneMessage, getSomeMessages} from '@/request/message'

  export default {
    name: 'Message',
    data() {
      return {
        showApp: false,
        currentPage: 1,
        loading: [false, false, false, false],
        pageSize: 4,
        total: 50,
        dataList: [{
          datetime: '',
          city: '',
        }],
      }
    },
    created() {
      this.fetchData(1)
    },
    methods: {
      fetchData(num, index) {
        getSomeMessages({num: num, size: this.pageSize}).then(data => {
          this.showApp = true
          this.dataList = data.content
          this.total = data['totalElements']
          this.$set(this.loading, index, false)
        })
      },
      handleDelete(id, index) {
        this.$set(this.loading, index, true)
        deleteOneMessage(id).then(_ => {
          this.fetchData(this.currentPage, index)
        })
      },
      handleCurrentChange(e) {
        this.currentPage = e
        this.fetchData(this.currentPage)
      },
    },
  }
</script>

<style scoped>

</style>
