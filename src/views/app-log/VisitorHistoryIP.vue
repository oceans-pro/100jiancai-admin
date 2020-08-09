<template>
  <div class="app-container">
    <el-radio-group v-model="type" class="margin-bottom-10" @change="handleRadioChange">
      <el-radio-button :label="1">建材官网</el-radio-button>
      <el-radio-button :label="0">后台系统</el-radio-button>
    </el-radio-group>
    <el-table
      :data="list"
      border
      style="width: 100%"
      size="mini"
    >

      <el-table-column
        prop="lastDate"
        label="上次访问"
      />

      <el-table-column
        prop="ip"
        label="IP地址"
      />

      <el-table-column
        prop="address"
        label="定位地址"
      />
    </el-table>

    <el-pagination
      class="margin-top-10"
      small
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  import {getVisitorIpList} from '@/request/visitor'
  import {getBaiduMapToken} from '@/request/token'
  import {getCityInfoByIp} from '@/request/3rd'

  export default {
    name: 'HistoryIP',
    data() {
      return {
        type: 1,
        list: [],
        currentPage: 1,
        total: 0,
        size: 10,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
        },
        token: '',
      }
    },
    created() {
      this.fetchData()
      getBaiduMapToken().then(data => {
        this.token = data
      })
    },
    methods: {
      fetchData() {
        getVisitorIpList(this.type, this.currentPage - 1, this.size)
          .then(data => {
            this.total = data['totalElements']
            this.list = data['content']
            this.list.forEach(item => {
              if (item.ip.includes('127.0.0.1')) {
                this.$set(item, 'address', '本地测试')
                return
              }
              setTimeout(_ => {
                getCityInfoByIp(item.ip, this.token)
                  .then(data => {
                    this.$set(item, 'address', data.content.address)
                  })
              }, 500 * Math.random())
            })
          })
      },
      handleRadioChange(e) {
        this.currentPage = 1
        this.type = e
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
