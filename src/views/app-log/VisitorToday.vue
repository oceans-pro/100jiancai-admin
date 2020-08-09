<template>
  <div class="app-container">

    <div class="top">
      <el-radio-group v-model="type" class="margin-bottom-10" @change="handleRadioChange">
        <el-radio-button :label="1">建材官网</el-radio-button>
        <el-radio-button :label="0">后台系统</el-radio-button>
      </el-radio-group>


      <el-date-picker
        v-model="today"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        @change="handleChangeDate"
      />
    </div>

    <el-table
      :data="list"
      border
      style="width: 100%"
      size="mini"
    >
      <el-table-column
        prop="datetime"
        label="时间"
        width="140"
      />
      <el-table-column
        prop="ip"
        label="IP地址"
        width="110"
      />
      <el-table-column
        prop="address"
        label="城市定位"
        width="110"
      />
      <el-table-column
        prop="device"
        label="设备"
        width="50"
      />
      <el-table-column
        prop="refer"
        label="渠道"
        min-width="500px"
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
  import {getVisitorToday} from '@/request/visitor'
  import {getDateString} from '@/utils/date-time-util'
  import {getCityInfoByIp} from '@/request/3rd'
  import {getBaiduMapToken} from '@/request/token'

  export default {
    name: 'VisitorToday',
    data() {
      return {
        today: '',
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
      this.today = getDateString(new Date())
      this.fetchData(this.type, this.today, 0, this.size)
      getBaiduMapToken().then(data => {
        this.token = data
      })
    },
    methods: {
      fetchData(type, date, num, size) {
        getVisitorToday(type, date, num, size).then(data => {
          data.content.forEach(item => {
            item['device'] = item['device'] === 1 ? '手机' : '电脑'
          })
          this.total = data['totalElements']
          this.list = data.content
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
      handleCurrentChange(val) {
        this.fetchData(this.type, this.today, val - 1, this.size)
      },
      handleRadioChange(e) {
        this.currentPage = 1
        this.type = e
        this.fetchData(this.type, this.today, 0, this.size)
      },
      handleChangeDate(e) {
        this.today = getDateString(e)
        this.fetchData(this.type, this.today, this.currentPage - 1, this.size)
      },
    },
  }
</script>

<style scoped lang="scss">
  .top {
    display: flex;
    justify-content: space-between;
  }
</style>
