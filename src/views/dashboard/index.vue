<template>
  <div class="app-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;margin-bottom:10px;">
      <line-chart :x-axis-mark="xAxisMark" :chart-data="lineChartData" />
    </el-row>

    <div class="caption">最近{{ size }}天访问量趋势图 -
      <b v-show="listSource==='官方网站'" style="color:#40c9c6">{{ listSource }}</b>
      <b v-show="listSource==='后台系统'" style="color:#36a3f7">{{ listSource }}</b>
    </div>

    <el-link v-permission="['druid:get']" href="http://api.100jiancai.cn/druid/login.html">进入druid面板</el-link>
  </div>
</template>

<script>
  import PanelGroup from '@/views/dashboard/components/PanelGroup'
  import LineChart from '@/views/dashboard/components/LineChart'

  import {getLatestVisitorCount} from '@/request/visitor'

  export default {

    name: 'Dashboard',
    components: {LineChart, PanelGroup},
    data() {
      return {
        listSource: '官方网站', // or '后台系统'
        xAxisMark: [],
        size: 0, // 一次拉取多少天的数据？
        visitorData: {
          list1: { // 官网
            clickData: [],
            headData: [],
          },
          list2: { // 后台
            clickData: [],
            headData: [],
          },
        },
        lineChartData: {clickData: [], headData: []},
        timer: {},
      }
    },
    computed: {
      isMobile() {
        return this.$store.getters.device === 'mobile'
      },
    },
    created() {
      this.lineChartData = this.visitorData.list1
      this.fetchData()
      this.timer = setInterval(_ => {
        this.fetchData()
      }, 3000)
    },
    destroyed() { // 但是不会被销毁...
      clearInterval(this.timer)
    },
    methods: {
      fetchData() {
        // 一定要在确定了是移动端还是PC端之后，再获取isMobile
        this.$nextTick(_ => {
          const size = this.isMobile ? 5 : 15 // 移动端展示的数据少
          this.size = size
          getLatestVisitorCount(size).then(data => {
            this.xAxisMark = data.map(item => item['date'].substr(5)).reverse()
            this.visitorData.list1.clickData = data.map(item => item['publicClick']).reverse()
            this.visitorData.list1.headData = data.map(item => item['publicHead']).reverse()
            this.visitorData.list2.clickData = data.map(item => item['adminClick']).reverse()
            this.visitorData.list2.headData = data.map(item => item['adminHead']).reverse()
          })
        })
      },
      handleSetLineChartData(type) {
        this.lineChartData = this.visitorData[type]
        if (type === 'list1') {
          this.listSource = '官方网站'
        } else if (type === 'list2') {
          this.listSource = '后台系统'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .caption {
    margin: 0 auto;
    text-align: center;
  }
</style>
